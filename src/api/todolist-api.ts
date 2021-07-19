import axios from "axios";

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

export const todolistAPI = {
    getTodos() {
        return instanse.get<Array<TodolistType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{}>>(`todo-lists/`, {title: title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType<{item: TodolistType }>>(`todo-lists/${todolistId}`)
    }
}