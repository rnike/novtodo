import {
  axiosFetchCats,
  axiosFetchCatContent,
  axiosAddCat,
  axiosUpdateCatOrder,
  axiosUpdate,
  axiosRemove,
  axiosAddGroup,
  axiosReorderGroup,
  axiosReorderTask,
  axiosAddTask,
  axiosUpdateFull
} from "./axios";
import { reorder, reorderMax } from "./tools";
import { Map } from "immutable";
import "lodash";
export function fetCatsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCats(getState())) {
      dispatch(fetchCats());
      return true;
    }

    return false;
  };
}
const shouldFetchCats = state => {
  // const cat = state.Cat.present;
  const isLoading = state.GlobalControl.isLoading;
  if (isLoading === undefined) {
    return true;
  } else if (isLoading) {
    return false;
  } else {
    return false;
  }
};
const fetchCats = () => async dispatch => {
  dispatch(Busy(true));
  dispatch(CatFetching());
  //do axios
  let data = await axiosFetchCats();
  dispatch(CatReceived(data));
  dispatch(Busy(false));
};
export function readCat(cat) {
  return dispatch => {
    return dispatch(fetchCatContent(cat, shouldFetchCatContent(cat)));
  };
}
const shouldFetchCatContent = cat => {
  if (!cat.groups || !cat.tasks) {
    console.log("fetch");
    return true;
  } else {
    console.log("dont fetch");
    return false;
  }
};
const fetchCatContent = (cat, shouldFetch) => async dispatch => {
  dispatch(Busy(true));
  dispatch(CatReading(cat));
  //do axios
  if (shouldFetch) {
    cat = {
      ...cat,
      ...(await axiosFetchCatContent(cat))
    };
  }
  dispatch(CatRead(cat));
  // dispatch(ActionCreators.clearHistory());
  dispatch(Busy(false));
};
//Fetch & Receive
export const CAT_FETCHING = "CAT_FETCHING";
export const CatFetching = () => ({
  type: CAT_FETCHING
});
export const CAT_RECEIVED = "CAT_RECEIVED";
const CatReceived = data => ({
  type: CAT_RECEIVED,
  data,
  receivedAt: Date.now()
});

export const CAT_READING = "CAT_READING";
export const CatReading = cat => ({
  type: CAT_READING,
  cat
});
export const CAT_READ = "CAT_READ";
const CatRead = cat => ({
  type: CAT_READ,
  cat,
  receivedAt: Date.now()
});
export const BUSY = "BUSY";
export const Busy = b => ({
  type: BUSY,
  b
});
//ui
export const CLOSE_CAT = "CLOSE_CAT";
export const CloseCat = (id) => ({
  type: CLOSE_CAT,
  id
});
export const HIDE_CHECKED = "HIDE_CHECKED";
export const HideCheckedToggle = () => ({
  type: HIDE_CHECKED
});
export const TASK_DIALOG = "TASK_DIALOG";
export const TaskDialog = result => ({
  type: TASK_DIALOG,
  result
});
export const UPDATE = "UPDATE";
export const Update = data => ({
  type: UPDATE,
  data
});
// Cat
//Cat add
export function CallAddCat() {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const data = await axiosAddCat(getState());
    dispatch(Update(data));
    dispatch(Busy(false));
  };
}
//Cat Update
export function CallReorderCat(result) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState();
    const { source, destination } = result;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const newCats = reorder(
      Map(state.Cat.present)
        .sortBy(x => x.order)
        .keySeq(),
      sourceIndex,
      destinationIndex
    );
    const data = Map(state.Cat.present)
      .map(x => {
        console.log("pr", x);
        x.order = newCats.indexOf(x.id.toString());
        return x;
      })
      .toJS();
    dispatch(Update(data));
    axiosUpdateCatOrder(newCats);
    dispatch(Busy(false));
  };
}
export function CallCatNameChanged(cat, newName) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState();
    const catID = cat.id.toString();
    const nextState = Map(state.Cat.present)
      .setIn([catID, "catname"], newName)
      .toJS();
    dispatch(Update(nextState));
    axiosUpdate("cat", catID, "catname", newName);
    dispatch(Busy(false));
  };
}
//Cat delete
export function CallRemoveCat(id) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = id.toString();
    const data = Map(state)
      .delete(catID)
      .sortBy(x => x.order)
      .mapEntries((x, i) => {
        console.log(i, x);
        x[1].order = i;
        return x;
      })
      .toJS();
    dispatch(Update(data));
    axiosRemove("cat", catID);
    dispatch(Busy(false));
  };
}
//Group
//Group Add
export function CallAddNewGroup(catid) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState();
    const catID = catid.toString();
    var cat = Map(state.Cat.present).get(catID);
    const data = await axiosAddGroup(cat, catID, state);
    dispatch(Update(data));
    dispatch(Busy(false));
  };
}
//Group Update
export function CallReorderGroup(result, cat) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();
    const { source, destination } = result;
    var newGroups = reorder(
      Map(state[catID].groups)
        .sortBy(x => x.order)
        .keySeq(),
      source.index,
      destination.index
    );
    const data = Map(state[catID].groups)
      .map(x => {
        x.order = newGroups.indexOf(x.id.toString());
        return x;
      })
      .toJS();
    dispatch(
      Update({
        ...state,
        ...Map(state)
          .updateIn([catID, "groups"], () => data)
          .toJS()
      })
    );
    await axiosReorderGroup(newGroups);
    dispatch(Busy(false));
  };
}
export function CallGroupNameChanged(result, cat) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();
    const { id, newName } = result;
    const nextState = Map(state)
      .setIn([catID, "groups", id.toString(), "groupName"], newName)
      .toJS();
    dispatch(Update(nextState));
    axiosUpdate("group", id, "groupName", newName);
    dispatch(Busy(false));
  };
}
//Group delete
export function CallGroupRemove(groupID, cat) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();

    var removedTasks = Map(state[catID].tasks).filter(x => x.group_id == groupID).map(x => x.id);

    const nextState = Map(state)
      .update(catID, x => ({
        ...x,
        tasks: Map(x.tasks).filter(x => !removedTasks.includes(x.id))
      }))
      .removeIn([catID, "groups", groupID.toString()])
      .toJS();
    dispatch(Update(nextState));
    axiosRemove("group", groupID);
    dispatch(Busy(false));
  };
}
// Task
// Task Add
export function CallReorderTask(result, cat) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();
    const { source, destination, draggableId } = result;
    console.log(result);

    const sourceDropId = parseInt(source.droppableId);
    const destDropId = parseInt(destination.droppableId);
    let nextState;
    let newOrder = [];
    let groupIds = [];
    if (source.droppableId === destination.droppableId) {
      var m =
        Map(state[catID].tasks)
          .filter(x => x.group_id === sourceDropId)
          .sortBy(x => x.order)
          .keySeq();
      var newGroups = reorder(
        m,
        source.index,
        destination.index
      );
      let order = [];
      nextState = Map(state[catID].tasks)
        .map(x => {
          if (x.group_id === sourceDropId) {
            x.order = newGroups.indexOf(x.id.toString());
            order.push(x.id.toString());
          }
          return x;
        })
        .toJS();
      newOrder.push(order);
      groupIds.push(sourceDropId);

    } else {
      const sourceGroup = Map(state[catID].tasks)
        .filter(x => x.group_id === sourceDropId)
        .sortBy(x => x.order)
        .keySeq();
      const destGroup = Map(state[catID].tasks)
        .filter(x => x.group_id === destDropId)
        .sortBy(x => x.order)
        .keySeq();
      const dragItemID = draggableId.replace("t", "")
      var l = reorderMax(
        sourceGroup,
        destGroup,
        source.index,
        destination.index,
        dragItemID
      );
      let orderS = [];
      let orderD = [];
      groupIds.push(sourceDropId);
      groupIds.push(destDropId);
      nextState = Map(state[catID].tasks)
        .setIn(
          [dragItemID, "group_id"],
          destDropId
        )
        .setIn(
          [dragItemID, "dragDroped"],
          true
        )
        .map(x => {
          if (x.group_id === sourceDropId) {
            x.order = l.start.indexOf(x.id.toString());
            orderS.push(x.id.toString());
          } else if (x.group_id === destDropId) {
            x.order = l.end.indexOf(x.id.toString());
            orderD.push(x.id.toString());
          }
          return x;
        })
        .toJS();
        console.log("orderS", orderS);
        console.log("orderD", orderD);
      newOrder.push(orderS);
      newOrder.push(orderD);
      console.log("newOrder", newOrder);
    }
    console.log(newOrder, groupIds);

    dispatch(
      Update({
        ...Map(state)
          .updateIn([catID, "tasks"], () => nextState)
          .toJS()
      })
    );
    axiosReorderTask(newOrder, groupIds);
    dispatch(Busy(false));
  };
}
// Task Update

export function CallTaskUpdate(task, cat, groupID) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();
    if (task.id > 0) {
      //update
      const nextState = Map(state)
        .updateIn([catID, "tasks", task.id.toString()], () => task)
        .toJS();

      axiosUpdateFull("task", task);
      dispatch(Update(nextState));
    } else {
      const newTask = await axiosAddTask(state, cat, groupID, task);

      const newTaskId = newTask.id.toString();
      const nextState = Map(state)
        .setIn([catID, "tasks", newTaskId], {
          ...task,
          id: newTask.id,
          group_id: newTask.group_id,
          cat_id: newTask.cat_id,
          user_id: newTask.user_id,
          order: newTask.order
        })
        .toJS();
      dispatch(Update(nextState));
    }
    dispatch(Busy(false));
  };
}
// Task Delete
export function CallTaskRemove(result, cat) {
  return async (dispatch, getState) => {
    dispatch(Busy(true));
    const state = getState().Cat.present;
    const catID = cat.id.toString();
    const { taskID } = result;
    const nextState = Map(state)
      .removeIn([catID, "tasks", taskID.toString()])
      .toJS();
    dispatch(Update(nextState));
    axiosRemove("task", taskID);
    dispatch(Busy(false));
  };
}
