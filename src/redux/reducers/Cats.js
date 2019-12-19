import { CAT_RECEIVED, CAT_READ, UPDATE, CLOSE_CAT } from "../actions";
import { Map } from "immutable";
import undoable from "redux-undo";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CAT_READ:
      if (action) {
        const nextState = Map(state)
          .setIn([action.cat.id.toString(), "groups"], action.cat.groups)
          .setIn([action.cat.id.toString(), "tasks"], action.cat.tasks);
        return nextState.toJS();
      }
      return state;
    case CAT_RECEIVED:
    case UPDATE:
      if (action.data) {
        return action.data;
      }
      return state;
    case CLOSE_CAT:
      if (action.id) {
        const nextMap = Map(state[action.id.toString()].tasks).
          map(x => { x.dragDroped = false; return x });
        const nextState = Map(state).setIn([action.id.toString(), 'tasks'], nextMap)
        return nextState.toJS();
      }
      return state;
    default:
      return state;
  }
};

const undoableReducer = undoable(reducer, {
  debug: false
});
export default undoableReducer;
