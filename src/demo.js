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
                groupName: "URGENT",
                tasks: [1, 2, 3]
            },
            "2": {
                id: 2,
                cat_id: 1,
                order: 1,
                groupName: "NORMAL",
                tasks: [4, 5]
            },
            "3": {
                id: 3,
                cat_id: 1,
                order: 2,
                groupName: "NOTE",
                tasks: [6, 7]
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
                groupName: "NEED",
                tasks: [8, 9]
            },
            "5": {
                id: 5,
                cat_id: 2,
                order: 1,
                groupName: "WANT",
                tasks: [10, 11]
            }
        },
        tasks: {
            "8": {
                id: 8,
                cat_id: 2,
                group_id: 4,
                order: 0,
                taskText: "Apple 5",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "9": {
                id: 9,
                cat_id: 2,
                group_id: 4,
                order: 1,
                taskText: "Banana 5",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "10": {
                id: 10,
                cat_id: 2,
                group_id: 5,
                order: 0,
                taskText: "GT-R Black-Premium",
                taskDate: {},
                isCompleted: false,
                detail: ""
            },
            "11": {
                id: 11,
                cat_id: 2,
                group_id: 5,
                order: 1,
                taskText: "Huracán Performante Spyder",
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
                groupName: "WEB",
                tasks: [12, 13, 14, 15, 16, 17]
            },
            "7": {
                id: 7,
                cat_id: 3,
                order: 1,
                groupName: "CODE",
                tasks: [18, 19]
            },
            "8": {
                id: 8,
                cat_id: 3,
                order: 2,
                groupName: "OS",
                tasks: [20]
            }
        },
        tasks: {
            "12": {
                id: 12,
                cat_id: 3,
                group_id: 6,
                order: 0,
                taskText: "Laravel",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "13": {
                id: 13,
                cat_id: 3,
                group_id: 6,
                order: 1,
                taskText: "React + Redux",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "14": {
                id: 14,
                cat_id: 3,
                group_id: 6,
                order: 2,
                taskText: " Vue.js ",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "15": {
                id: 15,
                cat_id: 3,
                group_id: 6,
                order: 3,
                taskText: "gsap",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "16": {
                id: 16,
                cat_id: 3,
                group_id: 6,
                order: 4,
                taskText: "JavaScript",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "17": {
                id: 17,
                cat_id: 3,
                group_id: 6,
                order: 5,
                taskText: "php",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "18": {
                id: 18,
                cat_id: 3,
                group_id: 7,
                order: 0,
                taskText: "C#",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "19": {
                id: 19,
                cat_id: 3,
                group_id: 7,
                order: 1,
                taskText: "DART",
                taskDate: {},
                isCompleted: true,
                detail: ""
            },
            "20": {
                id: 20,
                cat_id: 3,
                group_id: 8,
                order: 0,
                taskText: "Linux",
                taskDate: {},
                isCompleted: true,
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
