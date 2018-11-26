const dbconnection = require('./conexion.js');
const randomstring = require("randomstring");
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


exports.Logout = (req, res, next) => {
    req.logout();
    res.redirect('/')
};

exports.Connt = (req, res) => {
    console.log("GET exitoso");
};

exports.newRegister = (req, res) => {

    let container = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(container.DATA7, salt);

    let user = {
        TYPE: container.DATA1,
        NAME: container.DATA2,
        LASTNAME: container.DATA3,
        NAMECOMPANY: container.DATA4,
        IDCOUNTRY: container.DATA5,
        PHONE: container.DATA9,
        EMAIL: container.DATA6,
        PASSWORD: hash,
        IDSTATE: '01'
    };


    dbconnection.newUser(user, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            res.json(container);
        }
    });
};

exports.newPass = (req, res) => {

    let user = {
        DATA1: req.body.DATA1,
    }

    dbconnection.getUserByEmailt(user, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            generateSendNewPass(data);
            res.json({ result: 'exitoso' });
        }
    });
    return { result: 'exitoso' };

}

let generateSendNewPass = (dataUser) => {

    let newPass = randomstring.generate(10);
    //console.log(`el nuevo pass de: ${ dataUser[0].EMAIL } es ${newPass}`);

    let salt = bcrypt.genSaltSync(10);
    let NewHash = bcrypt.hashSync(newPass, salt);
    //console.log(`el hash del nuevo password es: ${NewHash}`);

    let user = {
        PASSWORD: NewHash,
        EMAIL: dataUser[0].EMAIL
    }

    dbconnection.UpdatePassUser(user, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log('update exitoso');
            sendNewEmail(dataUser, newPass);
        }
    });
}


let sendNewEmail = (dataUser, newPass) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        port: 25,
        auth: {
            user: "whatpushnoresponder@gmail.com",
            pass: "whatpush123456789"
        }
    });

    var mailOptions = {
        from: '"What Push" <whatpushnoresponder@gmail.com',
        to: dataUser[0].EMAIL,
        subject: 'new password',
        text: `Hello ${dataUser[0].NAME}, your new passsword is ${ newPass }`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        //console.log("senMail returned!");
        if (error) {
            console.log("ERROR!!!!!!", error);
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });
}