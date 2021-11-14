//Carga la libreria conexión a la base de datos
var sql = require("./bd");
//Carga la libreria de encripatado
var Bcrypt = require('bcrypt');
//Cargar configuracion de seguridad
var seg = require("../config/security.config");
//Cargar la libreria de generación de tokens
const jwt = require("jsonwebtoken");

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

//Metodo para cambiar la clave de usuario
Usuario.cambiarClave = (usuario, clave, resultado) => {
    sql.query('CALL spActualizarClaveUsuario(?,?)',
        [usuario, Bcrypt.hashSync(clave, 10)], (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando clave ", err);
                resultado(err, null);
                return;
            }
            //La consulta no afecto registros
            if (res.length == 0) {
                console.log("Usuario no encontrado: ", res[0]);
                resultado({ tipo: "No encontrado" }, null);
                return;
            }
            console.log("Clave actualizada ", { usuario });
            resultado(null, { usuario });
        });
}

function obtenerClave(usuario) {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT Clave FROM Usuario WHERE Usuario = '${usuario}';`, (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                return reject(err);
            } else {
                if (res.length == 0) {
                    resolve("");
                } else {
                    resolve(res[0].Clave);
                }
            }
        });
    });
}

//Metodo que valida las credenciales de un usuario
Usuario.validarAcceso = async (usuario, clave, resultado) => {
    const claveGuardada = await obtenerClave(usuario);

    if (claveGuardada) {
        //Confrontar claves
        if (Bcrypt.compareSync(clave, claveGuardada)) {

            //Generar token
            const token = jwt.sign(
                { usuario: usuario },
                seg.CLAVE,
                { expiresIn: seg.VIGENCIA }
            );

            const data = JSON.stringify({
                message: 'Autenticacion exitosa',
                Token: token
            });

            resultado(null, data);

        } else {
            resultado({ tipo: "Credenciales no válidas" }, null);
            console.log("Credenciales no válidas");
        }

    } else {
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
        console.log("Usuario o Contraseña no validos");
    }
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