var admin = require('firebase-admin');

exports.respNotification = (req, res) => {
    let body = req.body;

    if (body.apiKey === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el apikey es necesario..!'
        });
    } else {
        // This registration token comes from the client FCM SDKs.
        var registrationToken = body.apiKey;

        console.log("entro al enviador");

        // See documentation on defining a message payload.
        var message = {
            notification: {
                title: "WHATPUSH",
                body: "Bienvenido al mundo de las notificaciónes push!",
            },
            data: {
                volume: "3.21.15",
                contents: "http://www.google.com",
                icon: "https://image.flaticon.com/icons/png/128/1087/1087840.png"
            },
            token: registrationToken
        };

        // Envía un mensaje al dispositivo correspondiente al proporcionado.
        // Send a message to the device corresponding to the provided        
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
    //res.status({ res: 'Notificación enviada...!' });
};

exports.solveClick = (req, res) => {
    console.log("entro al click");

    let body = req.body;
    console.log(`El estado es:    ${body.estado}`);
    console.log(`El numero es:    ${body.num}`);
    console.log(`El mensaje es :  ${body.data}`);

    res.json({ res: 'se detecto el click...!' });
};