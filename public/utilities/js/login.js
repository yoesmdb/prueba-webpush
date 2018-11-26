document.getElementById("btn_login").addEventListener("click", login);


async function login() {
    let username = document.getElementById("inp_username").value;
    let password = document.getElementById("inp_pass").value;

    let params = { username, password };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
    });
}