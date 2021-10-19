import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
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
                <ListItem button component="a" href="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </List>
        </div>
    )
}

export default Listas
