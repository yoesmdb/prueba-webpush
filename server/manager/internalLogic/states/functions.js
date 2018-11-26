const dbconnection = require('./conexion.js');

exports.getStates = (req, res) => {

    dbconnection.getStates((err, data) => {
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


exports.newState = (req, res) => {

    let container = req.body;

    let state = {
        CODE: container.DATA1,
        TYPESTATE: container.DATA2,
        DESCRIPTION: container.DATA3,
    }

    dbconnection.newState(state, (err, data) => {
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

exports.updState = (req, res) => {

    let container = req.body;

    let state = {
        IDSTATE: container.DATA1,
        CODE: container.DATA2,
        TYPESTATE: container.DATA3,
        DESCRIPTION: container.DATA4,
    }

    dbconnection.updState(state, (err, data) => {
        if (err) {
            console.log(err);
        } else {}
    });
    return { result: 'exitoso' };

}