//Importacion de modulo ||  import with module
const dbconnection = require('../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    getTiers: (callback) => {
        const sql = `SELECT * FROM tiers ORDER BY TIERNAME ASC`;

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
    getTierByCountry: (country, callback) => {
        const sql = `SELECT t.CPC, t.CPM FROM tiers t join countries c ON t.IDTIER = c.IDTIER AND c.IDCOUNTRY = ?`;

        if (conexion) {
            conexion.query(sql, country.IDCOUNTRY,
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log(`consulta exitosa ${rows[0].CPC}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    newTier: (tier, callback) => {
        const sql = `INSERT INTO tiers SET ?`;

        if (conexion) {
            conexion.query(sql, tier,
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
    updTier: (tier, callback) => {
        const sql = `UPDATE tiers SET TIERNAME = ?, CPC = ?, CPM = ?, DESCRIPTION = ? WHERE IDTIER = ?`;

        if (conexion) {
            conexion.query(sql, [tier.TIERNAME, tier.CPC, tier.CPM, tier.DESCRIPTION, tier.IDTIER],
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
        const sql = `SELECT * FROM tiers ORDER BY TIERNAME ASC`;

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
    getTiersByID: (tier, callback) => {
        const sql = `SELECT IDTIER, TIERNAME, CPC, CPM, DESCRIPTION FROM tiers WHERE IDTIER = ?`;

        if (conexion) {
            conexion.query(sql, tier.IDTIER,
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
    deleTier: (tier, callback) => {
        const sql = `DELETE FROM tiers WHERE IDTIER = ?`;

        if (conexion) {
            conexion.query(sql, [tier.IDTIER],
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
};