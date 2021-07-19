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
        const promise = instanse.get(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instanse.post(`todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, updateData:any) {
        const promise = instanse.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {...updateData})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    }

}