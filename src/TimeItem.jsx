import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'

function TimeItem({time}) {
    return (
        <ListItem>
            <ListItemText>
                {time}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label='delete'>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default TimeItem