//Importacion de modulo ||  import with module
const dbconnection = require('./../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();

module.exports = {
    newUser: (user, callback) => {
        const sql = `
            INSERT INTO users
            SET ?
            `;
        if (conexion) {
            conexion.query(sql, user,
                (err, rows) => {
                    if (err) {
                        throw `newUser=error al insertar: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getUser: (user, callback) => {
        const sql = `
            SELECT * FROM users WHERE
            EMAIL=?
        `;
        if (conexion) {
            conexion.query(sql, user.username,
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        //console.log(`consulta exitosa ${rows[0].EMAIL}`);
                        callback(null, rows);

                    }
                }
            )
        }
    },
    getUserByEmailt: (user, callback) => {
        const sql = `
            SELECT * FROM users WHERE
            EMAIL=?
        `
        if (conexion) {
            conexion.query(sql, user.DATA1,
                (err, rows) => {
                    if (err) {
                        throw `getUserByEmailt=error al consultar: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
    UpdatePassUser: (user, callback) => {
        const sql = `
            UPDATE users 
            SET PASSWORD = ?
            WHERE
            EMAIL=?
        `
        if (conexion) {
            conexion.query(sql, [user.PASSWORD, user.EMAIL],
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