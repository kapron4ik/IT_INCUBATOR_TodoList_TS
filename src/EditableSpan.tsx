import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    function activateEditeMode() {
        setEditMode(true)
        setTitle(props.title)
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return editMode
        // ? <input value={title}
        //          onBlur={activateViewMode}
        //          onChange={onChangeTitleHandler}
        //          autoFocus/>
        ? <TextField variant="outlined"
                     size={"small"}
                     value={title}
                     onBlur={activateViewMode}
                     onChange={onChangeTitleHandler}
                     autoFocus/>
        :
        <span onDoubleClick={activateEditeMode}>{props.title}</span>

})