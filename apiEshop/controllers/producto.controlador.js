//Cargar el modelo de los Productos
var Producto = require("../models/producto.modelo");

//Obtener un Producto
exports.obtener = (req, res) => {
    Producto.obtener(req.params.id, (err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se encontró Producto con el id: ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error obteniendo Producto con el id: ${req.params.id}` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send(data);
        }
    });
}

//Listar Productos
exports.listar = (req, res) => {
    Producto.listar((err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: "No se encontró Productos" });
            }
            else {
                res.status(500).send({ message: "Error obteniendo los Productos" });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send(data);
        }
    });
}

//Actualizar un Producto
exports.actualizar = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: `El contenido del mensaje debe tener informacion del Producto` });
    }

    Producto.actualizar(new Producto(req.body), (err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se actualizo ningun Producto` });
            }
            else {
                res.status(500).send({ message: `Error actualizando el Producto` });
            }
        }
        else {
            //Se devuelve el registro actualizado
            res.send(data);
        }
    });
}

//Eliminar un Producto
exports.eliminar = (req, res) => {
    Producto.eliminar(req.params.id, (err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se pudo eliminar Producto con el id: ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error al eliminar el Producto`});
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send({ message: `El Producto con el id: ${req.params.id} fue eliminado` });
        }
    });
}