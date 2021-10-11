//Cargar la libreria conexión a la base de datos
var sql = require("./bd");

//Constructor
var Producto = function(producto){
    this.id = producto.Id,
    this.nombre = producto.Nombre,
    this.referencia = producto.Referencia,
    this.valorUnitario = producto.ValorUnitario,
    this.idMarca = producto.IdMarca,
    this.imagen = producto.Imagen
};

//Obtener product por id
Producto.obtener = (idProduct, resultado) => {
    sql.query(`SELECT * FROM Producto WHERE Id = ${idProduct};`, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error consultadon el Producto: ", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultado
        if (res.length) {
            console.log("Producto encontrado: ", res[0]);
            resultado(null, res[0]);
            return;
        }
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
    });
}

//Listar Products
Producto.listar = (resultado) => {
    sql.query(`CALL spListarProductos;`, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error consultado productos: ", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultado
        console.log("Productos encontrados: ", res[0]);
        resultado(null, res[0]);

    });
}

//Actualizar Producto por id
Producto.actualizar = (producto, resultado) => {
    sql.query("CALL spActualizarProducto(?,?,?,?,?,?);",//Consulta sql
        [producto.id, producto.idMarca, producto.imagen, 
            producto.nombre, producto.referencia, producto.valorUnitario],//Parametros 
        (err, res) => {
            //Verificar si hubo error ejecuntado la consulta
            if (err) {
                console.log("Error actualizando producto: ", err);
                resultado(err, null);
                return;
            }
            //La consulta no afecto registros
            if (res.affectedRows == 0) {
                resultado({ tipo: "No encontrado" }, null);
                return;
            }
            //No se encontraron registros
            console.log("producto actualizado: ", producto);
            resultado(null, { producto });
        });
}

//Eliminar producto por id
Producto.eliminar = (idProducto, resultado) => {
    sql.query(`DELETE FROM Producto WHERE Id = ?;`, idProducto, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error eliminando el producto: ", err);
            resultado(err, null);
            return;
        }
        //La consulta no afecto registros
        if (res.affectedRows == 0) {
            resultado({ tipo: "No encontrado" }, null);
            return;
        }
        //No se encontraron registros
        console.log("producto eliminado con id: ", idProducto);
        resultado(null, res);
    });
}

module.exports = Producto;