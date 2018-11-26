//Importacion de modulo ||  import with module
const dbconnection = require('./../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getEditorsTopics: (callback) => {

        const sql = `SELECT IDEDITORSTOPIC, IDDATAEDITOR, IDTOPIC, DATEADMISSION FROM editortopics ORDER BY IDEDITORSTOPIC ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa `);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getAllDataEditor: (callback) => {

        const sql = `SELECT * FROM editortopics ORDER BY IDEDITORSTOPIC ASC`;

        if (conexion) {
            conexion.query(sql, {},
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
    newEditorsTopics: (dataEditor, callback) => {
        const sql = `INSERT INTO editortopics SET ?`;
        if (conexion) {
            conexion.query(sql, dataEditor,
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
    updEditorsTopics: (dataEditor, callback) => {
        const sql = `UPDATE editortopics SET IDDATAEDITOR: ?, IDTOPIC: ? WHERE IDEDITORSTOPIC = ?`;

        if (conexion) {
            conexion.query(sql, [dataEditor.URL, dataEditor.PAGETOKEN, dataEditor.IDUSER, dataEditor.IDSTATE, dataEditor.DESCRIPTION, dataEditor.IDDATAEDITOR],
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
};