import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "Redux", isDone: true},
    //     {id: v1(), title: "SaSS", isDone: false}
    // ])
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "SaSS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Ice Cream", isDone: true},
            {id: v1(), title: "Chese", isDone: false}
        ],

    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(tittle: string, todoListID: string) {
        const newTask: TaskType = {id: v1(), title: tittle, isDone: false};
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id == todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let task = tasks[todoListID].find((task) => task.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(newTodoLists)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    // function taskFilter() {
    //     let tasksforTodoList = tasks
    //     if (filter === "active") {
    //         tasksforTodoList = tasks.filter(task => task.isDone === false)
    //     }
    //     if (filter === "completed") {
    //         tasksforTodoList = tasks.filter(task => task.isDone === true)
    //     }
    //     return tasksforTodoList
    // }


    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksforTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksforTodoList = tasks[tl.id].filter(task => task.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksforTodoList = tasks[tl.id].filter(task => task.isDone === true)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksforTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}/>
                    )
                })
            }
        </div>
    )
};

export default App;
