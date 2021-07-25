import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import {TaskType, TaskStatuses} from "./api/api";


type PropsType = {
    key: string
    todolistId: string
    task: TaskType
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: number) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
}


const Task = React.memo(function (props: PropsType) {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onClickTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, props.task.id,
        e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New)
    const onClickTaskTitle = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    },[props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <li key={props.task.id}
            // className={props.task.isDone ? "is-done" : ""}
        >
            <Checkbox onChange={onClickTaskStatus}
                      checked={props.task.status === TaskStatuses.Completed}
                      color="primary"
            />
            <EditableSpan title={props.task.title}
                          onChangeTitle={onClickTaskTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})


export default Task;

