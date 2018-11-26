//Importacion de modulo ||  import with module
const dbconnection = require('./../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();

module.exports = {
    saveDataEditor: (dataEditor, callback) => {
        const sql = `
            INSERT INTO dataeditors
            SET ?
            `;
        if (conexion) {
            conexion.query(sql, dataEditor,
                (err, rows) => {
                    if (err) {
                        throw `saveDataEditor:error al insertar: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getDataEditorsUrl: (dataEditor, callback) => {
        const sql = `
            SELECT * FROM dataeditors WHERE URL=?`;
        if (conexion) {
            conexion.query(sql, dataEditor.URL,
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
    saveDataEditorTopic: (dataEditorTopic, callback) => {
        const sql = `
            INSERT INTO editortopics
            SET ?
            `;
        if (conexion) {
            conexion.query(sql, dataEditorTopic,
                (err, rows) => {
                    if (err) {
                        throw `error al INSERTAR: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getDataEditor: (container, callback) => {

        const sql =
            `SELECT de.IDDATAEDITOR, de.URL, de.PAGETOKEN, CONVERT(de.DATEADMISSIOIN, DATE) AS DATEADMISSIOIN, c.NAMECOUNTRY , t.NAMETOPIC
        FROM dataeditors de 
        JOIN countries c 
        ON de.IDCOUNTRY = c.IDCOUNTRY
        JOIN editortopics et
        ON de.IDDATAEDITOR = et.IDDATAEDITOR
        JOIN topics t
        ON et.IDTOPIC = t.IDTOPIC
        AND de.IDUSER = ?
        ORDER BY URL ASC`;

        if (conexion) {
            conexion.query(sql, container.id,
                (err, rows) => {
                    if (err) {
                        throw `getDataEditor = error al consultar: ${err}`;
                    } else {
                        // console.log(`consulta exitosa ${rows[0].URL}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getIdDataEditor: (container, callback) => {

        const sql =
            `Select de.iddataeditor from dataeditors de where de.IDUSER=? and de.URL=?;`;

        if (conexion) {
            conexion.query(sql, [container.idDataEditor, container.url],
                (err, rows) => {
                    if (err) {
                        throw `getDataEditor = error al consultar: ${err}`;
                    } else {
                        // console.log(`consulta exitosa ${rows[0].URL}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getAllDataEditor: (callback) => {

        const sql = `SELECT * FROM dataeditors ORDER BY URL ASC`;

        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa ${rows[0].URL}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    updDataEditor: (dataEditor, callback) => {
        const sql = `UPDATE dataeditors SET URL: ?, PAGETOKEN: ?, IDUSER: ?, IDSTATE: ? DESCRIPTION: ? WHERE IDDATAEDITOR = ?`;

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
    getDataEditorsId: (dataEditor, callback) => {
        const sql = `SELECT DE.URL, ET.IDTOPIC, DE.IDCOUNTRY FROM dataeditors DE JOIN editortopics ET ON DE.IDDATAEDITOR = ET.IDDATAEDITOR AND DE.IDDATAEDITOR = ?`;
        if (conexion) {
            conexion.query(sql, dataEditor.ID,
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        callback(null, rows);
                    }
                }
            )
        }
    },
};