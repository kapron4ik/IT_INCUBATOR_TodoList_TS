import {Dispatch} from "redux";
import {DispathActionType, FilterValuesType, TodolistDomainType, TodolistType} from "../types/entities";
import {todolistAPI} from "../api/api";

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state: Array<TodolistDomainType>=initialState, action: DispathActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            const newTodoList: TodolistDomainType = {
                ...action.newTodolist,
                filter: "all"
            }
            return [newTodoList, ...state]
        }

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

        case 'GET-TODOLISTS': {
            return action.todolists.map(tl=> ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}

//Action creator
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const addTodolistAC = (newTodolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        newTodolist
    } as const
}
export const changeTodolistAC = (id: string, title:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}
export const getTodolistAC = (todolists: Array<TodolistType>) => {
    return {type: 'GET-TODOLISTS', todolists} as const
}

//Thunk creator
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then((res)=>{
            dispatch(getTodolistAC(res.data))
        })
}
export const addTodolistTC =(title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolistTC = (todolistid: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistid)
        .then((res)=>{
            dispatch(removeTodolistAC(todolistid))
        })
}
export const updateTodolistTC = (todolistis: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistis, title)
        .then((res)=> {
            dispatch(changeTodolistAC(todolistis, title))
        })
}


