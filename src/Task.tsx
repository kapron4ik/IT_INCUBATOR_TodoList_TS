import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";


type PropsType = {
    key: string
    todolistId: string
    task: TaskType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (tittle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}


const Task = React.memo(function (props: PropsType) {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onClickTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    const onClickTaskTitle = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <li key={props.task.id}
            className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onClickTaskStatus}
                      checked={props.task.isDone}
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

