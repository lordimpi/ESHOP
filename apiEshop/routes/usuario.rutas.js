module.exports = (app) => {
    var usuarioController = require("../controllers/usuario.controlador");
    //Url que obtiene un usuario
    app.get("/usuarios/:usuario", usuarioController.buscar);
    //Url que listar usuarios
    app.get("/usuarios", usuarioController.listar);
    //Url para actualizar o crear usuarios
    app.post("/usuarios", usuarioController.actualizar);
    //metodo que valida las credenciales de un usuario
    app.post("/usuarios/validaracceso", usuarioController.validarAcceso);
    //Url para eliminar usuarios
    app.delete("/usuarios/:id", usuarioController.eliminar);
    //Url para cambiar clave de un usuario
    app.post("/usuarios/cambiarclave", usuarioController.cambiarClave);
}