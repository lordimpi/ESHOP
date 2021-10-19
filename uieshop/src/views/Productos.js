import React, { useState } from 'react'
import MaterialTable from "@material-table/core";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const columnas = [
    { title: "Id", field: "Id", width: 100 },
    { title: "Imagen", field: "Imagen", width: 200 },
    { title: "Nombre", field: "Nombre" },
    { title: "Referencia", field: "Referencia", width: 300 },
    { title: "Marca", field: "IdMarca", width: 300 },
    { title: "Valor", field: "ValorUnitario", type: "numeric", width: 200 }
]

var Producto = function (id, imagen, nombre, referencia, idMarca, valorUnitario) {
    this.Id = id;
    this.Imagen = imagen;
    this.Nombre = nombre;
    this.Referencia = referencia;
    this.IdMarca = idMarca;
    this.ValorUnitario = valorUnitario;
}

const useStyle = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "100%"
    }
}));

const Productos = () => {

    //Variable para acceder al array de estilos css
    const classes = useStyle();

    //variable que almacenará la lista de Productos
    const [productos, setProductos] = useState([]);
    const [estadoListado, setEstadoListado] = useState(true);
    const [modalInsertarModificar, setModalInsertarModificar] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({
        Id: -1,
        Nombre: "",
        Referencia: "",
        IdMarca: 0,
        ValorUnitario: 0,
        Imagen: null,
    })

    //CRUD Productos
    const listarProductos = () => {
        //Consultar la lista de productos desde la API
        fetch("http://localhost:3011/productos", { method: "get" })
            .then((res) => res.json())
            .then((json) => {
                var productosT = [];
                json.map((item) => {
                    return productosT.push(new Producto(
                        item.Id,
                        item.Imagen,
                        item.Nombre,
                        item.Referencia,
                        item.IdMarca,
                        item.ValorUnitario
                    ));
                });
                setProductos(productosT);
                setEstadoListado(false);
            });
    }
    const guardar = (e) => {
        setModalInsertarModificar(false);
        console.log(productoSeleccionado)
        fetch("http://localhost:3011/productos",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Id: productoSeleccionado.Id,
                    Nombre: productoSeleccionado.Nombre,
                    Referencia: productoSeleccionado.Referencia,
                    ValorUnitario: productoSeleccionado.ValorUnitario,
                    IdMarca: productoSeleccionado.IdMarca,
                    Imagen: productoSeleccionado.Imagen
                })
            }
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch(function (error) {
                window.alert(`error agregando producto: [${error}]`);
            });
        setEstadoListado(true);
    }

    if (estadoListado) {
        listarProductos();
    }
    //Metodos Auxiliares
    const capturarDatos = e => {
        const { name, value } = e.target;
        setProductoSeleccionado(prevState => ({
            ...prevState, [name]: value
        }));
    }
    const openCloseModal = () => {
        setModalInsertarModificar(!modalInsertarModificar);
    }
    const modalInsertar = (
        <div className={classes.modal}>
            <form onSubmit={guardar}>
                <h3>Crear nuevo producto</h3>
                <TextField className={classes.inputMaterial} label="Nombre"
                    required name="Nombre" onChange={capturarDatos} />
                <br />
                <TextField className={classes.inputMaterial} label="Referencia"
                    required name="Referencia" onChange={capturarDatos} />
                <br />
                <TextField className={classes.inputMaterial} label="Marca"
                    type="number" required name="IdMarca" onChange={capturarDatos} />
                <br />
                <TextField className={classes.inputMaterial} label="Valor"
                    type="number" required name="ValorUnitario" onChange={capturarDatos} />
                <br /> <br />
                <div align="right">
                    <Button color="primary" type="submit" >Crear</Button>
                    <Button type="button" onClick={() => openCloseModal()}>Cancelar</Button>
                </div>
            </form>
        </div>
    );
    const modalModificar = (
        <div className={classes.modal}>
            <h3>Crear nuevo producto</h3>
            <TextField className={classes.inputMaterial} label="Nombre"
                name="Nombre" onChange={capturarDatos} />
            <br />
            <TextField className={classes.inputMaterial} label="Referencia"
                name="Referencia" onChange={capturarDatos} />
            <br />
            <TextField className={classes.inputMaterial} label="Marca"
                name="IdMarca" onChange={capturarDatos} />
            <br />
            <TextField className={classes.inputMaterial} label="Valor"
                name="ValorUnitario" onChange={capturarDatos} />
            <br /> <br />
            <div align="right">
                <Button color="primary">Crear</Button>
                <Button onClick={() => openCloseModal()}>Cancelar</Button>
            </div>
        </div>
    );

    //Retorno del componente a renderizar en el menu principal de la pagina web
    return (
        <div>
            <MaterialTable
                columns={columnas}
                data={productos}
                title="Productos"
                actions={[
                    {
                        icon: `edit`,
                        tooltip: "Editar producto",
                        onClick: (event, rowData) => alert("Has precionado editar " + rowData.Nombre)
                    },
                    {
                        icon: `delete`,
                        tooltip: "Eliminar producto",
                        onClick: (event, rowData) => alert("Has precionado eliminar " + rowData.Nombre)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Nuevo Producto',
                        isFreeAction: true,
                        onClick: () => openCloseModal()
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#007bb2',
                        color: '#FFF'
                    },
                }}
                localization={{
                    header: {
                        actions: "Acciones",
                    }
                }}
            />
            <Modal
                open={modalInsertarModificar}
                onClose={openCloseModal}
            >
                {modalInsertar}
            </Modal>
        </div>
    )
}

export default Productos