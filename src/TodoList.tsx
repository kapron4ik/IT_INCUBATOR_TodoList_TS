import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";


type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (tittle: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}


function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle, props.id)
            setTitle("")
        } else {
            setError('Title is requaired')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
        if (e.key === "Escape") setTitle("")
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>x
                </button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        const onClickTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onClickTaskStatus}
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;