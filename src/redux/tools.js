export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
export const reorderMax = (startlist, endlist, startIndex, endIndex, id) => {
    const newStart = Array.from(startlist);
    newStart.splice(startIndex, 1);

    const newEnd = Array.from(endlist);
    newEnd.splice(endIndex, 0, id);
    console.log('newStart',newStart);
    console.log('newEnd',newEnd);

    return {
        start: newStart,
        end: newEnd
    };
};
