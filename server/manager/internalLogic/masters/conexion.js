//Importacion de modulo ||  import with module
const dbconnection = require('../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getdataMaster: (callback) => {
        const sql = `SELECT * FROM masters`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `getdataMaster: error al consultar: ${err}`;
                    } else {

                        callback(null, rows);
                    }
                }
            )
        }
    },

    getPrimaryDomain: (callback) => {
        const sql = `SELECT m.primarydomain FROM masters m`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `getPrimaryDomain: error al consultar: ${err}`;
                    } else {

                        callback(null, rows);
                    }
                }
            )
        }
    },
};