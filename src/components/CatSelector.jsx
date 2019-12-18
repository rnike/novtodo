import React, { Component } from "react";
import { csAni } from "../gsapControl";
import { connect } from "react-redux";
import CatItem from "./CatItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Map } from "immutable";
import {
  CallReorderCat as ReorderCat,
  CallAddCat as AddCat,
  fetCatsIfNeeded
} from "../redux/actions";
import { bindActionCreators } from "redux";
import gsap from "gsap";
import { ReactComponent as Add } from "../svg/Add.svg";
import { ContextMenu, MenuItem } from "react-contextmenu";
// import Login, { axiosLogout } from "../../../Utils/js/Login";
export class CatSelector extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.AddClicked = this.AddClicked.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.init = this.init.bind(this);
    this.onDragStart = this.onDragStart.bind(this);

    this.timeLine = gsap.timeline();
    this.aniControl = csAni.upToDown;
    this.aniIndex = 0;
  }

  AddClicked() {
    this.aniControl = csAni.upToDown;
    this.aniIndex = 0;
    this.props.AddCat();
  }
  init() {
    // if (!this.isInit) {
    //     gsap.from(this.nav, 1, {
    //         opacity: 0,
    //         y: -80
    //     }).play();
    //     this.isInit = true;
    // }
  }
  onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination || destination.index === source.index) {
      return;
    }
    this.props.ReorderCat(result);
  }
  onDragStart() {
    this.aniControl = csAni.none;
  }
  componentDidMount() {
    const { fetch } = this.props;
    if (fetch()) {
      this.timeLine.add(
        gsap.fromTo(
          this.index,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 1
          }
        )
      );
      // this.timeLine.add(
      //     gsap.fromTo(
      //         this.list,
      //         {
      //             y:1000,
      //         },
      //         {
      //             y:0,
      //             duration: 1
      //         }
      //     )
      // );
    }
  }
  componentWillUnmount() {
    this.isInit = false;
    this.timeLine.kill();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isLoading) {
      this.init();
    }
  }

  deleteClick(e, data) {
    data.catItem.delete();
  }
  render() {
    const { isLoading, CatData, isBusy } = this.props;

    // if (isLoading) {
    //     return <div>loading</div>;
    // }
    return (
      <div
        ref={x => (this.index = x)}
        disabled={isBusy}
        className="index"
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <nav className="head" ref={x => (this.nav = x)}>
          <h1>NOVTODO</h1>
          <div className="iconButton center" onClick={this.AddClicked}>
            <Add />
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
          <Droppable droppableId="cd">
            {(provided, snapshot) => (
              <div
                className="catlist"
                ref={x => {
                  this.list = x;
                  return provided.innerRef(x);
                }}
                // {...provided.droppableProps}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {Map(CatData)
                  .sortBy(x => x.order)
                  .valueSeq()
                  .map((cat, i) => {
                    const keyS = cat.id.toString();
                    return (
                      <Draggable key={keyS} draggableId={keyS} index={i}>
                        {(provided, snapshot) => (
                          <CatItem
                            selector={this}
                            timeLine={this.timeLine}
                            data={cat}
                            provided={provided}
                            snapshot={snapshot}
                          ></CatItem>
                        )}
                      </Draggable>
                    );
                  })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ContextMenu id="cc">
          <MenuItem onClick={this.deleteClick}>Delete</MenuItem>
        </ContextMenu>
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
  isLoading: state.GlobalControl.isLoading,
  CatData: state.Cat.present ? state.Cat.present : {},
  isBusy: state.GlobalControl.isBusy
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ReorderCat, AddCat, fetch: fetCatsIfNeeded }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatSelector);
