import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";


type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (tittle: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newvalue: string) => void
}


function TodoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    function addTask(tittle: string) {
        props.addTask(tittle, props.id)
    }

    function changeTodoListTitle(newValue: string) {
        props.changeTodoListTitle(props.id, newValue)
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
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        const onClickTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        const onClickTaskTitle = (newValue: string) => props.changeTaskTitle(task.id, newValue, props.id)
                        return (
                            <li key={task.id}
                                className={task.isDone ? "is-done" : ""}>
                                <Checkbox onChange={onClickTaskStatus}
                                          checked={task.isDone}
                                          color="primary"
                                />
                                <EditableSpan title={task.title}
                                              onChangeTitle={onClickTaskTitle}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
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
}

export default TodoList;

