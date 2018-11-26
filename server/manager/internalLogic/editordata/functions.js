const dbconnection = require('./conexion.js');
const dbcMaster = require('../masters/conexion.js');
const bcrypt = require('bcryptjs');
const urlExists = require('url-exists');


exports.getDataEditorsId = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR' || roleActualy == 'ADMINISTRADOR') {

        let container = req.body;
        let dataEditor = {
            ID: container.DATA1,
        };
        // DATA1: data[0].namemanifest
        // DATA5: data[0].linkwhatpushapp

        let result = {
            status: 202,
            result: 'OK',
            DATA1: '',
            DATA2: '',
            DATA3: 0,
            DATA4: 0,
            DATA5: '',
        }
        dbconnection.getDataEditorsId(dataEditor, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (data[0] != null) {
                    result.DATA2 = data[0].URL;
                    result.DATA3 = data[0].IDTOPIC;
                    result.DATA4 = data[0].IDCOUNTRY;

                    dbcMaster.getdataMaster((err, data) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            result.DATA1 = data[0].namemanifest;
                            result.DATA5 = data[0].linkwhatpushapp;
                            res.json(result);
                        }
                    });
                }
            }
        });
    }
};

exports.addUrl = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR' || roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        urlExists(container.DATA1, (err, exists) => {
            if (err) {
                console.log('urlExists error: ' + err);
            } else if (exists) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(container.DATA1, salt);
                let userActualy = 0;

                if (roleActualy == 'EDITOR') {
                    userActualy = req.user.id;
                } else {
                    userActualy = container.DATA4;
                }

                let dataEditor = {
                    URL: container.DATA1,
                    PAGETOKEN: hash,
                    IDUSER: userActualy,
                    IDCOUNTRY: container.DATA3
                };

                dbconnection.getDataEditorsUrl(dataEditor, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (data[0] == null) {
                            dbconnection.saveDataEditor(dataEditor, (err, data) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    //console.log("save saveDataEditor");

                                }
                            });
                            let addDataEditor = {
                                idDataEditor: req.user.id,
                                url: container.DATA1
                            };
                            dbconnection.getIdDataEditor(addDataEditor, (err, data) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    let dataEditorTopic = {
                                        IDDATAEDITOR: data[0].iddataeditor,
                                        IDTOPIC: container.DATA2
                                    };
                                    dbconnection.saveDataEditorTopic(dataEditorTopic, (err, data) => {
                                        if (err) {
                                            console.log(err);
                                            reject(err);
                                        } else {
                                            dbcMaster.getdataMaster((err, data) => {
                                                if (err) {
                                                    console.log(err);
                                                    reject(err);
                                                } else {
                                                    res.json({
                                                        status: 202,
                                                        result: 'OK',
                                                        DATA1: data[0].namemanifest,
                                                        DATA2: container.DATA1,
                                                        DATA3: container.DATA2,
                                                        DATA4: container.DATA3,
                                                        DATA5: data[0].linkwhatpushapp
                                                    });
                                                }
                                            });

                                        }
                                    });

                                }
                            });



                        } else {
                            res.send({ status: 202, result: 'url is already added' });
                        }

                    }
                });
            } else {
                res.send({ status: 202, result: 'bad url' });
            }
        });



    }



};


exports.getDataEditors = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR') {

        let container = { id: req.user.id };
        dbconnection.getDataEditor(container, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                arr = [];
                data.forEach(element => {
                    arr.push({
                        DATA1: element.IDDATAEDITOR,
                        DATA2: element.URL,
                        DATA3: element.PAGETOKEN,
                        DATA4: element.DATEADMISSIOIN,
                        DATA5: element.NAMECOUNTRY,
                        DATA6: element.NAMETOPIC
                    });
                });
                res.json(arr);
            }
        });
    }
};


exports.updDataEditor = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'EDITOR' || roleActualy == 'ADMINISTRADOR') {

        let container = req.body;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(container.DATA1, salt);
        let userActualy = 0;

        if (roleActualy == 'EDITOR') {
            userActualy = req.user.id;
        } else {
            userActualy = container.DATA4;
        }

        let dataEditor = {
            IDDATAEDITOR: container.DATA1,
            URL: container.DATA2,
            PAGETOKEN: hash,
            IDUSER: userActualy,
            IDSTATE: container.DATA3,
            DESCRIPTION: container.DATA4,
        }

        dbconnection.updDataEditor(dataEditor, (err, data) => {
            if (err) {
                console.log(err);
            } else {}
        });
        return { result: 'exitoso' };
    }
};