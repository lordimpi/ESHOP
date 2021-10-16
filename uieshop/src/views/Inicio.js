import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const obtenerEstilos = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '80vh',
        position: 'relative',
        '& video': {
            objectFit: 'cover',
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        paddingBottom: theme.spacing(4),
    },
}));

const Inicio = () => {
    const estilos = obtenerEstilos();

    return (
        <section className={estilos.root}>
            <div className={estilos.overlay}>
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    color="#fff"
                >
                    <Typography variant="h3" component="h1" className={estilos.title}>
                        Welcome to ESHOP
                    </Typography>
                </Box>
            </div>
        </section>
    );
};

export default Inicio;