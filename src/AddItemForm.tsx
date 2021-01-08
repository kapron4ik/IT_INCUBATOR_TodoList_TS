import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {
    console.log("AddItemForm called")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
        if (e.key === "Escape") setTitle("")
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)
            setTitle("")
        } else {
            setError('Title is requaired')
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                // className={error ? "error" : ""}
                       label="Title"
                       helperText={error}
                       size={"small"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
            {/*<button onClick={addTask}>+</button>*/}
            <IconButton color="primary" size="small" onClick={addTask}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
})