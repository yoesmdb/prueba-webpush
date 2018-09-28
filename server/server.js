require('./config/config');
'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var admin = require('firebase-admin');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var serviceAccount = require('./../path/to/pruebapush-26e80-firebase-adminsdk-q7ecp-d83c4e6a85.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pruebapush-26e80.firebaseio.com'
});

app.get('/prueba', (req, res) => {
    res.json('servidor desplego...!');
});

app.post('/prueba', (req, res) => {
    let body = req.body;

    if (body.apiKey === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el apikey es necesario..!'
        });
    } else {
        // This registration token comes from the client FCM SDKs.
        var registrationToken = body.apiKey;

        // See documentation on defining a message payload.
        var message = {
            notification: {
                title: "WHATPUSH",
                body: "Notificación de prueba, servidor funcionando!",
            },
            data: {
                volume: "3.21.15",
                contents: "http://www.news-magazine.com/world-week/21659772",
                icon: "https://image.flaticon.com/icons/png/128/1087/1087840.png"
            },
            token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });

        res.json({ notification: body });
    }
});





app.listen(process.env.PORT, () => {
    console.log(`escuchando en el puesto ${process.env.PORT}`);
});