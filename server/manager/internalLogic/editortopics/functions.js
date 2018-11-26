const dbconnection = require('./conexion.js');
const bcrypt = require('bcryptjs');

exports.getEditorsTopics = (req, res) => {

    dbconnection.getEditorsTopics((err, data) => {
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


exports.newEditorsTopics = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR' || roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        if (roleActualy == 'EDITOR') {
            userActualy = req.user.id;
        } else {
            userActualy = container.DATA3;
        }

        let editorTopic = {
            IDDATAEDITOR: container.DATA1,
            IDTOPIC: container.DATA2,
        }

        dbconnection.newEditorsTopics(editorTopic, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("seva granted");
                console.log(data);
                res.json(rows);
            }
        });

    }
};

exports.updEditorsTopics = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR' || roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        if (roleActualy == 'EDITOR') {
            userActualy = req.user.id;
        } else {
            userActualy = container.DATA4;
        }

        let editorTopic = {
            IDEDITORTOPIC: container.DATA1,
            IDDATAEDITOR: container.DATA2,
            IDTOPIC: container.DATA3,
        }

        dbconnection.updEditorsTopics(editorTopic, (err, data) => {
            if (err) {
                console.log(err);
            } else {}
        });
        return { result: 'exitoso' };
    }
}