//Cargar el modelo de las paises
var Venta = require('../models/venta.modelo');

//Metodo web para actualizar una venta
exports.actualizar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información de la venta' });
    }

    Venta.actualizar(new Venta(req.body),
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: 'No se actualizó ninguna venta' });
                }
                else {
                    res.status(500).send({ message: 'Error actualizando la venta' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.send(data);
            }
        });
}