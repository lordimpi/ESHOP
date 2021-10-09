module.exports = (app) => {
    var productosController = require("../controllers/producto.controlador");
    //Método que obtiene un Producto
    app.get("/productos/:id", productosController.obtener);
    app.get("/productos",productosController.listar);
    //app.post("/products",monedasController.actualizar);
    //app.delete("/products/:id",monedasController.eliminar);
}