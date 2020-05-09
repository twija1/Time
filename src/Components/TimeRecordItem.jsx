import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from "@material-ui/core/TextField";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {showGivenDate, timeToString} from '../helpers'

function TimeRecordItem({time, deleteItem, id, name, editName, startDate, endDate}) {
    const [inputName, setInputName] = useState(name);
    const [isEditing, setIsEdting] = useState(false);

    const handleChange = (event) => {
        setInputName(event.target.value);
    };

    const handleSubmit = (e) => {
        if (isEditing) {
            editName({id, name: inputName});
            e.preventDefault();
            setIsEdting(!isEditing);
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
            <ListItemText>
                {showGivenDate(startDate)}
            </ListItemText>
            <ListItemIcon>
                <IconButton edge="end" aria-label='edit' onClick={edit}>
                    <EditIcon/>
                </IconButton>
            </ListItemIcon>
            <ListItemText>
                {
                    isEditing ?
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <TextField value={inputName} id="outlined-basic" label="Name" variant="outlined"
                                       onChange={handleChange}/>
                        </form>
                        : inputName
                }
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label='delete' onClick={() => deleteItem(id)}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default TimeRecordItem