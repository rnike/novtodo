export const fakeCats = () => ({
    "1": {
        id: 1,
        catname: "Project",
        order: 0,
        groupsOrder: [1, 2, 3],
        groups: {
            "1": {
                id: 1,
                cat_id: 1,
                order: 0,
                groupName: "URGENT"
            },
            "2": {
                id: 2,
                cat_id: 1,
                order: 1,
                groupName: "NORMAL"
            },
            "3": {
                id: 3,
                cat_id: 1,
                order: 2,
                groupName: "NOTE"
            }
        },
        tasks: {
            "1": {
                id: 1,
                cat_id: 1,
                group_id: 1,
                order: 0,
                taskText: "Sketch for option3",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "2": {
                id: 2,
                cat_id: 1,
                group_id: 1,
                order: 1,
                taskText: "Sketch for option2",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "3": {
                id: 3,
                cat_id: 1,
                group_id: 1,
                order: 2,
                taskText: "Sketch for option1",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "4": {
                id: 4,
                cat_id: 1,
                group_id: 2,
                order: 0,
                taskText: "Conference with Jake.",
                taskDate: new Date(2020, 1, 2),
                isCompleted: false,
                detail: "Jake's Tel: +987654321"
            },
            "5": {
                id: 5,
                cat_id: 1,
                group_id: 2,
                order: 1,
                taskText: "Call Loisa",
                taskDate: new Date(2020, 1, 5),
                isCompleted: false,
                detail: "Tel: +123456789"
            },
            "6": {
                id: 6,
                cat_id: 1,
                group_id: 3,
                order: 0,
                taskText: "Phase 1 deadline",
                taskDate: new Date(2020, 2, 15),
                isCompleted: false,
                detail: ""
            },
            "7": {
                id: 7,
                cat_id: 1,
                group_id: 3,
                order: 1,
                taskText: "Bring Tool",
                taskDate: {},
                isCompleted: false,
                detail: ""
            }
        }
    },
    "2": {
        id: 2,
        catname: "Shopping",
        order: 1,
        groupsOrder: [4, 5],
        groups: {
            "4": {
                id: 4,
                cat_id: 2,
                order: 0,
                groupName: "NEED"
            },
            "5": {
                id: 5,
                cat_id: 2,
                order: 1,
                groupName: "WANT"
            }
        },
        tasks: {
            "8": {
                id: 8,
                cat_id: 2,
                group_id: 4,
                order: 0,
                taskText: "Fender Jazz Bass",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "9": {
                id: 9,
                cat_id: 2,
                group_id: 4,
                order: 1,
                taskText: "Fender Jazz Bass 2nd",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "10": {
                id: 10,
                cat_id: 2,
                group_id: 5,
                order: 0,
                taskText: "Fender Jazz Bass 3rd",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "11": {
                id: 11,
                cat_id: 2,
                group_id: 5,
                order: 1,
                taskText: "Fender Jazz Bass 4th",
                taskDate: {},
                isCompleted: false,
                detail: ""
            }
        }
    },
    "3": {
        id: 3,
        catname: "Learning",
        order: 2,
        groupsOrder: [6, 7, 8],
        groups: {
            "6": {
                id: 6,
                cat_id: 3,
                order: 0,
                groupName: "BASS"
            },
            "7": {
                id: 7,
                cat_id: 3,
                order: 1,
                groupName: "DEV"
            },
            "8": {
                id: 8,
                cat_id: 3,
                order: 2,
                groupName: "OTHER"
            }
        },
        tasks: {
            "12": {
                id: 12,
                cat_id: 3,
                group_id: 6,
                order: 0,
                taskText: "Slap the bass forever",
                taskDate: {},
                isCompleted: false,
                detail: "still doing"
            },
            "13": {
                id: 13,
                cat_id: 3,
                group_id: 6,
                order: 1,
                taskText: "Slap the bass",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "14": {
                id: 14,
                cat_id: 3,
                group_id: 6,
                order: 2,
                taskText: "Slap the bass twice",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "15": {
                id: 15,
                cat_id: 3,
                group_id: 6,
                order: 3,
                taskText: "Slap the bass like an expert",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "16": {
                id: 16,
                cat_id: 3,
                group_id: 6,
                order: 4,
                taskText: "Slap the bass while sleeping",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "17": {
                id: 17,
                cat_id: 3,
                group_id: 6,
                order: 5,
                taskText: "Slap the bass while driving",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "18": {
                id: 18,
                cat_id: 3,
                group_id: 7,
                order: 0,
                taskText: "Understand how to develop an AI to develop itself.",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "19": {
                id: 19,
                cat_id: 3,
                group_id: 7,
                order: 1,
                taskText: "Understand how to develop an AI to develop an AI to develop itself.",
                taskDate: {},
                isCompleted: false,
                detail: "Mind exploded"
            },
            "20": {
                id: 20,
                cat_id: 3,
                group_id: 8,
                order: 0,
                taskText: "Math",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "21": {
                id: 21,
                cat_id: 3,
                group_id: 8,
                order: 1,
                taskText: "UI design",
                taskDate: {},
                isCompleted: false,
                detail: ""
            }
        }
    }
});

export const fakeCatContent = cat => ({
    id: cat.id,
    catname: cat.catname,
    groupsOrder: [1, 2, 3],
    groups: {
        "1": {
            id: 1,
            groupName: "URGENT",
            tasks: [1, 2, 3]
        },
        "2": {
            id: 2,
            groupName: "NORMAL",
            tasks: [4, 5]
        },
        "3": {
            id: 3,
            groupName: "NOTE",
            tasks: [6, 7]
        }
    },
    tasks: {
        "1": {
            id: 1,
            taskText: "Sketch for option3",
            taskDate: {},
            isCompleted: false,
            detail: ""
        },
        "2": {
            id: 2,
            taskText: "Sketch for option2",
            taskDate: {},
            isCompleted: true,
            detail: ""
        },
        "3": {
            id: 3,
            taskText: "Sketch for option1",
            taskDate: {},
            isCompleted: true,
            detail: ""
        },
        "4": {
            id: 4,
            taskText: "Conference with Jake.",
            taskDate: new Date(2020, 1, 2),
            isCompleted: false,
            detail: "Jake's Tel: +987654321"
        },
        "5": {
            id: 5,
            taskText: "Call Loisa",
            taskDate: new Date(2020, 1, 5),
            isCompleted: false,
            detail: "Tel: +123456789"
        },
        "6": {
            id: 6,
            taskText: "Phase 1 deadline",
            taskDate: new Date(2020, 2, 15),
            isCompleted: false,
            detail: ""
        },
        "7": {
            id: 7,
            taskText: "Bring Tool",
            taskDate: {},
            isCompleted: false,
            detail: ""
        }
    }
});
