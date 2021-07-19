import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { todolistAPI } from './api/todolist-api';
import { useDispatch } from 'react-redux';
import { setTodolistAC } from './state/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter?: FilterValuesType
    addedDate?: string
    order?: number
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const dispatch = useDispatch()


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

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        let task = tasks[todoListID].find((task) => task.id === taskID)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(newTodoLists)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function changeTodoListTitle(todoListID: string, newvalue: string) {
        let newTodoLists = todoLists.find(tl => tl.id === todoListID)
        if (newTodoLists) {
            newTodoLists.title = newvalue
        }
        setTodoLists([...todoLists])
    }

    function addTodoLists(title: string) {
        const newTodoList: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoLists}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksforTodoList = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksforTodoList = tasks[tl.id].filter(task => !task.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksforTodoList = tasks[tl.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid>
                                    <Paper elevation={3}
                                        style={{padding: "15px",marginRight: "15px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksforTodoList}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter?tl.filter:"all"}
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
