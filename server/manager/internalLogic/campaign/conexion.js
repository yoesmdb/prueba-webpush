//Importacion de modulo ||  import with module
const dbconnection = require('./../../connections/mysql/conexion.js');

//Creamos la conexion || We create the connection
let conexion = dbconnection.conexion();


module.exports = {
    saveCampaign: (campaign, callback) => {
        const sql = `
            INSERT INTO campaign
            SET ?
            `;
        if (conexion) {
            conexion.query(sql, campaign,
                (err, rows) => {
                    if (err) {
                        throw `saveCampaign = error al insertar: ${err}`;
                    } else {
                        //console.log('INSERCIÓN exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
    updateCampaignImgPathById: (campaign, callback) => {
        const sql = `UPDATE campaign SET IMAGE = ? WHERE IDCAMPAIGN = ?`;

        if (conexion) {
            conexion.query(sql, [campaign.FILENAME, campaign.IDCAMPAIGN],
                (err, rows) => {
                    if (err) {
                        throw `updateCampaignImgPathById = error al actualizar: ${err}`;
                    } else {
                        //console.log('ACTUALIZACIÓN exitosa');                        
                        callback(null, rows);
                    }
                }
            )
        }
    },
    getCampaignByAprobed: (campaign, callback) => {
        const sql = `SELECT C.IDCAMPAIGN, C.NAMECAMPAIGN, C.IMAGE, C.TITLE, C.CONTENT, C.URL, C.IDCOUNTRY, CO.NAMECOUNTRY, C.CLICKPAY, C.NUMBERCLICKS, C.TOTALBALANCE, 
        C.DAILYBALANCE, C.NUMBERDAILYCLICKS, C.NUMBERTOTALCLICKS, C.CAMPAIGNAPROVED, C.IDTOPIC, T.NAMETOPIC, C.IDSTATE, S.TYPESTATE, C.IDUSER, U.NAME, U.LASTNAME, 
        U.NAMECOMPANY, C.OBSERVATIONS, C.DATEUPDATE, C.DATEADMISSIOIN FROM campaign C join countries CO ON C.IDCOUNTRY = CO.IDCOUNTRY 
        JOIN topics T ON C.IDTOPIC = T.IDTOPIC 
        JOIN states S ON C.IDSTATE = S.IDSTATE 
        JOIN users U ON C.IDUSER = U.ID 
        AND C.CAMPAIGNAPROVED = ?`;

        if (conexion) {
            conexion.query(sql, campaign.APROVED,
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
    getCampaignByID: (campaign, callback) => {
        const sql = `SELECT C.IDCAMPAIGN, C.NAMECAMPAIGN, C.IMAGE, C.TITLE, C.CONTENT, C.URL, C.IDCOUNTRY, CO.NAMECOUNTRY, C.CLICKPAY, C.NUMBERCLICKS, C.TOTALBALANCE, 
        C.DAILYBALANCE, C.NUMBERDAILYCLICKS, C.NUMBERTOTALCLICKS, C.CAMPAIGNAPROVED, C.IDTOPIC, T.NAMETOPIC, C.IDSTATE, S.TYPESTATE, C.IDUSER, U.NAME, U.LASTNAME, 
        U.NAMECOMPANY, C.OBSERVATIONS, C.DATEUPDATE, C.DATEADMISSIOIN FROM campaign C join countries CO ON C.IDCOUNTRY = CO.IDCOUNTRY 
        JOIN topics T ON C.IDTOPIC = T.IDTOPIC 
        JOIN states S ON C.IDSTATE = S.IDSTATE 
        JOIN users U ON C.IDUSER = U.ID 
        AND C.IDCAMPAIGN = ?`;

        if (conexion) {
            conexion.query(sql, campaign.IDCAMPAIGN,
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
    updaAproReject: (campaign, callback) => {
        const sql = `UPDATE campaign SET CAMPAIGNAPROVED = ?, OBSERVATIONS = ? WHERE IDCAMPAIGN = ?`;

        if (conexion) {
            conexion.query(sql, [campaign.CAMPAIGNAPROVED, campaign.OBSERVATIONS, campaign.IDCAMPAIGN],
                (err, rows) => {
                    if (err) {
                        throw `error al consultar: ${err}`;
                    } else {
                        console.log('actualización exitosa');
                        callback(null, rows);
                    }
                }
            )
        }
    },
}