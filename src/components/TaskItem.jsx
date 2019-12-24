import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as Down } from "../svg/down.svg";
import { ReactComponent as TaskBg } from "../svg/TaskBg.svg";
import gsap from "gsap";
import {
  CallTaskUpdate as TaskCheck,
  CallTaskRemove as TaskRemove,
  TaskDialog,
  CallTaskUpdate as TaskSave
} from "../redux/actions";
import { bindActionCreators } from "redux";
import { ContextMenuTrigger } from "react-contextmenu";
import { Scrollbars } from "react-custom-scrollbars";
import { isDate } from "date-fns";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
export class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.face = {};
    const { data } = this.props;
    this.state = {
      isOpened: false,
      isTextEdit: false,
      taskText: data.taskText,
      taskDate: isDate(data.taskDate) ? data.taskDate : new Date()
    };
    this.onClicked = this.onClicked.bind(this);
    this.detailClick = this.detailClick.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.textDoubleClick = this.textDoubleClick.bind(this);
    this.saveTextChanged = this.saveTextChanged.bind(this);
    this.saveDateChanged = this.saveDateChanged.bind(this);
    this.textKeyDown = this.textKeyDown.bind(this);
    this.textBlur = this.textBlur.bind(this);
    this.faceOpen = this.faceOpen.bind(this);
  }
  faceOpen(open){
    const {ld1,ld2,ld3,rd1,rd2,rd3,lu,ru,lc,rc,l1,l2,l3,r1,r2,r3} = this.face
    const o= [ ld1, ld2, ld3, rd1, rd2, rd3, lu, ru, lc, rc];
    const c = [ l1, l2 ,l3, r1, r2, r3]
    if( open){
      gsap.timeline().add('start') 
      .to(this.faceIcon, {
      opacity:1
     }) .set(c, {
        strokeDasharray: 60,
        strokeDashoffset: 60 
      },'start').to(o, 0.3, {
        strokeDasharray: 60,
        strokeDashoffset: 0,
        ease:'none'
      },'start').to([  lc, rc], {
        opacity:open?1:0
       },'start'); 
    }else{ 
      gsap.timeline().add('start')
      .to(this.faceIcon, {
      opacity:.5
     }) .to([  lc, rc], {
        opacity:open?1:0
       },'start').set(c,   {
        strokeDasharray: 60,
        strokeDashoffset: 0 
      },'start').to(o, 0.3, {
        strokeDasharray: 60,
        strokeDashoffset: 60,
        ease:'none'
      },'start'); 
    } 
  }
  faceSet(open){  
    const {ld1,ld2,ld3,rd1,rd2,rd3,lu,ru,lc,rc,l1,l2,l3,r1,r2,r3} = this.face
    gsap.set(
       open?[ l1, l2, l3, r1, r2, r3]:
      [ ld1, ld2, ld3, rd1, rd2 , rd3, lu, ru, lc, rc]
      , {
      strokeDasharray: 60,
      strokeDashoffset: 60
    });
    gsap.set([  lc, rc], {
      opacity: open?1:0
     }); 
     gsap.set(this.faceIcon, {
      opacity: open?1:.5
     }); 
   
  }
  edit() {
    const { data, groupID } = this.props;
    this.props.TaskDialog({
      groupID: groupID,
      open: true,
      task: data
    });
  }
  delete() {
    const { data, groupID, cat } = this.props;
    gsap
      .timeline()
      .to(this.item, 0.1, {
        css: {
          marginBottom: "0 0 20px 0"
        }
      })
      .to(this.item, 0.3, {
        css: {
          rotation: 3,
          marginBottom: "20px",
          marginTop: "20px",
          y: 13
        }
      })
      .to(this.item, 0.5, {
        opacity: 0,
        x: 50,
        y: -80
      })
      .to(this.item, 0.5, {
        css: {
          marginBottom: "0",
          marginTop: "0",
          height: 0
        },
        onComplete: (x, y, z, c) => {
          // this.props.parent.aniControl = csAni.none;
          // this.props.groupParent.aniControl = csAni.downToUp;
          // this.props.groupParent.aniIndex = data.order;
          z.TaskRemove(
            {
              groupID: x,
              taskID: y.id
            },
            c
          );
        },
        onCompleteParams: [groupID, data, this.props, cat]
      });
  }
  componentDidMount() {
    const { data } = this.props; 
    this.faceWiggle = gsap.timeline({repeat:-1}) .to(this.faceIcon,0.3,{y:-5}).to(this.faceIcon,0.3,{y:0}).pause();
    this.faceSet(!data.isCompleted); 
    if (!data.dragDroped)
      gsap
        .timeline()
        .fromTo(
          this.item,
          1,
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            delay: data.order * 0.05,
            ease: "expo.out"
          }
        )
        .set(this.item, { clearProps: "all" });
  }
  onClicked() {
    const { data, groupID, cat } = this.props;
    this.faceWiggle.pause(0);
    this.props.TaskCheck(
      {
        ...data,
        isCompleted: !data.isCompleted,
        id: data.id
      },
      cat,
      groupID
    );
  }
  componentDidUpdate(preProps, preState) {
    const { data } = this.props;
    if (preProps.data.isCompleted !== this.props.data.isCompleted) {
      this.faceOpen(!data.isCompleted); 
    }
    if (preState.isOpened !== this.state.isOpened) {
      if (this.state.isOpened) {
        var minHeight = 50;
        var maxHeight = 200;
        var height = this.detailText.offsetHeight+20;
        console.log(height);
        gsap.to(this.detail, 0.3, {
          height:
            height < minHeight
              ? minHeight
              : height > maxHeight
              ? maxHeight
              : height,
              padding:5,
              borderTopWidth:2, 
        });
        gsap.fromTo(
          this.detailText,
          0.3,
          {
            y: -30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1
          }
        );
        gsap.to(this.detailBox, 0.3, {
          rotation: 180
        });
      } else {
        gsap.to(this.detail, 0.3, {
          height: 0,
          padding:0,
          borderTopWidth:0, 
        });
        gsap.fromTo(
          this.detailText,
          0.3,
          {
            y: 0,
            opacity: 1
          },
          {
            y: -30,
            opacity: 0
          }
        );
        gsap.to(this.detailBox, 0.3, {
          rotation: 0
        });
      }
    }
    const checkIsDate = isDate(data.taskDate);
    if (isDate(preProps.data.taskDate) !== checkIsDate) {
      this.setState({
        taskDate: checkIsDate ? data.taskDate : new Date()
      });
    }
    if (this.state.isTextEdit) {
      this.textInput.focus();
    }
    if (data.taskText !== preProps.data.taskText) {
      this.setState({ taskText: data.taskText });
    }
  }
  detailClick() {
    this.setState(x => ({
      isOpened: !x.isOpened
    }));
  }
  textBlur() {
    this.saveTextChanged(true);
  }
  textKeyDown(e) {
    if (e.key === "Enter") {
      this.saveTextChanged(true);
    } else if (e.key === "Escape") {
      this.saveTextChanged(false);
    }
  }
  saveTextChanged(save) {
    this.setState({ isTextEdit: false });
    if (!save) return;
    const { taskText } = this.state;
    const { data } = this.props;

    if (taskText !== data.taskText) {
      const { groupID, data, cat } = this.props;
      this.props.TaskSave(
        {
          ...data,
          taskText: taskText
        },
        cat,
        groupID
      );
    }
  }
  saveDateChanged(date) {
    const { data } = this.props;
    if (date !== data.taskDate) {
      const { groupID, data, cat } = this.props;
      this.props.TaskSave(
        {
          ...data,
          taskDate: date
        },
        cat,
        groupID
      );
    }
  }
  textDoubleClick() {
    const { data } = this.props;
    this.setState({ isTextEdit: true, taskText: data.taskText });
  }
  render() {
    const { provided, data } = this.props;
    const { isTextEdit, taskDate } = this.state;
    return (
      <ContextMenuTrigger
        holdToDisplay={1500}
        id="tc"
        collect={() => ({ taskItem: this })}
      >
        <div
          className="TaskItem"
          ref={x => {
            this.item = x;
            return provided.innerRef(x);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskBg className="bg" />
          <div className="s1">
            <div className="content">
              <div onClick={this.onClicked} onMouseEnter={()=>{
                if(!data.isCompleted)
                this.faceWiggle.restart();
              }} onMouseLeave={()=>{ 
                this.faceWiggle.pause(0);
              }} className="checkBox">
              <svg className="icon" ref={(x)=>this.faceIcon = x} width="35" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path ref={x => { this.face.l1 = x; }} strokeDasharray='60' strokeDashoffset='0'  d="M5.8842 16.9021L7.65271 13.0938" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.l2 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M11.5159 17.3885L11.3334 14.2314" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.l3 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M16.774 15.6965L15.1841 12.9629" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.r1 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M32.3781 16.9021L34.1466 13.0938" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.r2 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M38.0098 17.3885L37.8273 14.2314" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.r3 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M43.2679 15.6965L41.678 12.9629" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.ld = x; }} strokeDasharray='60' strokeDashoffset='0' d="M3 9C3 9.5 4.74845 14 10.5 14C16.2516 14 18 9.5 18 9" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.rd = x; }} strokeDasharray='60' strokeDashoffset='0' d="M29 9C29 9.5 30.7484 14 36.5 14C42.2516 14 44 9.5 44 9" stroke="#764A00" strokeWidth="2"/>
<path  d="M21.5923 15.3916L25.9019 16.7529L23.5404 20.6465" stroke="#764A00" strokeWidth="2"/>
<path d="M16.3713 23.8848C17.8707 24.9397 21.8638 28.4841 28.3798 27.6469" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.lu = x; }} strokeDasharray='60' strokeDashoffset='0' d="M18 9.00003C18 8 16.2516 3.99999 10.5 3.99999C4.74845 3.99999 3 8 3 9.00003" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.ru = x; }} strokeDasharray='60' strokeDashoffset='0' d="M44 9.00003C44 8 42.2516 3.99999 36.5 3.99999C30.7484 3.99999 29 8 29 9.00003" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.ld1 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M4.05762 7.36328L1 4.48535" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.ld2 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M6.29949 4.86709L4.81799 2.07324" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.ld3 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M9.50473 4.06897L8.74194 1" stroke="#764A00" strokeWidth="2"/> 
<ellipse ref={x => { this.face.lc = x; }} cx="10.0593" cy="9.18936" rx="2.05935" ry="2.18936" fill="#764A00"/>
<ellipse ref={x => { this.face.rc = x; }} cx="36.0593" cy="9.18936" rx="2.05935" ry="2.18936" fill="#764A00"/> 
<path ref={x => { this.face.rd1 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M30.0576 7.36328L27 4.48535" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.rd2 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M32.2995 4.86709L30.818 2.07324" stroke="#764A00" strokeWidth="2"/>
<path ref={x => { this.face.rd3 = x; }} strokeDasharray='60' strokeDashoffset='0' d="M35.5047 4.06897L34.7419 1" stroke="#764A00" strokeWidth="2"/>
</svg> 
              </div>
              <div className="text">
              {isTextEdit ? (
                  <input
                    onChange={e =>
                      this.setState({
                        taskText: e.target.value
                      })
                    }
                    value={this.state.taskText}
                    ref={x => {
                      this.textInput = x;
                    }}
                    onBlur={this.textBlur}
                    onKeyDown={this.textKeyDown}
                  />
                ) : (
                  <div onDoubleClick={this.textDoubleClick}>
                    {data.taskText}
                  </div>
                )}
                <DatePicker
                  {...ReactDatePickerProps}
                  ref={c => (this._calendar = c)}
                  selected={taskDate}
                  onChange={x => this.saveDateChanged(x)}
                  customInput={<div className="hiddenItem"></div>}
                  showWeekNumbers
                />
                 {isDate(data.taskDate) &&<div className='thedate' onDoubleClick={() => this._calendar.setOpen(true)}>
                {
                    data.taskDate.getMonth() +
                    1 +
                    "/" +
                    data.taskDate.getDate()
                   
                }
                </div>}
           
              </div>
              {data.detail !== "" && (
                <div
                  ref={x => {
                    this.detailBox = x;
                  }}
                  onClick={this.detailClick}
                  className="detailBox"
                >
                  <Down />
                </div>
              )}
            </div>
          </div>
          <div
            className="s2"
            ref={x => {
              this.detail = x;
            }}
          >
            <Scrollbars
              style={{
                wordWrap: "break-word",
                overflowX: "hidden", 
                height: "100%", 
              }}
              autoHide
              autoHideTimeout={500}
              autoHideDuration={200}
              renderTrackHorizontal={props => (
                <div {...props} style={{ display: "none" }} />
              )}
            >
              <div
                className="detail"
                ref={x => {
                  this.detailText = x;
                }}
              >
                {data.detail}
              </div>
            </Scrollbars>
          </div>
        </div>
      </ContextMenuTrigger>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ TaskCheck, TaskRemove, TaskDialog, TaskSave }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
