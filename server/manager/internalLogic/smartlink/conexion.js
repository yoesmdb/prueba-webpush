//Importacion de modulo ||  import with module
const dbconnection = require('../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    newSmartLink: (smartlink, callback) => {
        const sql = `INSERT INTO smartlink SET ?`;

        if (conexion) {
            conexion.query(sql, smartlink,
                (err, rows) => {
                    if (err) {
                        throw `newSmartLink = error al insertar: ${err}`;
                    } else {
                        //console.log('INSERCIÓN exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
    updStateSmartLink: (smartlink, callback) => {
        const sql = `UPDATE smartlink SET SMARTLINKURL = ?, SMARTLINKURLIMG = ?  WHERE IDSMARTLINK = ?`;

        if (conexion) {
            conexion.query(sql, [smartlink.SMARTLINKURL, smartlink.SMARTLINKURLIMG, smartlink.IDSMARTLINK],
                (err, rows) => {
                    if (err) {
                        throw `updStateSmartLink = error al consultar: ${err}`;
                    } else {
                        console.log('consulta exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },

};