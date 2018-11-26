document.getElementById("btn_newPass").addEventListener("click", sendNewpass);


async function sendNewpass() {
    let vali = validation();
    if (vali) {
        let DATA1 = document.getElementById("txt_uniqueNit").value;

        let container = {
            DATA1,
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/newPass",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": container
        }

        $.ajax(settings).done(function(response) {
            clearFields();
            console.log(response);
        });
    }
}

let validation = () => {
    let DATA1 = document.getElementById("txt_uniqueNit").value;

    let ret = false;
    if (DATA1 != '') {
        ret = true;
    } else {
        ret = false;
    }
    return ret;
}


let clearFields = () => {
    document.getElementById("txt_uniqueNit").value = '';
}