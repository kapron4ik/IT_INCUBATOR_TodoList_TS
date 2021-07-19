import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {SetTasksAC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistActionType | ChangeTodolistFilterActionType | SetTodolistActionType

const initialState: Array<TodolistType> = []

export const todoListsReducer = (state: Array<TodolistType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: action.todolistID,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let newTodoLists = state.find(tl => tl.id === action.id)
            if (newTodoLists) {
                newTodoLists.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todoList = state.find(tl => tl.id == action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        case 'SET-TODOLISTS':
            // const stateCopy = {...state}
            // action.todolists.forEach((tl:TodolistType)=>{
            //     stateCopy[tl.id] = []
            // })
            // return stateCopy
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistID: v1()
    }
}
export const ChangeTodolistAC = (id: string, title:string): ChangeTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}
export const setTodolistAC = (todolists: Array<TodolistType>):SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}



