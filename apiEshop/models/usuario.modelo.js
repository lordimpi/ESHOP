//Carga la libreria conexión a la base de datos
var sql = require("./bd");

//Constructor
var Usuario = function(usuario){
    this.id = usuario.Id,
    this.usuario = usuario.Usuario,
    this.nombre = usuario.Nombre,
    this.clave = usuario.Clave,
    this.idRol = usuario.IdRol,
    this.activo = usuario.Activo,
    this.foto = usuario.Foto
};

//Buscar un Usuario por nombre de usuario
Usuario.buscar = (nUsuario, resultado)=>{
    sql.query("CALL spBuscarUsuario(?)",[nUsuario],
    (err, res)=>{
        //Verifica si hubo error ejecutando la consulta
        if (err) {
            console.log("Error buscando el usuario: ", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultado
        if (res.length) {
            console.log("Usuario encontrado: ",res[0]);
            resultado(null,res[0]);
            return;
        }
        //No se encontro registros
        resultado({tipo: "No encontrado"}, null);
    });
}

//Listar Usuarios
Usuario.listar = (resultado) => {
    sql.query(`CALL spListarUsuarios;`, (err, res) => {
        //Verificar si hubo error ejecuntado la consulta
        if (err) {
            console.log("Error consultado productos: ", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultado
        console.log("Productos encontrados: ", res[0]);
        resultado(null, res[0]);

    });
}

module.exports = Usuario;