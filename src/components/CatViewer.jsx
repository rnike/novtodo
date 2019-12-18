import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  CallCatNameChanged as CatNameChanged,
  CallReorderGroup as ReorderGroup,
  CallReorderTask as ReorderTask,
  TaskDialog,
  CallAddNewGroup as AddNewGroup,
  CloseCat,
  HideCheckedToggle
} from "../redux/actions";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { Map } from "immutable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskGroup from "./TaskGroup";
import { ReactComponent as Add } from "../svg/Add.svg";
import { ReactComponent as Menu } from "../svg/Menu.svg";
import TaskAdd from "./TaskAdd";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { NavLink } from "react-router-dom";
import { csAni } from "../gsapControl";

export class CatViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraging: false,
      titleEditing: false,
      GroupAdded: false,
      editText: ""
    };

    this.AddClicked = this.AddClicked.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.ComfirmTitleEdit = this.ComfirmTitleEdit.bind(this);
    this.CancelTitleEdit = this.CancelTitleEdit.bind(this);
    this.StartEdit = this.StartEdit.bind(this);
    this.titleKeyDown = this.titleKeyDown.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.deleteGroupClick = this.deleteGroupClick.bind(this);
    this.editTask = this.editTask.bind(this);
    this.MenuClicked = this.MenuClicked.bind(this);
    this.init = this.init.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.aniControl = csAni.rightToLeft;
    this.aniIndex = 0;
  }
  init() {
  }
  AddClicked() {
    this.aniControl = csAni.none;
    this.setState({ GroupAdded: true });
    this.props.AddNewGroup(this.props.cat.id);
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (this.state.titleEditing) {
      this.titleInput.focus();
    }

    if (prevProps.cat && this.props.cat) {
      const preGroups = Map(prevProps.cat.groups);
      const groups = Map(this.props.cat.groups);
      const keys = groups
        .deleteAll(preGroups.keys())
        .keySeq()
        .toJS();
      const { GroupAdded } = this.state;
      if (GroupAdded && keys.length > 0) {
        // console.log(this.panel)
        this.panel.scrollTo(this.panel.scrollWidth, 0);
        // gsap.to(this.panel,2, { scrollTo: {x:200}  });
        this.setState({ GroupAdded: false });
      }
    }
    //    console.log(prevProps.isLoading, this.props.isLoading);
    //  console.log("if", prevProps.isLoading !== this.props.isLoading);
 
  }
  onMouseMove(e) {
    // e.preventDefault();
    // var containerScrollPosition = this.panel.scrollLeft;
    // this.panel.scrollTo({
    //     top: 0,
    //     left: containerScrollPosition + e.deltaY,
    //     behaviour: "smooth" //if you want smooth scrolling
    // });
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
  ComfirmTitleEdit() {
    const { cat } = this.props;
    this.props.CatNameChanged(cat, this.state.editText);
    this.setState({ titleEditing: false });
  }
  CancelTitleEdit() {
    this.setState({ titleEditing: false });
  }
  StartEdit() {
    this.setState({ editText: this.props.cat.catname, titleEditing: true });
  }
  onDragStart(result) {
    this.aniControl = csAni.none;
    if (result.type !== "group") {
      this.setState({ isDraging: true });
    } else {
    }
  }
  onDragEnd(result) {
    this.setState({ isDraging: false });
    const { source, destination } = result;
    const { cat } = this.props;
    if (result.type === "group") {
      if (!destination || destination.index === source.index) {
        // console.log("dropped outside the list or same");
        return;
      }
      this.props.ReorderGroup(result, cat);
    } else {
      if (
        !destination ||
        (source.droppableId === destination.droppableId &&
          destination.index === source.index)
      ) {
        // console.log("dropped outside the list or same");
        return;
      }
      
      this.props.ReorderTask(result, cat);
    }
  }
  deleteClick(e, data) {
    data.taskItem.delete();
  }
  editTask(e, data) {
    data.taskItem.edit();
  }
  deleteGroupClick(e, data) {
    // const { cat } = this.props;
    data.item.delete();
    // this.props.GroupRemove(data.groupID, cat);
  }
  MenuClicked() {
    console.log(this.props);

    this.props.CloseCat();
    this.props.clearHistory();
  }
  render() {
    const { cat, isLoading, hideChecked } = this.props;

    // if (isLoading || !cat) {
    //     return <div>loading</div>;
    // }
    return (
      <div
        onWheel={this.onMouseMove}
        className="index"
        ref={x => (this.index = x)}
      >
        <nav className="head" ref={x => (this.nav = x)}>
          {!this.state.titleEditing && (
            <NavLink className="iconButton" onClick={this.MenuClicked} to="/">
              <Menu />
            </NavLink>
          )}
          {/* {canUndo && (
                        <div
                            className="iconButton"
                            onClick={() => {
                                undo();
                            }}
                        >
                            UNDO
                        </div>
                    )}
                    {canRedo && (
                        <div
                            className="iconButton"
                            onClick={() => {
                                redo();
                            }}
                        >
                            REDO
                        </div>
                    )} */}
          {!isLoading && this.state.titleEditing ? (
            <input
              ref={input => {
                this.titleInput = input;
              }}
              className="titleInput"
              type="text"
              value={this.state.editText}
              onChange={this.titleChanged}
              onKeyDown={this.titleKeyDown}
              onBlur={this.ComfirmTitleEdit}
            />
          ) : (
            <h1 onDoubleClick={this.StartEdit}>{cat && cat.catname}</h1>
          )}
          {!this.state.titleEditing && (
            <div className="iconButton center" onClick={this.AddClicked}>
              <Add />
            </div>
          )}

          <div
            className="iconButton centerRight text"
            onClick={() => this.props.HideCheckedToggle()}
          >
            {hideChecked ? "ShowChecked" : "HideChecked"}
          </div>
          {/* {!window.demo && (
                        <div className="logout" onClick={axiosLogout}>
                            Logout
                        </div>
                    )} */}
        </nav>
        <DragDropContext
          onBeforeDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <Droppable type="group" droppableId="gd" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="GroupPanel"
                ref={x => {
                  this.panel = x;
                  return provided.innerRef(x);
                }}
                // {...provided.droppableProps}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {cat &&
                  Map(cat.groups)
                    .filter(x => x.cat_id === cat.id)
                    .sortBy(x => x.order)
                    .valueSeq()
                    .map((group, i) => {
                      const dID = group.id.toString();

                      return (
                        <Draggable
                          id={`g${dID}`}
                          key={`g${dID}`}
                          draggableId={`g${dID}`}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <TaskGroup
                              parent={this}
                              data={group}
                              cat={cat}
                              tasks={Map(cat.tasks)
                                .filter(x => x && x.group_id === group.id)
                                .sortBy(x => x.order)
                                .valueSeq()}
                              provided={provided}
                              snapshot={snapshot}
                            ></TaskGroup>
                          )}
                        </Draggable>
                      );
                    })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ContextMenu id="tc">
          <MenuItem onClick={this.editTask}>EditTask</MenuItem>
          <MenuItem onClick={this.deleteClick}>DeleteTask</MenuItem>
        </ContextMenu>
        <ContextMenu id="gc">
          <MenuItem onClick={this.deleteGroupClick}>DeleteGroup</MenuItem>
        </ContextMenu>
        <TaskAdd />
        {window.demo && (
          <div className="demo">
            <h2>This is a demo page.</h2>
            {/* <Login /> */}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cat:
    state.Cat.present && state.GlobalControl.cat.id
      ? state.Cat.present[state.GlobalControl.cat.id.toString()]
      : null,
  isLoading: state.GlobalControl.isLoading,
  hideChecked: state.GlobalControl.hideChecked,
  canUndo: state.Cat.past.length > 0,
  canRedo: state.Cat.future.length > 0,
  isBusy: state.GlobalControl.isBusy
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      CatNameChanged,
      ReorderGroup,
      ReorderTask,
      TaskDialog,
      AddNewGroup,
      CloseCat,
      HideCheckedToggle,
      undo: UndoActionCreators.undo,
      redo: UndoActionCreators.redo,
      clearHistory: UndoActionCreators.clearHistory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CatViewer);
