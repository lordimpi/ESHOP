import React, { useState, useEffect } from "react";
import {
    makeStyles, Box, AppBar, Button,
    Toolbar, IconButton, Typography, Drawer
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Listas from "./Listas"
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from "@auth0/auth0-react";
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

    const { loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0(); const [textButton, setTextButton] = useState("Login");
    const [Name, setName] = useState('')
    useEffect(() => {
        if (isAuthenticated) {
            setTextButton('Logout')
            setName(user.name)
        } else {
            setTextButton('Login')
            setName('')

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    useEffect(() => {
        const getToken = async () => {
            const accessToken = await getAccessTokenSilently();
            localStorage.setItem('token', accessToken)
        }
        if (isAuthenticated) {
            getToken();
        }

    }, [isAuthenticated, getAccessTokenSilently])

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

                {
                    isAuthenticated ?
                        <div>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid Item>
                                    <Button
                                        className={estilos.title}
                                        color="inherit"
                                    >
                                        {Name}
                                    </Button>
                                </Grid>
                                <Grid Item>
                                    <Button
                                        onClick={() => logout({ returnTo: window.location.origin })}
                                        className={estilos.title}
                                        color="inherit">
                                        {textButton}
                                    </Button>
                                </Grid>
                            </Grid>


                        </div> :
                        <Button
                            onClick={() => loginWithRedirect()}
                            color="inherit">{textButton}</Button>
                }
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