import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { ReactComponent as GroupHead } from "../svg/GroupHead.svg";
import { ReactComponent as Add } from "../svg/Add.svg";
import { bindActionCreators } from "redux";
import gsap from "gsap";
import { csAni } from "../gsapControl";
import { ContextMenuTrigger } from "react-contextmenu";
import {
  CallGroupNameChanged as GroupNameChanged,
  TaskDialog,
  CallGroupRemove
} from "../redux/actions";
export class TaskGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEditing: false,
      editText: ""
    };
    this.editClick = this.editClick.bind(this);
    this.addClick = this.addClick.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.StartEdit = this.StartEdit.bind(this);
    this.ComfirmTitleEdit = this.ComfirmTitleEdit.bind(this);
    this.CancelTitleEdit = this.CancelTitleEdit.bind(this);
    this.titleKeyDown = this.titleKeyDown.bind(this);
    this.titleBlur = this.titleBlur.bind(this);
    this.delete = this.delete.bind(this); 
  }
  titleChanged(e) {
    this.setState({ editText: e.target.value });
  }
  titleKeyDown(e) {
    if (e.key === "Enter") {
      this.ComfirmTitleEdit();
    } else if (e.key === "Escape") {
      this.CancelTitleEdit();
    }
  }
  titleBlur() {
    this.ComfirmTitleEdit();
  }
  componentDidMount() {
    gsap
      .timeline()
      .fromTo(
        this.item,
        1,
        {
          opacity: 0,
          x: 300
        },
        {
          opacity: 1,
          x: 0,
          ease: "circ.out"
        }
      )
      .set(this.item, { clearProps: "all" });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.titleEditing) {
      this.titleInput.focus();
    }
    const { data } = this.props;
    const { aniControl, aniIndex } = this.props.parent;
  }

  StartEdit() {
    this.setState({
      editText: this.props.data.groupName,
      titleEditing: true
    });
  }
  ComfirmTitleEdit() {
    const { cat } = this.props;
    this.props.GroupNameChanged(
      {
        id: this.props.data.id,
        newName: this.state.editText
      },
      cat
    );
    this.setState({ titleEditing: false });
  }
  CancelTitleEdit() {
    this.setState({ titleEditing: false });
  }
  editClick() {
    this.setState({
      editText: this.props.data.groupName,
      titleEditing: true
    });
  }
  addClick() {
    this.props.parent.aniControl = csAni.none;
    this.props.TaskDialog({
      groupID: this.props.data.id,
      open: true,
      task: {}
    });
  }
  delete() {
    const { cat, data } = this.props;
    gsap.to(this.item, 0.5, {
      opacity: 0,
      y: 100,
      x: 50,
      onComplete: () => {
        this.props.parent.aniControl = csAni.rightToLeft;
        this.props.parent.aniIndex = data.order;
        this.props.CallGroupRemove(data.id, cat);
      }
    });
  }
  render() {
    const { provided, data, tasks, cat, hideChecked } = this.props;
    return (
      <ContextMenuTrigger
        id="gc"
        collect={() => ({ groupID: data.id, item: this })}
      >
        <div
          className="TaskGroup"
          ref={e => {
            this.item = e;
            return provided.innerRef(e);
          }}
          {...provided.draggableProps}
        >
          <GroupHead className="bg" />
          <div className="title">
            {/* <div className="iconPanel"></div> */}
            <div
              onDoubleClick={this.editClick}
              className="groupName"
              {...provided.dragHandleProps}
            >
              {this.state.titleEditing ? (
                <input
                  ref={input => {
                    this.titleInput = input;
                  }}
                  className="titleInput"
                  type="text"
                  value={this.state.editText}
                  onChange={this.titleChanged}
                  onKeyDown={this.titleKeyDown}
                  onBlur={this.titleBlur}
                />
              ) : (
                <h2>{data.groupName}</h2>
              )}
            </div>
            <div className="iconPanel">
              <Add
                onClick={this.addClick}
                viewBox="0,0,30,30"
                className="icon"
              />
            </div>
          </div>
          <Droppable type="task" droppableId={data.id.toString()}>
            {(provided, snapshot) => (
              <div
                className="TaskPanel"
                ref={provided.innerRef}
                // {...provided.droppableProps}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {tasks.map((x, i) => {
                  if (hideChecked && x.isCompleted) {
                    return null;
                  }
                  const dID = x.id.toString();
                  return (
                    <Draggable
                      key={`t${dID}`}
                      draggableId={`t${dID}`}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <TaskItem
                          parent={this.props.parent}
                          groupParent={this}
                          cat={cat}
                          groupID={data.id}
                          data={x}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </ContextMenuTrigger>
    );
  }
}

const mapStateToProps = state => ({
  hideChecked: state.GlobalControl.hideChecked
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { GroupNameChanged, CallGroupRemove, TaskDialog },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskGroup);
