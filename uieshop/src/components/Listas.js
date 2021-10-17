import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    List, ListItem, ListItemIcon,
    ListItemText, Divider
} from "@material-ui/core"

function Listas() {
    return (
        <div>
            <List component="nav">
                <ListItem button component="a" href="/productos">
                    <ListItemIcon>
                        <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Productos" />
                </ListItem>
                <ListItem button component="a" href="/usuarios">
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>
                <Divider />
            </List>
        </div>
    )
}

export default Listas
