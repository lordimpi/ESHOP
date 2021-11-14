//Cargar la libreria con la conexion a la bd
var sql = require('./bd');

//constructores
var Detalle = function (detalle) {
    this.idProducto = detalle.IdProducto;
    this.cantidad = detalle.Cantidad;
    this.valorUnitario = detalle.ValorUnitario;
    this.iva = detalle.IVA;
}

var Venta = function (venta) {
    this.id = venta.Id;
    this.idCliente = venta.IdCliente;
    this.factura = venta.Factura;
    this.fecha = venta.Fecha;
    this.cuenta = venta.Cuenta;
    this.idFormaPago = venta.IdFormaPago;
    this.detalle = [];
    venta.Detalle.map((detalle) => {
        this.detalle.push(new Detalle(detalle));
    });
}

function obtenerId(factura) {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT Id FROM Venta WHERE Factura='${factura}';`, (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                return reject(err);
            } else {
                if (res.length === 0) {
                    resolve(-1);
                }
                resolve(res[0].Id);
            }
        });
    });
}

//Metodo que actualiza un registro 
Venta.actualizar = (venta, resultado) => {
    sql.query('CALL spActualizarVenta(?, ?, ?, ?, ?, ?);', //consulta sql
        [venta.id,
        venta.idCliente,
        venta.fecha,
        venta.cuenta,
        venta.idFormaPago,
        venta.factura], //parametros
        async function (err, res) {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando venta:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            //Obtener el ID de la venta
            if (venta.id <= 0) {
                venta.id = await obtenerId(venta.factura);
            }

            venta.detalle.map((detalle) => {

                sql.query('CALL spActualizarVentaDetalle(?, ?, ?, ?, ?);', //consulta sql
                    [venta.id,
                    detalle.idProducto,
                    detalle.cantidad,
                    detalle.valorUnitario,
                    detalle.iva], //parametros
                    (err, res) => {
                        //Verificar si hubo error ejecutando la consulta
                        if (err) {
                            console.log("Error actualizando detalle de la venta:", err);
                            resultado(err, null);
                            return;
                        }

                    });

            });

            console.log("venta actualizada :", venta);
            resultado(null, venta);

        });
}

module.exports = Venta;