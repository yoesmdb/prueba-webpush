importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDnCNoO319A2Asp8iIss_Y91qVMJ_XJWew",
    authDomain: "prueba-e78cc.firebaseapp.com",
    databaseURL: "https://prueba-e78cc.firebaseio.com",
    projectId: "prueba-e78cc",
    storageBucket: "prueba-e78cc.appspot.com",
    messagingSenderId: "689269080205"
};

firebase.initializeApp(config);

let messageJson;

self.addEventListener('push', function(event) {
    //console.log('push recibido:');
    //console.log('Event data is : ', event.data.text());
    messageJson = event.data.json();
    const title = messageJson.notification.title;
    const options = {
        body: messageJson.notification.body,
        icon: messageJson.data.icon,
    }

    return self.registration.showNotification(title, options);
});


self.addEventListener('notificationclick', async function(e) {


    var notification = e.notification;
    var action = e.action;

    var datas = messageJson.data.contents;

    var res = datas.split("----");

    console.log(`la url es: ${res[0]}`);
    clients.openWindow(res[0]);
    console.log(`hiciste click`);

    //console.log(`all: ${Object.values(messageJson)}`);
    //console.log(`notification: ${Object.values(messageJson.notification)}`);
    //console.log(`data: ${Object.values(messageJson.data)}`);


    var data = "El usuario hizo clic en la notificación";
    var estado = 'ok';
    //https://7c4b353e.ngrok.io/click
    await fetch("http://localhost:3000/solveClick", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `estado=${estado}&data=${data}&num=200&urlClick=${res[1]}`
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Request succeeded with data response: ', data.res);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    notification.close();
});