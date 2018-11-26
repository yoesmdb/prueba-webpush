const dbconnection = require('./conexion.js');

exports.getSuscriptors = (req, res) => {

    dbconnection.getSuscriptors((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log("selected");
            console.log(data);
            res.json(data);
        }
    });
}


exports.newSuscriptor = (req, res) => {

    let container = req.body;

    let suscriptor = {
        TOKENID: container.DATA1,
        PBTOKEN: container.DATA2,
        URL: container.DATA3,
        INITIALSCOUNTRY: container.DATA4,
    }

    dbconnection.newSuscriptor(suscriptor, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log("seva granted");
            console.log(data);
            res.json(rows);
        }
    });
};

exports.updSuscriptor = (req, res) => {

    let container = req.body;

    let suscriptor = {
        TOKENID: container.DATA1,
        PBTOKEN: container.DATA2,
        INITIALSCOUNTRY: container.DATA3,
    }

    dbconnection.updSuscriptor(suscriptor, (err, data) => {
        if (err) {
            console.log(err);
        } else {}
    });
    return { result: 'exitoso' };

}