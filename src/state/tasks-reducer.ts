import {TaskStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistAC,
    SetTodolistActionType
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/tasks-api";

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
    title: string
    todoListID: string
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

type ActionType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTittleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistActionType |
    SetTaskActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(task => task.id !== action.taskID)
            return stateCopy
        }
        case 'ADD-TASK':
            // const stateCopy = {...state}
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            state[action.todoListID] = [newTask, ...state[action.todoListID]]
            return {...state}
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todoListID]
            state[action.todoListID] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, isDone: action.isDone}
                : task)
            return {...state}
        }
        case 'CHANGE-TASK-TITTLE': {
            let todolistTasks = state[action.todoListID]
            state[action.todoListID] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, title: action.title}
                : task)
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.id]
            return {...state}
        }
        case 'SET-TODOLISTS': {
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

export const RemoveTaskAC = (todoListID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskID
    }
}

export const AddTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListID
    }
}

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todoListID
    }
}

export const ChangeTaskTittleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTittleActionType => {
    return {
        type: 'CHANGE-TASK-TITTLE',
        taskID,
        title,
        todoListID
    }
}

export const SetTasksAC = (tasks: Array<TaskType>, todoListID: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todoListID
    }
}

export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoListID)
        .then((res) => {
            dispatch(SetTasksAC(res.data.items, todoListID))
        })
}

export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todoListID, taskID)
        .then(res => {
            dispatch(RemoveTaskAC(todoListID, taskID))
        })
}

export const AddTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todoListID, title)
        .then(res => {
            dispatch(AddTaskAC(title, todoListID))
        })
}






