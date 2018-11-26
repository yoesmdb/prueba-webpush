$(document).ready(() => {
    loadInitialSelects();
});

document.getElementById("btn_register").addEventListener("click", sendNRegister);
document.getElementById("sel_tRegister").addEventListener("click", showCampCompany);


async function sendNRegister() {

    let val = validation();

    if (val) {
        let DATA1 = document.getElementById("sel_tRegister").value;
        let DATA2 = document.getElementById("txt_firtsName1").value;
        let DATA3 = document.getElementById("txt_firtsName2").value;
        let DATA4 = document.getElementById("txt_yourCompany").value;
        let DATA5 = document.getElementById("sel_tPais").value;
        let DATA6 = document.getElementById("txt_personalEmail").value;
        let DATA7 = document.getElementById("txt_inputPass2").value;
        let DATA9 = document.getElementById("txt_phone").value;
        let DATA10 = document.getElementById("checkbox_acceptTerms").value;


        let container = {
            DATA1,
            DATA2,
            DATA3,
            DATA4,
            DATA5,
            DATA6,
            DATA7,
            DATA9,

        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/newRegister",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": container
        }

        $.ajax(settings).done(function(response) {
            clearFields();
        });
    }


}



let validation = () => {
    let DATA1 = document.getElementById("sel_tRegister").value;
    let DATA2 = document.getElementById("txt_firtsName1").value;
    let DATA3 = document.getElementById("txt_firtsName2").value;
    let DATA4 = document.getElementById("txt_yourCompany").value;
    let DATA5 = document.getElementById("sel_tPais").value;
    let DATA6 = document.getElementById("txt_personalEmail").value;
    let DATA7 = document.getElementById("txt_inputPass2").value;
    let DATA8 = document.getElementById("txt_inputPass1").value;
    let DATA9 = document.getElementById("txt_phone").value;
    let DATA10 = document.getElementById("checkbox_acceptTerms").checked;



    if (DATA1 == 'EDITOR') {
        DATA4 = 'NONE';
    }

    let ret = false;
    if (DATA7 == DATA8 && DATA1 != 'SELECT' && DATA2 != '' && DATA3 != '' && DATA4 != '' && DATA5 != 'SELECT' && DATA6 != '' && DATA8 != '' && DATA9 != '' && DATA10) {
        successMessage('Saved data with successes.', 5000);
        ret = true;

    } else {
        ret = false;

        if (DATA1 == 'SELECT') {
            warningMessage('Please select a type of user.', 5000)
        } else if (DATA2 == '') {
            warningMessage('Please enter the name.', 5000)
        } else if (DATA3 == '') {
            warningMessage('Please enter the lastname.', 5000)
        } else if (DATA4 == '') {
            warningMessage('Please enter a company.', 5000)
        } else if (DATA5 == 'SELECT') {
            warningMessage('Please select a country.', 5000)
        } else if (DATA9 == '') {
            warningMessage('Please enter a phone.', 5000)
        } else if (DATA6 == '') {
            warningMessage('Please enter a email.', 5000)
        } else if (DATA7 == '') {
            warningMessage('Please confirm a password.', 5000)
        } else if (DATA8 == '') {
            warningMessage('Please enter a password.', 5000)
        } else if (DATA7 != DATA8) {
            warningMessage('Different passwords.', 5000)
        } else if (!DATA10) {
            warningMessage('Accept terms and conditions.', 5000)
        }


    }
    return ret;
}


let clearFields = () => {
    document.getElementById("sel_tRegister").value = "SELECT";
    document.getElementById("txt_firtsName1").value = "";
    document.getElementById("txt_firtsName2").value = "";
    document.getElementById("txt_yourCompany").value = "";
    document.getElementById("sel_tPais").value = "SELECT";
    document.getElementById("txt_phone").value = "";
    document.getElementById("txt_personalEmail").value = "";
    document.getElementById("txt_inputPass1").value = "";
    document.getElementById("txt_inputPass2").value = "";
    document.getElementById("checkbox_acceptTerms").checked = false;
}


function showCampCompany() {
    let valType = document.getElementById("sel_tRegister").value;

    if (valType == 'SELECT' || valType == 'EDITOR') {
        document.getElementById("div_tittleYourCompany").style.display = "none";
        //      document.getElementById("div_fieldYourCompany").style.display = "none";
    } else {
        document.getElementById("div_tittleYourCompany").style.display = "block";
        // document.getElementById("div_fieldYourCompany").style.display = "block";
    }
}



async function loadInitialSelects() {

    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCountries",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        var select = document.getElementById("sel_tPais");

        while (select.options.length > 0) {
            select.remove(0);
        }

        var option = document.createElement('option');
        option.value = "SELECT";
        option.text = "-- select --";
        select.add(option);

        $.each(response, function(index, val) {
            var option = document.createElement('option');
            option.value = val.DATA1;
            option.text = val.DATA2;
            select.add(option);
        });
    });
}

function successMessage(message, timelime) {
    let mensaje =
        '<div class="alert alert-success alert-dismissible fade in" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">×</span>' +
        '</button>' +
        '<h4>' +
        '<i class="icon-ok-sign"></i> Success!' +
        '</h4>' +
        '<p >' + message + '</p>' +
        '</div>';

    $('#notificacion').html(mensaje);

    setTimeout(() => {
        let mensaje =
            '<div class="alert alert-success alert-dismissible fade out" role="alert">' +
            '</div>';

        $('#notificacion').html(mensaje);

    }, timelime);

}

function warningMessage(message, timelime) {
    let mensaje =
        '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">×</span>' +
        '</button>' +
        '<h4>' +
        '<i class="icon-ok-sign"></i> Success!' +
        '</h4>' +
        '<p >' + message + '</p>' +
        '</div>';

    $('#notificacion').html(mensaje);

    setTimeout(() => {
        let mensaje =
            '<div class="alert alert-success alert-dismissible fade out" role="alert">' +
            '</div>';

        $('#notificacion').html(mensaje);

    }, timelime);

}