import {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    getTodolistAC
} from "../state/todolists-reducer";
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTittleAC, setTasksAC } from "../state/tasks-reducer";


export type DispathActionType = ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistAC> |
    ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof getTodolistAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTittleAC> |
    ReturnType<typeof setTasksAC>

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UpdateTasksDataType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TodolistDomainType = TodolistType & {filter: FilterValuesType}