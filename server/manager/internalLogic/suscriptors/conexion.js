//Importacion de modulo ||  import with module
const dbconnection = require('../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getSuscriptors: (callback) => {

        const sql = `SELECT * FROM suscriptors ORDER BY IDSUSCRIPTOR ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa ${rows[0].TIERNAME}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    newSuscriptor: (suscriptor, callback) => {
        const sql = `INSERT INTO suscriptors SET ?`;
        if (conexion) {
            conexion.query(sql, suscriptor,
                (err, rows) => {
                    if (err) {
                        throw `error al INSERTAR: ${err}`;
                    } else {
                        console.log('INSERCIÓN exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
    updSuscriptor: (suscriptor, callback) => {
        const sql = `
            UPDATE suscriptors 
            SET INITIALSCOUNTRY = ?
            WHERE
            TOKENID = ?`;

        if (conexion) {
            conexion.query(sql, [suscriptor.INITIALSCOUNTRY, suscriptor.TOKENID],
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log('consulta exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    }
};