const dbconnection = require('./conexion.js');

exports.getCountries = (req, res) => {
    dbconnection.getCountries((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            //console.log(data);
            var arr = [];
            data.forEach(element => {
                arr.push({ DATA1: element.IDCOUNTRY, DATA2: element.NAMECOUNTRY });
            });
            res.json(arr);
        }
    });
}

exports.getAllCountries = (req, res) => {
    dbconnection.getAllCountriesTier((err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log(data);
            var arr = [];
            data.forEach(element => {
                arr.push({
                    DATA1: element.IDCOUNTRY,
                    DATA2: element.NAMECOUNTRY,
                    DATA3: element.INITIALS,
                    DATA4: element.IDTIER,
                    DATA5: element.TIERNAME
                });
            });
            res.json(arr);
        }
    });
}

exports.newCountry = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let country = {
            NAMECOUNTRY: container.DATA1,
            INITIALS: container.DATA2,
            IDTIER: container.DATA3,
        };

        dbconnection.newCountry(country, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("seva granted");
                console.log(data);
                res.send({ status: 202, result: 'OK' });
            }
        });
    }
};

exports.updCountry = (req, res) => { //FATA TIER

    let container = req.body;

    let country = {
        IDCOUNTRY: container.DATA1,
        NAMECOUNTRY: container.DATA2,
        INITIALS: container.DATA3,
        IDTIER: container.DATA4,
    }

    dbconnection.updCountry(country, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("update granted");
            console.log(data);
            res.send({ status: 202, result: 'OK' });
        }
    });
}



exports.deleCountry = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let country = {
            IDCOUNTRY: container.DATA1,
        }

        dbconnection.deleCountry(country, (err, data) => {
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



exports.getCountryByID = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let country = {
            IDCOUNTRY: container.DATA1,
        }

        dbconnection.getCountryByID(country, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("selected");
                console.log(data);
                var respons = [];
                data.forEach(country => {
                    respons.push({ DATA1: country.IDCOUNTRY, DATA2: country.NAMECOUNTRY, DATA3: country.INITIALS, DATA4: country.IDTIER });
                });
                res.json(respons);
            }
        });
    }
};