import {
  TASK_DIALOG,
  HIDE_CHECKED,
  CAT_READING,
  CAT_READ,
  CAT_FETCHING,
  CAT_RECEIVED,
  BUSY,
  CLOSE_CAT
} from "../actions";
const initialState = {
  groupID: "",
  // isLoading: true,
  hideChecked: false,
  isBusy: false,
  open: false,
  task: {
    id: 0
  },
  cat: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case BUSY:
      return {
        ...state,
        isBusy: action.b
      };
    case CLOSE_CAT:
      return {
        ...state,
        cat: {}
      };
    case TASK_DIALOG:
      if (action.result) {
        return {
          ...state,
          ...action.result
        };
      }
      return state;
    case CAT_READ:
      if (action.cat) {
        return {
          ...state,
          cat: action.cat,
          isLoading: false
        };
      }
      return state;
    case HIDE_CHECKED:
      return {
        ...state,
        hideChecked: !state.hideChecked
      };
    case CAT_READING:
    case CAT_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case CAT_RECEIVED:
      if (action) {
        return {
          ...state,
          isLoading: false
        };
      }
      return state;
    default:
      return state;
  }
};
