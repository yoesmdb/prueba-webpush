const dbconnection = require('./conexion.js');

exports.getTopics = (req, res) => {

    dbconnection.getTopics((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            var arr = [];
            data.forEach(element => {
                arr.push({ DATA1: element.IDTOPIC, DATA2: element.NAMETOPIC });
            });
            res.json(arr);
        }
    });
}

exports.newTopic = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let tier = {
            NAMETOPIC: container.DATA1
        }

        dbconnection.newTopic(tier, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("seved granted");
                console.log(data);
                res.send({ status: 202, result: 'OK' });
            }
        });
    }
};

exports.updTopic = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let topic = {
            IDTOPIC: container.DATA1,
            NAMETOPIC: container.DATA2
        }

        dbconnection.updTopic(topic, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("update granted");
                console.log(data);
                res.send({ status: 202, result: 'OK' });
            }
        });
    }
}

exports.deleTopic = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let roleActualy = req.user.role;

        if (roleActualy == 'ADMINISTRADOR') {

            let container = req.body;

            let topic = {
                IDTOPIC: container.DATA1,
            }

            dbconnection.deleTopic(topic, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("delete granted");
                    console.log(data);
                    res.send({ status: 202, result: 'OK' });
                }
            });
        }
    }
}


exports.getTopicByID = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let topic = {
            IDTOPIC: container.DATA1,
        }

        dbconnection.getTopicByID(topic, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("selected");
                console.log(data);
                var respons = [];
                data.forEach(topic => {
                    respons.push({ DATA1: topic.IDTOPIC, DATA2: topic.NAMETOPIC });
                });
                res.json(respons);
            }
        });
    }
};