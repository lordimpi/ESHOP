//Cargar libreria para operar bd mysql
var mysql = require("mysql");

//Cargar el archivo de configuracion
var configBD = require("../config/bd.config");

//Crear conexion a la Bd
var conexion = mysql.createConnection({
    host: configBD.SERVIDOR,
    user: configBD.USUARIO,
    password: configBD.CLAVE,
    database: configBD.BASEDATOS
});

//Abrir la conexion a la base de datos
conexion.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("Conexión exitosa a la base de datos eshop");
}
);

module.exports = conexion;