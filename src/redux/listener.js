import { List, is, Map } from "immutable";
let currentValue = {};
function Listener(store) {
    const state = store.getState();
    const { GlobalControl, Cat } = state;
    let previousValue = currentValue;
    currentValue = Cat.present;
    if(GlobalControl.isBusy)return;
    if (previousValue !== currentValue) {
        const order = currentValue.order;
        const orderPre = previousValue.order;
        if (!is(List(order), List(orderPre))) {
            //cat order Changed
            console.log("cat order changed");
        } else {
            const catsKey = Map(currentValue.cats)
                .keySeq()
                .toJS();
            const catsKeyPre = Map(previousValue.cats)
                .keySeq()
                .toJS();
            for (var i = 0; i < catsKey.length; i++) {
                var cat = Map(currentValue.cats).get(catsKey[i]);
                var catpre = Map(previousValue.cats).get(catsKeyPre[i]);
                if (!is(cat.catname, catpre.catname)) {
                    console.log(`cat ${catsKey[i]} name changed`);
                }
            }
        }
        if (state.GlobalControl.cat.id) { 
            const catContent =
                currentValue.cats[state.GlobalControl.cat.id.toString()];
            const catPreContent =
                previousValue.cats[state.GlobalControl.cat.id.toString()];
            const groupsOrder = catContent.groupsOrder;
            const groupsOrderPre = catPreContent.groupsOrder;
            if (!is(List(groupsOrder), List(groupsOrderPre))) {
                //cat order Changed
                console.log("group order changed");
            } else {
                const groupsKey = Map(catContent.groups)
                    .keySeq()
                    .toJS();
                const groupsKeyPre = Map(catPreContent.groups)
                    .keySeq()
                    .toJS();
                for (let i = 0; i < groupsKey.length; i++) {
                    const group = Map(catContent.groups).get(groupsKey[i]);
                    const groupPre = Map(catPreContent.groups).get(
                        groupsKeyPre[i]
                    );
                    if (group.groupName !== groupPre.groupName) {
                        console.log(`group ${groupsKey[i]} name changed`);
                    }
                    const groupTasks = group.tasks;
                    const groupTasksPre = groupPre.tasks;
                    if (!is(List(groupTasks), List(groupTasksPre))) {
                        //cat order Changed
                        console.log(
                            `group ${groupsKey[i]} tasks order changed`
                        );
                    }
                }
            }
            const tasksKey = Map(catContent.tasks)
                .keySeq()
                .toJS();
            const tasksKeyPre = Map(catPreContent.tasks)
                .keySeq()
                .toJS();
            for (let i = 0; i < tasksKey.length; i++) {
                const task = Map(catContent.tasks).get(tasksKey[i]);
                const taskPre = Map(catPreContent.tasks).get(tasksKeyPre[i]);

                if (
                    task.detail !== taskPre.detail ||
                    task.isCompleted !== taskPre.isCompleted ||
                    // task.taskDate !== taskPre.taskDate ||
                    task.taskText !== taskPre.taskText
                ) {
                    //cat order Changed
                    console.log(`task ${tasksKey[i]}   changed`);
                }
            }
        }
    }
}
export default Listener;
