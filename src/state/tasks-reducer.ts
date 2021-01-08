import {TaskStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    RemoveTodolistActionType

const initialState: TaskStateType =  {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            state[action.todoListID] = state[action.todoListID].filter(task => task.id !== action.taskID)
        }
            return {...state}
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            state[action.todoListID] = [newTask, ...state[action.todoListID]]
            return {...state}
        case 'CHANGE-TASK-STATUS':{
            let todolistTasks = state[action.todoListID]
            state[action.todoListID] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, isDone: action.isDone}
                : task)
            return {...state}}
        case 'CHANGE-TASK-TITTLE':{
            let todolistTasks = state[action.todoListID]
            state[action.todoListID] = todolistTasks.map(task => task.id === action.taskID
            ?{...task, title: action.title}
            :task)
            return {...state}}
        case 'ADD-TODOLIST':{
            return{...state, [action.todolistID]: []}
        }
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {...state}
        default:
            return state
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID
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






