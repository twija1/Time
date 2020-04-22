import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from "@material-ui/core/TextField";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {timeToString} from './helpers'

function TimeRecordItem({time, deleteItem, id, name, editName}) {
    const [inputValue, setInputValue] = useState(name);
    const [isEditing, setIsEdting] = useState(false);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (e) => {
        if (isEditing) {
            editName(id, inputValue);
            e.preventDefault();
        }
    };

    const edit = () => {
        setIsEdting(!isEditing);
    };

    return (
        <ListItem>
            <ListItemText>
                {timeToString(time)}
            </ListItemText>
            <ListItemIcon>
                <IconButton edge="end" aria-label='edit' onClick={edit}>
                    <EditIcon/>
                </IconButton>
            </ListItemIcon>
            <ListItemText>
                {name}
            </ListItemText>
            {
                isEditing ? <ListItemSecondaryAction>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <TextField value={inputValue} id="outlined-basic" label="Name" variant="outlined"
                                   onChange={handleChange}/>
                    </form>
                </ListItemSecondaryAction> : null
            }
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label='delete' onClick={() => deleteItem(id)}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default TimeRecordItem