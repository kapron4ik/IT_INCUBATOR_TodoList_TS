import React, {useCallback, useReducer, useState} from 'react';
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
import {
    AddTodolistAC,
    ChangeTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTittleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {
    console.log("App is called")
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "Redux", isDone: true},
    //     {id: v1(), title: "SaSS", isDone: false}
    // ])
    const todolistID1 = v1()
    const todolistID2 = v1()

    // const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
    //     {id: todolistID1, title: "What to learn", filter: "all"},
    //     {id: todolistID2, title: "What to buy", filter: "all"}
    // ])
    //
    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "Redux", isDone: true},
    //         {id: v1(), title: "SaSS", isDone: false}
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "Milk", isDone: false},
    //         {id: v1(), title: "Bread", isDone: true},
    //         {id: v1(), title: "Sugar", isDone: true},
    //         {id: v1(), title: "Ice Cream", isDone: true},
    //         {id: v1(), title: "Chese", isDone: false}
    //     ],
    //
    // })

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TaskStateType>(state=> state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = RemoveTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = AddTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = ChangeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = ChangeTaskTittleAC(taskID, title, todoListID)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = RemoveTodolistAC(todoListID)
        delete tasks[todoListID]
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newvalue: string) => {
        const action = ChangeTodolistAC(todoListID, newvalue)
        dispatch(action)
    }, [dispatch])

    const addTodoLists = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    },[dispatch])

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

                            return (
                                <Grid key={tl.id}>
                                    <Paper elevation={3}
                                           style={{padding: "15px", marginRight: "15px"}}>
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
                                            filter={tl.filter}
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

export default AppWithRedux;
