//Cargar el modelo de los Usuarios
var Usuario = require("../models/usuario.modelo");

//Obtener un Usuario
exports.buscar = (req, res) => {
    Usuario.buscar(req.params.usuario, (err, data) => {
        //Verifica si no hubo error
        if (err) {
            if (err.tipo = "No encontrado") {
                res.status(404).send({ message: `No se encontró Usuario con nombre: ${req.params.usuario}` });
            }
            else {
                res.status(500).send({ message: `No se encontró Usuario con nombre: ${req.params.usuario}` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send(data);
        }
    })
}

//Listar Usuarios
exports.listar = (req, res) => {
    Usuario.listar((err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: "No se encontró Usuarios" });
            }
            else {
                res.status(500).send({ message: "Error obteniendo los Usuarios" });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send(data);
        }
    });
}

//Actualizar un Usuario
exports.actualizar = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: `El contenido del mensaje debe tener informacion del Usuario` });
    }

    Usuario.actualizar(new Usuario(req.body), (err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se actualizo ningun Usuario` });
            }
            else {
                res.status(500).send({ message: `Error actualizando el Usuario` });
            }
        }
        else {
            //Se devuelve el registro actualizado
            res.send(data);
        }
    });
}

//Eliminar un Usuario
exports.eliminar = (req, res) => {
    Usuario.eliminar(req.params.id, (err, data) => {
        //Verificar si no hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se pudo eliminar Usuario con el id: ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error al eliminar el Usuario` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.send({ message: `El Usuario con el id: ${req.params.id} fue eliminado` });
        }
    });
}