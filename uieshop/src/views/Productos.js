import React, { useState } from 'react'
import MaterialTable from "@material-table/core";

const columnas = [
    { title: "Id", field: "Id", width: 100 },
    { title: "Imagen", field: "Imagen", width:200 },
    { title: "Nombre", field: "Nombre" },
    { title: "Referencia", field: "Referencia", width:300 },
    { title: "Marca", field: "IdMarca", width:300 },
    { title: "Valor", field: "ValorUnitario", type: "numeric", width:200 }
]

var Producto = function (id, imagen, nombre, referencia, idMarca, valorUnitario) {
    this.Id = id;
    this.Imagen = imagen;
    this.Nombre = nombre;
    this.Referencia = referencia;   
    this.IdMarca = idMarca;
    this.ValorUnitario = valorUnitario;
}



const Productos = () => {

    //variable que almacenará la lista de Productos
    const [productos, setProductos] = useState([]);
    const [estadoListado, setEstadoListado] = useState(true);

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

    if (estadoListado) {
        listarProductos();
    }

    //Retorno el componente a renderizar en el menu principal de la pagina web
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
        </div>
    )
}

export default Productos