module.exports = (app) => {
    var ventas = require('../controllers/venta.controlador');


    //metodo que obtiene una venta
    //app.get("/ventas/:id", ventas.obtener);

    //metodo que obtiene la lista de ventas
    //app.get("/ventas", ventas.listar);

    //metodo que actualiza (INSERT - UPDATE) una venta
    app.post("/ventas", ventas.actualizar);

    //metodo que elimina una venta
    //app.delete("/ventas/:id", ventas.eliminar);

}