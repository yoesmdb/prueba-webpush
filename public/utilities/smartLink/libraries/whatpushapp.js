var config = {
    apiKey: "AIzaSyDnCNoO319A2Asp8iIss_Y91qVMJ_XJWew",
    authDomain: "prueba-e78cc.firebaseapp.com",
    databaseURL: "https://prueba-e78cc.firebaseio.com",
    projectId: "prueba-e78cc",
    storageBucket: "prueba-e78cc.appspot.com",
    messagingSenderId: "689269080205"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.requestPermission()
    .then(function() {
        console.log('tienes permiso');
        return messaging.getToken();
    })
    .then(function(token) {
        console.log(token);
        console.log(getTimezoneName());
        sendToken(token);
        window.location.replace(`${dataUrlPromo.url}`);
    })
    .catch(function(err) {
        console.log('ha ocurrido un error', err);
    });


async function sendToken(token) {
    //var url = window.location;
    await fetch("http://localhost:3000/respNotification", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `apiKey=${token}` //&url=${url}
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            //let info = data.body;
            //console.log('The response is: ', info.url);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
}

function getTimezoneName() {
    tmSummer = new Date(Date.UTC(2000, 6, 30, 0, 0, 0, 0));
    so = -1 * tmSummer.getTimezoneOffset();
    console.log(tmSummer);
    console.log(so);
    tmWinter = new Date(Date.UTC(2000, 12, 30, 0, 0, 0, 0));
    wo = -1 * tmWinter.getTimezoneOffset();
    console.log(tmWinter);
    console.log(wo);

    if (-660 == so && -660 == wo) return 'Pacific/Midway';
    if (-600 == so && -600 == wo) return 'Pacific/Tahiti';
    if (-570 == so && -570 == wo) return 'Pacific/Marquesas';
    if (-540 == so && -600 == wo) return 'America/Adak';
    if (-540 == so && -540 == wo) return 'Pacific/Gambier';
    if (-480 == so && -540 == wo) return 'US/Alaska';
    if (-480 == so && -480 == wo) return 'Pacific/Pitcairn';
    if (-420 == so && -480 == wo) return 'US/Pacific';
    if (-420 == so && -420 == wo) return 'US/Arizona';
    if (-360 == so && -420 == wo) return 'US/Mountain';
    if (-360 == so && -360 == wo) return 'America/Guatemala';
    if (-360 == so && -300 == wo) return 'Pacific/Easter';
    if (-300 == so && -360 == wo) return 'US/Central';
    if (-300 == so && -300 == wo) return 'CO';
    if (-240 == so && -300 == wo) return 'US/Eastern';
    if (-240 == so && -240 == wo) return 'America/Caracas';
    if (-240 == so && -180 == wo) return 'America/Santiago';
    if (-180 == so && -240 == wo) return 'Canada/Atlantic';
    if (-180 == so && -180 == wo) return 'America/Montevideo';
    if (-180 == so && -120 == wo) return 'America/Sao_Paulo';
    if (-150 == so && -210 == wo) return 'America/St_Johns';
    if (-120 == so && -180 == wo) return 'America/Godthab';
    if (-120 == so && -120 == wo) return 'America/Noronha';
    if (-60 == so && -60 == wo) return 'Atlantic/Cape_Verde';
    if (0 == so && -60 == wo) return 'Atlantic/Azores';
    if (0 == so && 0 == wo) return 'Africa/Casablanca';
    if (60 == so && 0 == wo) return 'Europe/London';
    if (60 == so && 60 == wo) return 'Africa/Algiers';
    if (60 == so && 120 == wo) return 'Africa/Windhoek';
    if (120 == so && 60 == wo) return 'Europe/Amsterdam';
    if (120 == so && 120 == wo) return 'Africa/Harare';
    if (180 == so && 120 == wo) return 'Europe/Athens';
    if (180 == so && 180 == wo) return 'Africa/Nairobi';
    if (240 == so && 180 == wo) return 'Europe/Moscow';
    if (240 == so && 240 == wo) return 'Asia/Dubai';
    if (270 == so && 210 == wo) return 'Asia/Tehran';
    if (270 == so && 270 == wo) return 'Asia/Kabul';
    if (300 == so && 240 == wo) return 'Asia/Baku';
    if (300 == so && 300 == wo) return 'Asia/Karachi';
    if (330 == so && 330 == wo) return 'Asia/Calcutta';
    if (345 == so && 345 == wo) return 'Asia/Katmandu';
    if (360 == so && 300 == wo) return 'Asia/Yekaterinburg';
    if (360 == so && 360 == wo) return 'Asia/Colombo';
    if (390 == so && 390 == wo) return 'Asia/Rangoon';
    if (420 == so && 360 == wo) return 'Asia/Almaty';
    if (420 == so && 420 == wo) return 'Asia/Bangkok';
    if (480 == so && 420 == wo) return 'Asia/Krasnoyarsk';
    if (480 == so && 480 == wo) return 'Australia/Perth';
    if (540 == so && 480 == wo) return 'Asia/Irkutsk';
    if (540 == so && 540 == wo) return 'Asia/Tokyo';
    if (570 == so && 570 == wo) return 'Australia/Darwin';
    if (570 == so && 630 == wo) return 'Australia/Adelaide';
    if (600 == so && 540 == wo) return 'Asia/Yakutsk';
    if (600 == so && 600 == wo) return 'Australia/Brisbane';
    if (600 == so && 660 == wo) return 'Australia/Sydney';
    if (630 == so && 660 == wo) return 'Australia/Lord_Howe';
    if (660 == so && 600 == wo) return 'Asia/Vladivostok';
    if (660 == so && 660 == wo) return 'Pacific/Guadalcanal';
    if (690 == so && 690 == wo) return 'Pacific/Norfolk';
    if (720 == so && 660 == wo) return 'Asia/Magadan';
    if (720 == so && 720 == wo) return 'Pacific/Fiji';
    if (720 == so && 780 == wo) return 'Pacific/Auckland';
    if (765 == so && 825 == wo) return 'Pacific/Chatham';
    if (780 == so && 780 == wo) return 'Pacific/Enderbury'
    if (840 == so && 840 == wo) return 'Pacific/Kiritimati';
    return 'US/Pacific';
}
self.addEventListener('notificationclick', async function(e) {
    console.log('click');
});

//https://c7cbd2ca.ngrok.io/prueba
/*

  data = token;    
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/prueba",
    "method": "POST",
    "mode":"no-cors",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache"
    },
    "data": {
      "apiKey": token
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

messaging.onMessage(function(payload) {
console.log('Message received. ', payload);
console.log('icono received. '  , payload.data.icon);
console.log('url received. '    , payload.data.contents);
console.log('body received. '   , payload.notification.body);
console.log('titulo received. ' , payload.notification.title);
// ...
});
*/

/*
var connection = createObXMLHttpReq();
// Preparando la función de respuesta
connection.onreadystatechange = response(connection);

var param = "Esto es una prueba AJAX sin jQuery";

// Realizando la petición HTTP con método POST
connection.open('POST', 'https://dc54375a.ngrok.io/click');
connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
connection.send(`param= ${param}`);

////////////////////////////////////////////////////
//funcion que crea el objeto para conexiones ajax///
////////////////////////////////////////////////////
function createObXMLHttpReq(){
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
}else if(window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (e){}
}else{
  console.log("No ha sido posible crear una instancia de XMLHttpRequest");
}
return xhr;
}

function response(connection) {
if(connection.readyState == 4) {
  alert(connection.responseText);
}
}*/