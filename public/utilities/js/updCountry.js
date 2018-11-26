document.getElementById("btn_updCountry").addEventListener("click", sendNewpass);


async function sendNewpass() {

    let DATA1 = document.getElementById("txt_uniqueID").value;
    let DATA2 = document.getElementById("txt_countryName").value;
    let DATA3 = document.getElementById("txt_init").value;

    let container = {
        DATA1,
        DATA2,
        DATA3,
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/updaCountry",
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