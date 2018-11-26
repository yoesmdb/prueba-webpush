$(document).ready(() => {
    loadInitialSelects();
});


document.getElementById('txt_pushtitle').addEventListener("keyup", showTittle);
document.getElementById('txt_pushdescrip').addEventListener("keyup", showDescription);
document.getElementById('txt_urlPromo').addEventListener("keyup", showPromo);
document.getElementById('file-input-img').addEventListener("change", showImg);
//document.getElementById('brn_confirm').addEventListener("click", save);
document.getElementById('sel_Country').addEventListener("change", getTier);
document.getElementById('txt_totalBudget').addEventListener("keyup", calculateTotalClicks);
document.getElementById('txt_totalBudget').addEventListener("change", calculateTotalClicks);
document.getElementById('txt_dailyBudget').addEventListener("keyup", calculateDailyClicks);
document.getElementById('txt_dailyBudget').addEventListener("change", calculateDailyClicks);


function showTittle() {
    var tittle = document.getElementById('txt_pushtitle');
    if (tittle.value != "") {
        document.getElementById("h4PushTittle").innerHTML = tittle.value;
    } else {
        document.getElementById("h4PushTittle").innerHTML = 'Push title';
    }
}

function showDescription() {
    var description = document.getElementById('txt_pushdescrip');
    if (description.value != "") {
        document.getElementById("h4PushDescription").innerHTML = description.value;
    } else {
        document.getElementById("h4PushDescription").innerHTML = 'Push description';
    }
}

function showPromo() {
    var promo = document.getElementById('txt_urlPromo');
    if (promo.value != "") {
        document.getElementById("h4PushUrl").innerHTML = promo.value;
    } else {
        document.getElementById("h4PushUrl").innerHTML = 'https://example.com';
    }
}

let globalStateImage = false;

function showImg() {
    var input = document.getElementById('file-input-img');

    let uploadFile = input.files[0];
    if ((/\.(jpg|png|jpeg|JPG|PNG|JPEG)$/i).test(uploadFile.name)) {
        var img = new Image();
        img.onload = function() {
            if (this.width.toFixed(0) == 192 && this.height.toFixed(0) == 192) {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        jQuery('#imgShow').attr('src', e.target.result);
                        globalStateImage = true;
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            } else {
                document.getElementById("file-input-img").value = "";
                warningMessage('Please select a image with dimension 192 x 192.', 5000);
                globalStateImage = false;
            }
        };
        img.src = URL.createObjectURL(input.files[0]);
    } else {
        warningMessage('Please select a image with format jpg, png or jpeg.', 5000)
    }
}


async function loadInitialSelects() {

    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getTopics",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        var select = document.getElementById("sel_topic");
        while (select.options.length > 0) {
            select.remove(0);
        }

        var option = document.createElement('option');
        option.value = "SELECT";
        option.text = "-- Select --";
        select.add(option);

        $.each(response, function(index, val) {
            var option = document.createElement('option');
            option.value = val.DATA1;
            option.text = val.DATA2;
            select.add(option);
        });

    });


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

        var select = document.getElementById("sel_Country");

        while (select.options.length > 0) {
            select.remove(0);
        }

        var option = document.createElement('option');
        option.value = "SELECT";
        option.text = "-- Select --";
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

async function save() {
    await validation().then(response => {
        resVal = response;

        if (resVal) {
            let DATA1 = document.getElementById("txt_campaignName").value;
            let DATA2 = document.getElementById("txt_pushtitle").value;
            let DATA3 = document.getElementById("txt_pushdescrip").value;
            let DATA4 = document.getElementById("txt_urlPromo").value;
            let DATA5 = document.getElementById("file-input-img");
            //let DATA5 = $('#file-input-img').get(0).files;
            let DATA6 = document.getElementById("sel_Country").value;
            let DATA7 = document.getElementById("sel_topic").value;
            let DATA8 = parseInt(document.getElementById("txt_totalBudget").value);
            let DATA9 = parseInt(document.getElementById("txt_dailyBudget").value);
            let DATA10 = parseInt(document.getElementById("txt_dailyClicks").value);
            let DATA11 = parseInt(document.getElementById("txt_totalClicks").value);
            let DATA12 = parseInt(document.getElementById("val_CPC").value);

            let params = {
                DATA1: DATA1,
                DATA2: DATA2,
                DATA3: DATA3,
                DATA4: DATA4,
                DATA5: DATA5,
                DATA6: DATA6,
                DATA7: DATA7,
                DATA8: DATA8,
                DATA9: DATA9,
                DATA10: DATA10,
                DATA11: DATA11,
                DATA12: DATA12,
            };

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/saveCampaign",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                },
                "data": params
            }

            $.ajax(settings).done(function(response) {
                successMessage('Saved data with successes.', 5000);
                clearParams();
            });
        }
    });


}


let clearParams = () => {
    document.getElementById("txt_campaignName").value = '';
    document.getElementById("txt_pushtitle").value = '';
    document.getElementById("txt_pushdescrip").value = '';
    document.getElementById("txt_urlPromo").value = '';
    document.getElementById("file-input-img");
    document.getElementById("sel_Country").value = 'SELECT';
    document.getElementById("sel_topic").value = 'SELECT';
    document.getElementById("txt_totalBudget").value = 25;
    document.getElementById("txt_dailyBudget").value = 5;
    document.getElementById("txt_totalClicks").value = 0;
    document.getElementById("txt_dailyClicks").value = 0;
}



let validation = async() => {
    let DATA1 = document.getElementById("txt_campaignName").value;
    let DATA2 = document.getElementById("txt_pushtitle").value;
    let DATA3 = document.getElementById("txt_pushdescrip").value;
    let DATA4 = document.getElementById("txt_urlPromo").value;
    let DATA5 = document.getElementById("file-input-img");
    let DATA6 = document.getElementById("sel_Country").value;
    let DATA7 = document.getElementById("sel_topic").value;
    let DATA8 = parseInt(document.getElementById("txt_totalBudget").value);
    let DATA9 = parseInt(document.getElementById("txt_dailyBudget").value);
    let result = false;

    if (DATA5.files.length > 0) {
        let uploadFile = DATA5.files[0];

        if (DATA1 != '' && DATA2 != '' && DATA3 != '' && DATA4 != '' && globalStateImage && DATA6 != 'SELECT' && DATA7 != 'SELECT' && DATA8 >= 25 && DATA9 >= 5) {
            result = true;
        } else {
            result = false;
            if (DATA1 == '') {
                warningMessage('Please enter the campaign name.', 5000)
            } else if (DATA2 == '') {
                warningMessage('Please enter the push tittle.', 5000)
            } else if (DATA3 == '') {
                warningMessage('Please enter the push description.', 5000)
            } else if (DATA4 == '') {
                warningMessage('Please enter the url.', 5000)
            } else if (globalStateImage) {
                warningMessage('Please select a image with format jpg, png or jpeg.', 5000)
            }
        }
    } else {
        warningMessage('Please select a image with format jpg, png or jpeg.', 5000);
        result = false;
    }
    return result;
}


function getTier() {
    var DATA1 = document.getElementById('sel_Country').value;

    if (DATA1 != 'SELECT') {

        let params = { DATA1: DATA1, };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/tierByCountry",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            document.getElementById('val_CPC').value = response[0].DATA1;
            document.getElementById('VAL_CPM').value = response[0].DATA2;
            calculateTotalClicks();
            calculateDailyClicks();
        });
    } else {
        document.getElementById('val_CPC').value = 0;
        document.getElementById('VAL_CPM').value = 0;
        document.getElementById('txt_totalClicks').value = 0;
        document.getElementById('txt_dailyClicks').value = 0;
        document.getElementById('txt_totalBudget').value = 25;
        document.getElementById('txt_dailyBudget').value = 5;
    }
}


function calculateTotalClicks() {
    var DATA1 = document.getElementById('sel_Country').value;
    if (validateTotalBudget() && DATA1 != 'SELECT') {
        var totalB = document.getElementById('txt_totalBudget').value;
        var c_cpc = document.getElementById('val_CPC').value;
        var totalClicks = parseInt(totalB / c_cpc);
        document.getElementById('txt_totalClicks').value = totalClicks;
    } else {
        warningMessage('Please select a country.', 5000)
    }
}

function validateTotalBudget() {
    var totalB = document.getElementById('txt_totalBudget').value;
    if (totalB >= 25) {
        return true;
    } else {
        document.getElementById('txt_totalBudget').value = 25;
        return true
    }
}


function calculateDailyClicks() {
    var DATA1 = document.getElementById('sel_Country').value;
    if (validateDailyClicks() && DATA1 != 'SELECT') {
        var dailyC = document.getElementById('txt_dailyBudget').value;
        var c_cpc = document.getElementById('val_CPC').value;
        var totalClicks = parseInt(dailyC / c_cpc);
        document.getElementById('txt_dailyClicks').value = totalClicks;
    } else {
        warningMessage('Please select a country.', 5000)
    }
}

function validateDailyClicks() {
    var totalB = parseInt(document.getElementById('txt_totalBudget').value);
    var dailyC = parseInt(document.getElementById('txt_dailyBudget').value);
    if (dailyC >= 5 && dailyC <= totalB) {
        return true;
    } else {
        dailyC.value = 5;
        document.getElementById('txt_dailyBudget').value = 5;
        return true;
    }
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