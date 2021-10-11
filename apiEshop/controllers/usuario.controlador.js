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
        else{
            //Se devuelve el registro obtenido
            res.send(data);
        }
    })
}
