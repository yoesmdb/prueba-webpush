const dbconnection = require('./conexion.js');

exports.getTiers = (req, res) => {

    dbconnection.getTiers((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            arr = [];
            data.forEach(element => {
                arr.push({
                    DATA1: element.IDTIER,
                    DATA2: element.TIERNAME,
                    DATA3: element.CPC,
                    DATA4: element.CPM,
                    DATA5: element.DESCRIPTION
                });
            });
            res.json(arr);
        }
    });
}


exports.newTier = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {
        let container = req.body;

        let tier = {
            TIERNAME: container.DATA1,
            CPC: container.DATA2,
            CPM: container.DATA3,
            DESCRIPTION: container.DATA4,
        }

        dbconnection.newTier(tier, (err, data) => {
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


exports.updTier = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let roleActualy = req.user.role;

        if (roleActualy == 'ADMINISTRADOR') {

            let container = req.body;

            let tier = {
                IDTIER: container.DATA1,
                TIERNAME: container.DATA2,
                CPC: container.DATA4,
                CPM: container.DATA5,
                DESCRIPTION: container.DATA3,
            }

            dbconnection.updTier(tier, (err, data) => {
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
}


exports.deleTier = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let roleActualy = req.user.role;

        if (roleActualy == 'ADMINISTRADOR') {

            let container = req.body;

            let tier = {
                IDTIER: container.DATA1,
            }

            dbconnection.deleTier(tier, (err, data) => {
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


exports.tierByCountry = (req, res) => {

    let container = req.body;

    let country = {
        IDCOUNTRY: container.DATA1,
    }

    dbconnection.getTierByCountry(country, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log("selected");
            console.log(data);
            var respons = [];
            data.forEach(tier => {
                respons.push({ DATA1: tier.CPC, DATA2: tier.CPM });
            });
            res.json(respons);
        }
    });
};


exports.getTiersByID = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let tier = {
            IDTIER: container.DATA1,
        }

        dbconnection.getTiersByID(tier, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("selected");
                console.log(data);
                var respons = [];
                data.forEach(tier => {
                    respons.push({ DATA1: tier.IDTIER, DATA2: tier.TIERNAME, DATA3: tier.CPC, DATA4: tier.CPM, DATA5: tier.DESCRIPTION });
                });
                res.json(respons);
            }
        });
    }
};