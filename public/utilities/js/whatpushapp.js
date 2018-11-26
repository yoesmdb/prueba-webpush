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
        sendToken(token);
    })
    .catch(function(err) {
        console.log('ha ocurrido un error');
    });


async function sendToken(token) {
    var url = window.location;
    await fetch("http://localhost:3000/respNotification", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `apiKey=${token}&url=${url}`
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let info = data.body;
            console.log('The response is: ', info.url);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
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