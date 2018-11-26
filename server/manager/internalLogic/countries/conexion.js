//Importacion de modulo ||  import with module
const dbconnection = require('./../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();

module.exports = {
    newCountry: (country, callback) => {
        const sql = `INSERT INTO countries SET ?`;
        if (conexion) {
            conexion.query(sql, country,
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
    updCountry: (country, callback) => { //FALTA TIER
        const sql = `UPDATE countries SET NAMECOUNTRY = ?, INITIALS = ?, IDTIER = ? WHERE IDCOUNTRY = ?`;
        if (conexion) {
            conexion.query(sql, [country.NAMECOUNTRY, country.INITIALS, country.IDTIER, country.IDCOUNTRY],
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        //   console.log('consulta exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getCountries: (callback) => {
        const sql = `SELECT IDCOUNTRY, NAMECOUNTRY FROM countries ORDER BY NAMECOUNTRY ASC`;
        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        //console.log(`consulta exitosa ${rows[0].NAMECOUNTRY}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getAllCountriesTier: (callback) => {
        const sql = `SELECT C.IDCOUNTRY, C.NAMECOUNTRY, C.INITIALS, C.IDTIER, t.TIERNAME FROM countries C JOIN tiers T on C.IDTIER = T.IDTIER`;
        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        //console.log(`consulta exitosa ${rows[0].NAMECOUNTRY}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getAllCountries: (callback) => {
        const sql = `SELECT * FROM countries ORDER BY NAMECOUNTRY ASC`;
        if (conexion) {
            conexion.query(sql, {},
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        //console.log(`consulta exitosa ${rows[0].NAMECOUNTRY}`);
                        callback(null, rows);
                    }
                }
            )
        }
    },
    deleCountry: (country, callback) => {
        const sql = `DELETE FROM countries WHERE IDCOUNTRY = ?`;

        if (conexion) {
            conexion.query(sql, [country.IDCOUNTRY],
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
    getCountryByID: (country, callback) => {
        const sql = `SELECT C.IDCOUNTRY, C.NAMECOUNTRY, C.INITIALS, T.IDTIER FROM countries C JOIN tiers T ON C.IDTIER = T.IDTIER AND C.IDCOUNTRY = ?`;

        if (conexion) {
            conexion.query(sql, country.IDCOUNTRY,
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
//, T.TIERNAME, T.CPC, T.CPM
//select c.IDCOUNTRY, c.NAMECOUNTRY from countries c join dataeditorcountries ddc on c.IDCOUNTRY = ddc.IDCOUNTRY join dataeditors de on ddc.IDDATAEDITOR = de.IDDATAEDITOR