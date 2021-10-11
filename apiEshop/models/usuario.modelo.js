//Carga la libreria conexión a la base de datos
var sql = require("./bd");

//Constructor
var Usuario = function (usuario) {
    this.id = usuario.Id,
        this.usuario = usuario.Usuario,
        this.nombre = usuario.Nombre,
        this.clave = usuario.Clave,
        this.idRol = usuario.IdRol,
        this.activo = usuario.Activo,
        this.foto = usuario.Foto
};

//Metodo que valida las credenciales de un usuario
Usuario.validarAcceso = (usuario, clave, resultado) => {
    sql.query("CALL spValidarAccesoUsuario( ?, ?);",
        [usuario, clave], (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error validando acceso:", err);
                resultado(err, null);
                return;
            }
            //La consulta devuelve resultados
            if (res.length && res[0].length) {
                console.log("Usuario encontrado :", res[0]);
                resultado(null, res[0]);
                return;
            }
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            console.log("Credenciales no válidas");
        });
}

//Buscar un Usuario por nombre de usuario
Usuario.buscar = (nUsuario, resultado) => {
    sql.query("CALL spBuscarUsuario(?)", [nUsuario],
        (err, res) => {
            //Verifica si hubo error ejecutando la consulta
            if (err) {
                console.log("Error buscando el usuario: ", err);
                resultado(err, null);
                return;
            }
            //La consulta devuelve resultado
            if (res.length) {
                console.log("Usuario encontrado: ", res[0]);
                resultado(null, res[0]);
                return;
            }
            //No se encontro registros
            resultado({ tipo: "No encontrado" }, null);
        });
}

//Listar Usuarios
Usuario.listar = (resultado) => {
    sql.query(`CALL spListarUsuarios;`, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error consultado usuarios: ", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultado
        console.log("Usuarios encontrados: ", res[0]);
        resultado(null, res[0]);

    });
}

//Actualizar Usuario por nombre de usuario
Usuario.actualizar = (usuario, resultado) => {
    sql.query("CALL spActualizarUsuario(?,?,?,?,?,?,?);",//Consulta sql
        [usuario.id, usuario.usuario, usuario.nombre,
        usuario.clave, usuario.idRol, usuario.activo, usuario.foto],//Parametros 
        (err, res) => {
            //Verificar si hubo error ejecuntado la consulta
            if (err) {
                console.log("Error actualizando usuario: ", err);
                resultado(err, null);
                return;
            }
            //La consulta no afecto registros
            if (res.affectedRows == 0) {
                resultado({ tipo: "No encontrado" }, null);
                return;
            }
            //No se encontraron registros
            console.log("usuario actualizado: ", usuario);
            resultado(null, { usuario });
        });
}

//Eliminar usuario por id
Usuario.eliminar = (idusuario, resultado) => {
    sql.query(`DELETE FROM usuario WHERE Id = ?;`, idusuario, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error eliminando el usuario: ", err);
            resultado(err, null);
            return;
        }
        //La consulta no afecto registros
        if (res.affectedRows == 0) {
            resultado({ tipo: "No encontrado" }, null);
            return;
        }
        //No se encontraron registros
        console.log("usuario eliminado con id: ", idusuario);
        resultado(null, res);
    });
}

module.exports = Usuario;