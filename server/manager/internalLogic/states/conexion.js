//Importacion de modulo ||  import with module
const dbconnection = require('./../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getStates: (callback) => {
        const sql = `SELECT CODE, TYPESTATE FROM states ORDER BY TYPESTATE ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa ${rows[0].NAMECOUNTRY}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    newCountry: (state, callback) => {
        const sql = `INSERT INTO states SET ?`;

        if (conexion) {
            conexion.query(sql, state,
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
    updState: (state, callback) => {
        const sql = `UPDATE states SET CODE = ?, TYPESTATE = ?, DESCRIPTION = ? WHERE IDSTATE = ?`;

        if (conexion) {
            conexion.query(sql, [state.CODE, state.TYPESTATE, state.DESCRIPTION, state.IDSTATE],
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
    },
    getAllCountries: (callback) => {
        const sql = `SELECT * FROM states ORDER BY TYPESTATE ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa ${rows[0].TYPESTATE}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
};