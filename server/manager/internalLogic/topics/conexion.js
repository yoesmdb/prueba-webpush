//Importacion de modulo ||  import with module
const dbconnection = require('../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getTopics: (callback) => {
        const sql = `SELECT * FROM topics ORDER BY NAMETOPIC ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        // console.log(`consulta exitosa ${rows[0].NAMETOPIC}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    newTopic: (topic, callback) => {
        const sql = `INSERT INTO topics SET ?`;

        if (conexion) {
            conexion.query(sql, topic,
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
    updTopic: (topic, callback) => {
        const sql = `UPDATE topics SET NAMETOPIC = ? WHERE IDTOPIC = ?`;

        if (conexion) {
            conexion.query(sql, [topic.NAMETOPIC, topic.IDTOPIC],
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
    deleTopic: (topic, callback) => {
        const sql = `DELETE FROM topics WHERE IDTOPIC = ?`;

        if (conexion) {
            conexion.query(sql, [topic.IDTOPIC],
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log('TRANSACCIÓN exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getTopicByID: (topic, callback) => {
        const sql = `SELECT IDTOPIC, NAMETOPIC FROM topics WHERE IDTOPIC = ?`;

        if (conexion) {
            conexion.query(sql, topic.IDTOPIC,
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
};