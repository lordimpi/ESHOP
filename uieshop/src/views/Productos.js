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
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalModificar, setModalModificar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
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
        setModalInsertar(false);
        setModalModificar(false);
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
        if (productoSeleccionado.Id === -1) {
            setEstadoListado(true);
            return;
        }
        setEstadoListado(true);
    }
    const eliminar = () => {
        fetch(`http://localhost:3011/productos/${productoSeleccionado.Id}`,
            {
                method: 'delete',
            }
        )
            .then((res) => {
                if (res.status !== 200) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                console.log(json.message);
                setEstadoListado(true);
            })
            .catch(function (error) {
                window.alert(`error eliminando producto [${error}]`);
            });
        openCloseModalEliminar();
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
    const seleccionarProducto = (producto, caso) => {
        setProductoSeleccionado(producto);
        if (caso === "editar") {
            openCloseModalModificar();
        }
        else {
            openCloseModalEliminar();
        }

    }
    const openCloseModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    const openCloseModalModificar = () => {
        setModalModificar(!modalModificar);
    }
    const openCloseModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    //Componentes a renderizar
    const bodyInsertar = (
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
                    <Button type="button" onClick={() => openCloseModalInsertar()}>Cancelar</Button>
                </div>
            </form>
        </div>
    );
    const bodyModificar = (
        <div className={classes.modal}>
            <form onSubmit={guardar}>
                <h3>Editar producto</h3>
                <TextField className={classes.inputMaterial} label="Nombre" name="Nombre" required
                    onChange={capturarDatos} value={productoSeleccionado && productoSeleccionado.Nombre} />
                <br />
                <TextField className={classes.inputMaterial} label="Referencia" name="Referencia" required
                    onChange={capturarDatos} value={productoSeleccionado && productoSeleccionado.Referencia} />
                <br />
                <TextField className={classes.inputMaterial} label="Marca" name="IdMarca" required type="number"
                    onChange={capturarDatos} value={productoSeleccionado && productoSeleccionado.IdMarca} />
                <br />
                <TextField className={classes.inputMaterial} label="Valor" name="ValorUnitario" required type="number"
                    onChange={capturarDatos} value={productoSeleccionado && productoSeleccionado.ValorUnitario} />
                <br /> <br />
                <div align="right">
                    <Button color="primary" type="submit">Editar</Button>
                    <Button onClick={() => openCloseModalModificar()}>Cancelar</Button>
                </div>
            </form>
        </div>
    );
    const bodyEliminar = (
        <div className={classes.modal}>
            <p>Esta seguro que desea eliminar el producto <b>{productoSeleccionado && productoSeleccionado.Nombre}</b> ?</p>
            <div align="right">
                <Button color="secondary" onClick={() => eliminar()}>Si</Button>
                <Button onClick={() => openCloseModalEliminar()}>No</Button>
            </div>
        </div>
    )

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
                        onClick: (evetn, rowData) => seleccionarProducto(rowData, "editar")
                    },
                    {
                        icon: `delete`,
                        tooltip: "Eliminar producto",
                        onClick: (event, rowData) => seleccionarProducto(rowData, "eliminar")
                    },
                    {
                        icon: 'add',
                        tooltip: 'Nuevo Producto',
                        isFreeAction: true,
                        onClick: () => openCloseModalInsertar()
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
                open={modalInsertar}
                onClose={openCloseModalInsertar}
            >
                {bodyInsertar}
            </Modal>
            <Modal
                open={modalModificar}
                onClose={openCloseModalModificar}
            >
                {bodyModificar}
            </Modal>
            <Modal
                open={modalEliminar}
                onClose={openCloseModalEliminar}
            >
                {bodyEliminar}
            </Modal>
        </div>
    )
}

export default Productos