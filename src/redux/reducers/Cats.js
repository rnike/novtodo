import { CAT_RECEIVED, CAT_READ, UPDATE } from "../actions";
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
    default:
      return state;
  }
};

const undoableReducer = undoable(reducer, {
  debug: false
});
export default undoableReducer;
