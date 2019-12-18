import React, { Component } from "react";
import { connect } from "react-redux";
import gsap from "gsap";
import { csAni } from "../gsapControl";
import { ContextMenuTrigger } from "react-contextmenu";
import { CallRemoveCat, readCat } from "../redux/actions";
import { bindActionCreators } from "redux";
import { ReactComponent as Handle } from "../svg/Handle.svg";
import { NavLink } from "react-router-dom";
export class CatItem extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.CatClicked = this.CatClicked.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    gsap.fromTo(
      this.item,
      1,
      {
        opacity: 0,
        y: -100
      },
      {
        opacity: 1,
        y: 0,
        delay: data.order * 0.02,
        ease: "back.out(1.4)"
      }
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    const { aniControl, aniIndex } = this.props.selector;
    if (aniControl !== csAni.none && aniIndex <= data.order) {
      gsap.fromTo(
        this.item,
        1,
        {
          y: aniControl === csAni.upToDown ? -100 : 100
        },
        {
          y: 0,
          delay: data.order * 0.02,
          ease: "back.out(1.4)"
        }
      );
    }
  }

  delete() {
    const { data } = this.props;

    gsap.to(this.item, 0.5, {
      opacity: 0,
      x: -80,
      onComplete: () => {
        this.props.selector.aniControl = csAni.downToUp;
        this.props.selector.aniIndex = data.order;
        this.props.CallRemoveCat(data.id);
      }
    });
  }
  CatClicked() {
    const { data } = this.props;

    this.props.enterCat(data);

    // gsap.to(this.props.selector.index, 0.5, {
    //     opacity: 0,
    //     x: -80,
    //     onComplete: () => {
    //         this.props.enterCat(data);
    //     }
    // });
    // this.props.SelectCat(data);
  }
  render() {
    const { provided, data } = this.props;
    return (
      <ContextMenuTrigger id="cc" collect={() => ({ catItem: this })}>
        <div
          className="CatItem"
          ref={e => {
            this.item = e;
            return provided.innerRef(e);
          }}
          {...provided.draggableProps}
        >
          <NavLink to="/Cat" className="content" onClick={this.CatClicked}>
            <h2>{data.catname}</h2>
          </NavLink>
          <div
            className="handle"
            {...provided.dragHandleProps}
            //isdragging={snapshot.isDragging && !snapshot.isDropAnimating}
            // style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <Handle />
          </div>
        </div>
      </ContextMenuTrigger>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ CallRemoveCat, enterCat: readCat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatItem);
