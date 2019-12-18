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
        }
        // onComplete: () => {
        //     this.props.parent.aniControl = csAni.none;
        //     // this.props.groupParent.aniControl = csAni.downToUp;
        //     // this.props.groupParent.aniIndex = data.order;
        //     this.props.TaskRemove(
        //         {
        //             groupID: groupID,
        //             taskID: data.id
        //         },
        //         cat
        //     );
        // }
      });
  }
  componentDidMount() {
    const { data } = this.props;
    if (data.isCompleted) {
      gsap.set(this.check, {
        strokeDasharray: 60,
        strokeDashoffset: 0
      });
    } else {
      gsap.set(this.check, {
        strokeDasharray: 60,
        strokeDashoffset: 60
      });
    }
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
      if (this.props.data.isCompleted) {
        gsap.to(this.check, 0.3, {
          strokeDasharray: 60,
          strokeDashoffset: 0
        });
      } else {
        gsap.to(this.check, 0.3, {
          strokeDasharray: 60,
          strokeDashoffset: 60
        });
      }
    }
    if (preState.isOpened !== this.state.isOpened) {
      if (this.state.isOpened) {
        var minHeight = 50;
        var maxHeight = 200;
        var height = this.detailText.offsetHeight;
        gsap.to(this.detail, 0.3, {
          height:
            height < minHeight
              ? minHeight
              : height > maxHeight
              ? maxHeight
              : height
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
          height: 0
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
    // if (
    //     this.props.groupParent.aniControl !== csAni.none &&
    //     this.props.groupParent.aniIndex <= data.order
    // ) {
    //     // gsap.set(this.item,{
    //     //     y:121
    //     // })
    //     gsap.timeline()
    //         .fromTo(
    //             this.item,
    //             1,
    //             {
    //                 y: 121
    //             },
    //             {
    //                 y: 0,
    //                 delay: data.order * 0.05,
    //                 ease: "expo.out",
    //                 onComplete: () => {
    //                     this.props.groupParent.aniControl = csAni.none;
    //                 }
    //             }
    //         )
    //         .set(this.item, { clearProps: "all" });
    // }
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
      <ContextMenuTrigger id="tc" collect={() => ({ taskItem: this })}>
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
            {/* <div className="handle" >
                            <TaskHandle />
                        </div> */}
            <div className="content">
              <div onClick={this.onClicked} className="checkBox">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="20"
                    y="20"
                    width="20"
                    height="19.4806"
                    fill="white"
                    stroke="#B3B3B3"
                  />
                  <path
                    ref={x => {
                      this.check = x;
                    }}
                    d="M18 25L30.5 34.5L49 2"
                    stroke="#FFE296"
                    strokeWidth="5"
                  />
                </svg>
              </div>
              <div className="text">
                <DatePicker
                  {...ReactDatePickerProps}
                  ref={c => (this._calendar = c)}
                  selected={taskDate}
                  onChange={x => this.saveDateChanged(x)}
                  customInput={<div className="hiddenItem"></div>}
                  showWeekNumbers
                />
                <div onDoubleClick={() => this._calendar.setOpen(true)}>
                  {isDate(data.taskDate)
                    ? data.taskDate.getMonth() +
                      1 +
                      "/" +
                      data.taskDate.getDate()
                    : ""}
                </div>
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
              </div>
              {data.detail !== "" && (
                <div
                  ref={x => {
                    this.detailBox = x;
                  }}
                  onClick={this.detailClick}
                  className="detailBox"
                >
                  <Down viewBox="0 0 15 15" />
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
                width: "260px",
                height: "77.5%",
                margin: "20px 20px 25px 20px"
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
