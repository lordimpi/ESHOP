module.exports = (app) => {
    var productosController = require("../controllers/producto.controlador");
    //Url que obtiene un Producto
    app.get("/productos/:id", productosController.obtener);
    //Url que lista productos
    app.get("/productos",productosController.listar);
    //Url para actualizar o crear productos
    app.post("/productos",productosController.actualizar);
    //Url para eliminar productos
    app.delete("/productos/:id",productosController.eliminar);
}