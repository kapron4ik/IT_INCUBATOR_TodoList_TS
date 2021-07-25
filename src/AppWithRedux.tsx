import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {FilterValuesType, TodolistType, TodolistDomainType} from './types/entities';
import {getTodolistsTC, changeTodolistFilterAC, deleteTodolistTC, updateTodolistTC, addTodolistTC } from './state/todolists-reducer';
import {
    removeTaskTC,
    addTaskTC, changeTaskTC
} from './state/tasks-reducer';
import {TaskType} from "./api/api";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])
    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListID: string, taskID: string, status: number) => {
        // dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        dispatch(changeTaskTC(todoListID, taskID, {status:2}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(changeTaskTC(todoListID, taskID, {title}))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        // delete tasks[todoListID]
        dispatch(deleteTodolistTC(todoListID))

    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newvalue: string) => {
        dispatch(updateTodolistTC(todoListID, newvalue))
    }, [dispatch])
    const addTodoLists = useCallback((title: string) => {
        // dispatch(AddTodolistAC(title))
        dispatch(addTodolistTC(title))
    }, [dispatch])

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
                        todoLists.map(tl  => {
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

export default App;
