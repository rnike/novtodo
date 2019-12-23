import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TaskDialog, CallTaskUpdate as addTask } from "../redux/actions";
import { ReactComponent as Unmore } from "../svg/Unmore.svg";
import { ReactComponent as More } from "../svg/More.svg";
import { ReactComponent as Calendar } from "../svg/Calendar.svg";
import { ReactComponent as Cross } from "../svg/Cross.svg";
import { ReactComponent as Circle } from "../svg/Circle.svg";

import DatePicker from "react-datepicker";
import gsap from "gsap";
import { isDate } from "date-fns";
class TaskAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false,
      date: new Date(),
      isDate: false,
      text: "",
      detail: ""
    };
    this.moreClick = this.moreClick.bind(this);
    this.textChanged = this.textChanged.bind(this);
    this.detailChanged = this.detailChanged.bind(this);
    this.newTask = this.newTask.bind(this);
    this.close = this.close.bind(this);
    this.textKeyDown = this.textKeyDown.bind(this);

    this.detailAnimate = open =>
      gsap.to(this.detailAera, 0.5, {
        opacity: open ? 1 : 0,
        height: open ? 200 : 0
      });
  }
  moreClick() {
    this.setState(x => ({
      moreOpen: !x.moreOpen
    }));
  }
  textKeyDown(e) {
    if (e.key === "Enter") {
      this.newTask();
    } else if (e.key === "Escape") {
      this.close();
    }
  }
  textChanged(e) {
    this.setState({ text: e.target.value });
  }
  detailChanged(e) {
    this.setState({ detail: e.target.value });
  }
  newTask() {
    const { task, cat, groupID } = this.props;
    const { moreOpen, date, isDate, text, detail } = this.state;
    if (text === "") {
      return;
    }
    this.props.addTask(
      {
        ...task,
        id: task.id ? task.id : 0,
        taskText: text,
        taskDate: isDate ? date : null,
        isCompleted: !task.isCompleted ? false : task.isCompleted,
        detail:
          moreOpen && !(detail === undefined || detail === null) ? detail : ""
      },
      cat,
      groupID
    );
    this.setState({
      moreOpen: false,
      date: new Date(),
      isDate: false,
      text: "",
      detail: ""
    });
    this.props.TaskDialog({
      groupID: "",
      open: false,
      task: {}
    });
  }
  componentDidMount() {}
  componentDidUpdate(PreProp, PreState) {
    const { open, task } = this.props;
    if (open && !PreProp.open) {
      gsap
        .from(this.control, 0.5, {
          opacity: 0,
          y: -80
        })
        .play();

      if (task && task.id) {
        const isData = isDate(task.taskDate);
        this.setState({
          text: task.taskText,
          isDate: isData,
          date: isData ? task.taskDate : new Date(),
          detail: task.detail,
          moreOpen: task.detail !== ""
        });
        this.detailAnimate(task.detail !== "");
      }
      this.theInput.focus();
    }
    if (this.state.moreOpen !== PreState.moreOpen) {
      this.detailAnimate(this.state.moreOpen);
    }
  }
  close() {
    gsap.to(this.control, 0.5, {
      opacity: 0,
      y: -80,
      onComplete: () =>
        this.props.TaskDialog({
          groupId: "",
          open: false,
          task: {}
        })
    });
  }
  render() {
    const { open } = this.props;
    const { isDate, date } = this.state;
    if (!open) {
      return null;
    }
    return (
      <div className="TaskAdd">
        <div
          ref={x => {
            this.control = x;
          }}
          className="modal"
        >
          <div className="header">
            <div className="datePanel">
              <DatePicker
                selected={date}
                onChange={x =>
                  this.setState({
                    date: x,
                    isDate: true
                  })
                }
                customInput={
                  <div className="datePanel">
                    <Calendar className="iconButton"></Calendar>
                    {isDate && (
                      <div className="dateText">
                        {1 + date.getMonth() + "/" + date.getDate()}
                      </div>
                    )}
                  </div>
                }
                showWeekNumbers
              />
              {isDate && (
                <Cross
                  onClick={() => this.setState({ isDate: false })}
                  className="iconButton cross"
                  viewBox="0,0,30,30" 
                />
              )}
            </div>
            {this.state.moreOpen ? (
              <Unmore onClick={this.moreClick} className="iconButton" />
            ) : (
              <More onClick={this.moreClick} className="iconButton" />
            )}
          </div>
          <div className="body">
            <input
              ref={input => {
                this.theInput = input;
              }}
              type="text"
              value={this.state.text}
              onChange={this.textChanged}
              onKeyDown={this.textKeyDown}
            />
            <div>
              <textarea
                ref={x => {
                  this.detailAera = x;
                }}
                rows="4"
                cols="50"
                type="text"
                value={this.state.detail}
                onChange={this.detailChanged}
              />
            </div>
          </div>
          <div className="footer">
            <Circle onClick={this.newTask} className="iconButton circle" />
            <Cross onClick={this.close} className="iconButton cross" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.GlobalControl });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ TaskDialog, addTask }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);
