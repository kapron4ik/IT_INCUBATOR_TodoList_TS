import React, {ChangeEvent, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Task from "./Task";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";
import {FilterValuesType} from "./types/entities";
import {TaskStatuses, TaskType} from "./api/api";


type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (tittle: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: number) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newvalue: string) => void
}


const TodoList = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    }, [])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    const addTask = useCallback((tittle: string) => {
        props.addTask(tittle, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((newValue: string) => {
        props.changeTodoListTitle(props.id, newValue)
    }, [props.changeTodoListTitle, props.id])

    let tasksforTodoList = props.tasks
    if (props.filter === "active") {
        tasksforTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksforTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodoListTitle}/>
                <IconButton onClick={() => {
                    props.removeTodoList(props.id)
                }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {
                    tasksforTodoList.map(task => <Task
                            key={task.id}
                            todolistId={props.id}
                            task={task}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />)
                }
            </ul>
            <div>
                <Button
                    // className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                    color={props.filter === "all" ? "primary" : "default"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    size={"small"}>All
                </Button>
                <Button
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                    color={props.filter === "active" ? "primary" : "default"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    size={"small"}>Active
                </Button>
                <Button
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                    color={props.filter === "completed" ? "primary" : "default"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    size={"small"}>Completed
                </Button>
            </div>
        </div>
    );
})

export default TodoList;

