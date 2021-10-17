import React, { useState } from "react";
import {
    makeStyles, Box, AppBar, Button,
    Toolbar, IconButton, Typography, Drawer
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Listas from "./Listas"

const obtenerEstilos = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
}));

const MenuPrincipal = () => {
    const estilos = obtenerEstilos();

    //manejo del estado del menú
    const [estadoMenu, setEstadoMenu] = useState(false);

    //rutina que dactiva el despliegue del menú
    const mostrarMenu = (estado) => () => {
        setEstadoMenu(estado);
    }

    const menu = () => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={mostrarMenu(false)}
        >
            <Listas></Listas>
        </Box>
    )

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria_label="Menu Principal"
                    className={estilos.botonMenu}
                    onClick={mostrarMenu(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={estilos.title} >
                    Eshop
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            <Drawer
                anchor="left"
                open={estadoMenu}
                onClose={mostrarMenu(false)}
            >
                {menu()}
            </Drawer>
        </AppBar>
    )

}

export default MenuPrincipal;