import {Dispatch} from "redux";
import {TaskStateType} from "../AppWithRedux";
import {TodolistType, DispathActionType, UpdateTasksDataType} from "../types/entities";
import {taskAPI, TaskType} from "../api/api";
import {AppRootStateType} from "./store";


export type SetTaskActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListID: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: any
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}

export type ChangeTaskTittleActionType = {
    type: 'CHANGE-TASK-TITTLE',
    taskID: string
    title: string
    todoListID: string
}

const initialState: TaskStateType = {} //Тип изменить

export const tasksReducer = (state: TaskStateType = initialState, action: DispathActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(task => task.id !== action.taskID)
            return stateCopy
        }
        case 'ADD-TASK': {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = tasks.map(task => task.id === action.task.id
                ? {...task, status: action.task.status}
                : task)
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        // case 'CHANGE-TASK-TITTLE': {
        //     let todolistTasks = state[action.todoListID]
        //     state[action.todoListID] = todolistTasks.map(task => task.id === action.taskID
        //         ? {...task, title: action.title}
        //         : task)
        //     return {...state}
        // }
        case 'CHANGE-TASK-TITTLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = tasks.map(task => task.id === action.task.id
                ? {...task, title: action.task.title}
                : task)
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.newTodolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.id]
            return {...state}
        }
        case 'GET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl: TodolistType) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }

        default:
            return state
    }
}

//Action creator
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskID
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}
// export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
//     return {
//         type: 'CHANGE-TASK-STATUS',
//         taskID,
//         isDone,
//         todoListID
//     } as const
// }
export const changeTaskStatusAC = (task: TaskType) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        task
    } as const
}
// export const changeTaskTittleAC = (taskID: string, title: string, todoListID: string) => {
//     return {
//         type: 'CHANGE-TASK-TITTLE',
//         taskID,
//         title,
//         todoListID
//     } as const
// }
export const changeTaskTittleAC = (task: TaskType) => {
    return {
        type: 'CHANGE-TASK-TITTLE',
        task
    } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todoListID: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todoListID
    } as const
}

//Thunk creator
export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoListID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListID))
        })
}
export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todoListID, taskID)
        .then(res => {
            dispatch(removeTaskAC(todoListID, taskID))
        })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todoListID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const changeTaskTC = (todolistID: string, taskId: string, updateData: UpdateTasksDataType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const tasks = state.tasks
        const tasksForCurrentTodoList = tasks[todolistID]
        let task = tasksForCurrentTodoList.find(task => task.id === taskId)

        if (task){
            taskAPI.updateTask(todolistID, taskId, {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...updateData})
                .then(res => {
                    debugger
                    dispatch(changeTaskTittleAC(res.data.data.item))
                    dispatch(changeTaskStatusAC(res.data.data.item))
                })
        }
    }






