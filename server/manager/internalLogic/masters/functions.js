const dbconnection = require('./conexion.js');

exports.getDataDownload = (req, res) => {

    dbconnection.getdataMaster((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            res.json({
                DATA1: data[0].namemanifest,
                DATA2: data[0].linkserviceworker,
                DATA3: data[0].linkwhatpushapp,
                DATA4: data[0].firebasenameprojet,
                DATA5: data[0].gcmsenderid,
                DATA6: data[0].nameserviceworker
            });
        }
    });
}