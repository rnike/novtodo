import { fakeCats } from "../demo";
import { Map, List } from "immutable";
import axios from "axios";
// Delay

export const axiosFetchCats = async () => {
  let data;
  if (window.demo) {
    data = fakeCats();
  } else {
    try {
      var result = await axios.post(`novtodo/getCats`);
      if (result.status === 200) {
        data = result.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return data;
};
export const axiosFetchCatContent = async cat => {
  let data;
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/readCat/${cat.id}`);
      if (result.status === 200) {
        data = result.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return data;
};

export const axiosAddCat = async state => {
  if (window.demo) {
    var maxID =
      Map(state.Cat.present)
        .valueSeq()
        .map(x => x.id)
        .max() + 1;
    maxID = isNaN(maxID) ? 1 : maxID;
    maxID = maxID = isNaN(maxID) ? 1 : maxID;
    var groupID1 = Map(state.Cat.present.cats)
      .map(x => List(x.groupsOrder).max())
      .max();

    groupID1 = isNaN(groupID1) ? 1 : maxID;
    var groupID2 = groupID1 + 1;
    var groupID3 = groupID2 + 1;
    return Map(state.Cat.present)
      .set(maxID.toString(), {
        id: maxID,
        catname: "New",
        order: 0,
        groups: {
          [groupID1.toString()]: {
            id: groupID1,
            cat_id: maxID,
            groupName: "URGENT",
            order: 0,
            tasks: []
          },
          [groupID2.toString()]: {
            id: groupID2,
            cat_id: maxID,
            groupName: "NORMAL",
            order: 1,
            tasks: []
          },
          [groupID3.toString()]: {
            id: groupID3,
            cat_id: maxID,
            groupName: "NOTE",
            order: 2,
            tasks: []
          }
        },
        tasks: {}
      })
      .map(x => {
        if (x.id !== maxID) {
          x.order++;
        }
        return x;
      })
      .toJS();
  } else {
    try {
      var result = await axios.post(`novtodo/add/cat`);
      if (result.status === 200) {
        const newCat = result.data;
        return Map(state.Cat.present)
          .set(newCat.id.toString(), {
            ...newCat
          })
          .map(x => {
            if (x.id !== newCat.id) {
              x.order++;
            }
            return x;
          })
          .toJS();
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const axiosUpdateCatOrder = async newOrder => {
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/reorder/cat`, {
        order: newOrder
      });
      if (result.status === 200) {
        console.log(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const axiosUpdate = async (type, id, column, value) => {
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/update/${type}`, {
        id,
        column,
        value
      });
      if (result.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }
};
export const axiosUpdateFull = async (type, value) => {
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/updateFull/${type}`, {
        ...value
      });
      if (result.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }
};
export const axiosRemove = async (type, id) => {
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/remove/${type}`, { id });
      if (result.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const axiosAddGroup = async (cat, catID, state) => {
  if (window.demo) {
    var max =
      Map(cat.groups)
        .valueSeq()
        .map(x => x.id)
        .max() + 1;
    max = isNaN(max) ? 1 : max;
    const data = Map(state.Cat.present)
      .setIn([catID, "groups", max.toString()], {
        id: max,
        cat_id: cat.id,
        groupName: "NEW GROUP",
        tasks: []
      })
      .toJS();
    return data;
  } else {
    try {
      var result = await axios.post(`novtodo/add/group`, {
        id: catID
      });
      if (result.status === 200) {
        const newCat = result.data;
        const data = Map(state.Cat.present)
          .setIn([catID, "groups", newCat.id], newCat)
          .toJS();
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};
export const axiosReorderGroup = async newOrders => {
  if (window.demo) {
  } else {
    try {
      var result = await axios.post(`novtodo/reorder/group`, {
        order: newOrders
      });
      if (result.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const axiosAddTask = async (state, cat, groupID, task) => {
  if (window.demo) {
    const catID = cat.id.toString();
    const groupIDint = parseInt(groupID);
    const tasks = Map(state).getIn([catID, "tasks"]);
    let max =
      Map(tasks)
        .map(x => x.id)
        .max() + 1;
    let maxOrder =
      Map(state[cat.id.toString()].tasks)
        .filter(x => x.group_id === groupIDint)
        .map(x => x.order)
        .max() + 1;
    max = isNaN(max) ? 1 : max;
    maxOrder = isNaN(maxOrder) ? 0 : maxOrder;
    task = {
      ...task,
      group_id: parseInt(groupID),
      cat_id: cat.id,
      id: max,
      order: maxOrder
    };
  } else {
    console.log(state, cat, groupID, task);
    try {
      var result = await axios.post(`novtodo/add/task`, {
        catid: cat.id,
        groupid: parseInt(groupID),
        task: task
      });
      if (result.status === 200) {
        task = result.data;
        console.log(task);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return task;
};
export const axiosReorderTask = async (orders, groups) => {
  if (window.demo) {
    console.log("update");
  } else {
    try {
      var result = await axios.post(`novtodo/reorder/task`, {
        order: orders,
        groups: groups
      });
      if (result.status === 200) {
        console.log(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
