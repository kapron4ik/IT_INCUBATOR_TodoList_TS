import axios from "axios";
import { UpdateTasksDataType } from "../types/entities";

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    data: {}
    messages: Array<string>
    resultCode: number
}

type DeleteTodolistResponseType = {
    data: {}
    messages: Array<string>
    resultCode: number
}

type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

    const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4ea25f42-325c-423b-b922-486c47047752'
    }
}

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instanse.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instanse.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, updateData:UpdateTasksDataType) {
        const promise = instanse.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...updateData})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    }

}

export const todolistAPI = {
    getTodos() {
        return instanse.get<Array<TodolistType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, {title: title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType<{item: TodolistType }>>(`todo-lists/${todolistId}`)
    }
}