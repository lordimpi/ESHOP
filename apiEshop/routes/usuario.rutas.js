module.exports = (app) => {
    var usuarioController = require("../controllers/usuario.controlador");
    //Url que obtiene un Producto
    app.get("/usuarios/:usuario", usuarioController.buscar);
    //Url que lista productos
    app.get("/usuarios", usuarioController.listar);
    //Url para actualizar o crear productos
    app.post("/usuarios", usuarioController.actualizar);    
    //metodo que valida las credenciales de un usuario
    app.post("/usuarios/validaracceso", usuarioController.validarAcceso);
    //Url para eliminar productos
    app.delete("/usuarios/:id", usuarioController.eliminar);

}