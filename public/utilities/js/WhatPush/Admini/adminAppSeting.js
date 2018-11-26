$(document).ready(() => {
    loadInitialSelects();
    loadInitialsTableTiers();
    loadInitialsTableCountries();
    loadInitialsTableTopics();
});

let globalJsonTers;
let globalJsonCoun;
let globalJsonTopi;
let globalidTierAc = 0;
let globalidCounAc = 0;
let globalidTopiAc = 0;


document.getElementById("btn_addTier").addEventListener("click", addTier);
document.getElementById("btn_addCountry").addEventListener("click", addCountry);
document.getElementById("btn_addTopic").addEventListener("click", addTopic);

function loadInitialsTableTiers() {
    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getTiers",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        $('#detailTiers').empty();
        var table = $('#tableTiers').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var tname = '<td>' + val.DATA2 + '</td>';
            var cpc = '<td>' + val.DATA3 + '</td>';
            var cpm = '<td>' + val.DATA4 + '</td>';
            var descrip = '<td>' + val.DATA5 + '</td>';
            var opcions = '<td> ' +
                `<a onclick="showDeleteTiers(${val.DATA1});" data-toggle="modal" class="label label-primary btncur" data-backdrop="false" style="cursor:pointer">Delete</a>` +
                `<a onclick="showDetailTiers(${val.DATA1});" data-toggle="modal" class="label label-success btncur" style="cursor:pointer">Detail</a>` +
                '</td>';

            var detailTiers = "<tr>" + tname + cpc + cpm + descrip + opcions + "</tr>";
            $('#detailTiers').append(detailTiers);
        });

        if (response != null && response != undefined) {
            globalJsonTers = response;
        }
        $('#tableTiers').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
}


function loadInitialsTableCountries() {
    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getAllCountries",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        $('#detailCountries').empty();
        var table = $('#tableCountry').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var Cname = '<td>' + val.DATA2 + '</td>';
            var initi = '<td>' + val.DATA3 + '</td>';
            var tname = '<td>' + val.DATA5 + '</td>';
            var opcions = '<td> ' +
                `<a onclick="showDeleteCountry(${val.DATA1});" data-toggle="modal" class="label label-primary" data-backdrop="false" style="cursor:pointer">Delete</a>` +
                `<a onclick="showDetailCountry(${val.DATA1});" data-toggle="modal" class="label label-success" style="cursor:pointer">Detail</a>` +
                '</td>';

            var detailTiers = "<tr>" + Cname + initi + tname + opcions + "</tr>";
            $('#detailCountries').append(detailTiers);
        });

        if (response != null && response != undefined) {
            globalJsonCoun = response;
        }
        $('#tableCountry').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
}


function loadInitialsTableTopics() {
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

        $('#detailTopics').empty();
        var table = $('#tableTopic').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var Cname = '<td>' + val.DATA2 + '</td>';
            var opcions = '<td> ' +
                `<a onclick="showDeleteTopic(${val.DATA1});" data-toggle="modal" class="label label-primary" data-backdrop="false" style="cursor:pointer">Delete</a>` +
                `<a onclick="showDetailTopic(${val.DATA1});" data-toggle="modal" class="label label-success" style="cursor:pointer">Detail</a>` +
                '</td>';

            var detailTiers = "<tr>" + Cname + opcions + "</tr>";
            $('#detailTopics').append(detailTiers);
        });

        if (response != null && response != undefined) {
            globalJsonTopi = response;
        }
        $('#tableTopic').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
}

function addTier() {

    let DATA1 = document.getElementById("txt_nameTiers").value;
    let DATA2 = parseFloat($("#num_cpc").val());
    let DATA3 = parseFloat($("#num_cpm").val());
    let DATA4 = document.getElementById("txt_nameDescription").value;

    if (DATA1 == '') {
        warningMessage('You have not added the name.', 5000);
    } else if (DATA2 == 0 || isNaN(DATA2)) {
        warningMessage('You have not added the CPC.', 5000);
    } else if (DATA3 == 0 || isNaN(DATA2)) {
        warningMessage('You have not added the CPM.', 5000);
    } else if (DATA4 == '') {
        warningMessage('You have not added the description.', 5000);
    } else if (DATA2 > DATA3) {
        warningMessage('Your cpc is greater than your cpm.', 5000);
    } else {
        let params = { DATA1, DATA2, DATA3, DATA4 };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/newTier",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Tier saved successfully.', 5000);
                loadInitialsTableTiers();
                limpiarCampos('tier');
            }
        });
    }
}


function addCountry() {

    let DATA1 = document.getElementById("txt_nameCountry").value;
    let DATA2 = document.getElementById("txt_initials").value;
    let DATA3 = document.getElementById("sel_tiers").value;

    if (DATA1 == '') {
        warningMessage('You have not added the name.', 5000);
    } else if (DATA2 == '') {
        warningMessage('You have not added the initials.', 5000);
    } else if (DATA3 == 'SELECT') {
        warningMessage('You have not selected a tier.', 5000);
    } else {
        let params = { DATA1, DATA2, DATA3 };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/newCountry",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Country saved successfully.', 5000);
                loadInitialsTableCountries();
                limpiarCampos('country');
            }
        });
    }
}



function addTopic() {

    let DATA1 = document.getElementById("txt_nameTopic").value;

    if (DATA1 == '') {
        warningMessage('You have not added the name topic.', 5000);
    } else {
        let params = { DATA1 };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/newTopic",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Topic saved successfully.', 5000);
                loadInitialsTableTopics();
                limpiarCampos('topic');
            }
        });
    }
}

function limpiarCampos(option) {
    if (option == 'tier') {
        document.getElementById("txt_nameTiers").value = '';
        document.getElementById("txt_nameDescription").value = '';
        document.getElementById("num_cpc").value = "0.01";
        document.getElementById("num_cpm").value = "0.02";
        document.getElementById("accordionTiers").click();
    } else if (option == 'UpTier') {
        document.getElementById("txt_showNameTiers").value = '';
        document.getElementById("txt_showNameDescription").value = '';
        document.getElementById("num_showCpc").value = "0.01";
        document.getElementById("num_showCpm").value = "0.02";
    } else if (option == 'country') {
        document.getElementById("txt_nameCountry").value = '';
        document.getElementById("txt_initials").value = '';
        document.getElementById("sel_tiers").value = "SELECT";
        document.getElementById("accordionCountry").click();
    } else if (option == 'UpCountry') {
        document.getElementById("txt_showNameCountry").value = '';
        document.getElementById("txt_showInitialsCountry").value = '';
        document.getElementById("sel_ShowtiersCountry").value = "SELECT";
    } else if (option == 'topic') {
        document.getElementById("txt_nameTopic").value = '';
        document.getElementById("accordionTopic").click();
    } else if (option == 'UpTopic') {
        document.getElementById("txt_showNameTopic").value = '';
    }
}




async function loadInitialSelects() {

    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getTiers",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        var select = document.getElementById("sel_tiers");

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
            option.text = `${val.DATA2} - CPC: ${val.DATA3} - CPM: ${val.DATA4}`;
            select.add(option);
        });

        ////////////////////////////////////////////////////        
        var select1 = document.getElementById("sel_ShowtiersCountry");

        while (select1.options.length > 0) {
            select1.remove(0);
        }

        var option1 = document.createElement('option');
        option1.value = "SELECT";
        option1.text = "-- Select --";
        select1.add(option1);


        $.each(response, function(index, val) {
            var option1 = document.createElement('option');
            option1.value = val.DATA1;
            option1.text = `${val.DATA2} - CPC: ${val.DATA3} - CPM: ${val.DATA4}`;
            select1.add(option1);
        });
    });
}


let tierEnabled = 0;
let counEnabled = 0;

function EnableDisable(option) {
    if (option == 'mTiers' && tierEnabled == 0) {
        document.getElementById("txt_showNameTiers").disabled = false;
        document.getElementById("txt_showNameDescription").disabled = false;
        document.getElementById("num_showCpc").disabled = false;
        document.getElementById("num_showCpm").disabled = false;
        $("#btnEnableDisable").text('Disable');
        document.getElementById("btn_updatetier").style.display = "block";
        tierEnabled = 1;
    } else if (option == 'mTiers' && tierEnabled == 1) {
        document.getElementById("txt_showNameTiers").disabled = true;
        document.getElementById("txt_showNameDescription").disabled = true;
        document.getElementById("num_showCpc").disabled = true;
        document.getElementById("num_showCpm").disabled = true;
        $("#btnEnableDisable").text('Enable');
        document.getElementById("btn_updatetier").style.display = "none";
        tierEnabled = 0;
    } else if (option == 'mCountry' && counEnabled == 0) {
        document.getElementById("txt_showNameCountry").disabled = false;
        document.getElementById("txt_showInitialsCountry").disabled = false;
        document.getElementById("sel_ShowtiersCountry").disabled = false;
        $("#btnEnableDisable1").text('Disable');
        document.getElementById("btn_updatecoun").style.display = "block";
        counEnabled = 1;

    } else if (option == 'mCountry' && counEnabled == 1) {
        document.getElementById("txt_showNameCountry").disabled = true;
        document.getElementById("txt_showInitialsCountry").disabled = true;
        document.getElementById("sel_ShowtiersCountry").disabled = true;
        $("#btnEnableDisable1").text('Enable');
        document.getElementById("btn_updatecoun").style.display = "none";
        counEnabled = 0;
    } else if (option == 'mTopic' && counEnabled == 0) {
        document.getElementById("txt_showNameTopic").disabled = false;
        document.getElementById("btn_updatetopi").style.display = "block";
        $("#btnEnableDisable2").text('Disable');
        counEnabled = 1;
    } else if (option == 'mTopic' && counEnabled == 1) {
        document.getElementById("txt_showNameTopic").disabled = true;
        $("#btnEnableDisable2").text('Enable');
        document.getElementById("btn_updatetopi").style.display = "none";
        counEnabled = 0;
    }
}




function showDeleteTiers(DATA1) {
    globalidTierAc = DATA1;
    $('#modalConfirmDeleteTier').modal({ backdrop: 'static', keyboard: false });
}


function showDeleteCountry(DATA1) {
    globalidCounAc = DATA1;
    $('#modalConfirmDeleteCountry').modal({ backdrop: 'static', keyboard: false });
}


function showDeleteTopic(DATA1) {
    globalidTopiAc = DATA1;
    $('#modalConfirmDeleteTopic').modal({ backdrop: 'static', keyboard: false });
}



function DeleteTiers() {
    if (globalidTierAc != 0) {
        let params = { DATA1: globalidTierAc };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/deletier",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Tier delete successfully.', 5000);
                loadInitialsTableTiers();
            }
        });
    }
}


function DeleteCountry() {
    if (globalidCounAc != 0) {
        let params = { DATA1: globalidCounAc };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/deleCountry",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Country delete successfully.', 5000);
                loadInitialsTableCountries();
            }
        });
    }
}


function DeleteTopic() {
    if (globalidTopiAc != 0) {
        let params = { DATA1: globalidTopiAc };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/deleTopic",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Topic delete successfully.', 5000);
                loadInitialsTableTopics();
            }
        });
    }
}

function showDetailTiers(DATA1) {
    globalidTierAc = DATA1;

    let params = { DATA1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getTiersByID",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        document.getElementById("txt_showNameTiers").value = response[0].DATA2;
        document.getElementById("txt_showNameDescription").value = response[0].DATA5;
        document.getElementById("num_showCpc").value = response[0].DATA3;
        document.getElementById("num_showCpm").value = response[0].DATA4;
        $('#modalTier').modal({ backdrop: 'static', keyboard: false });
    });
}


function showDetailCountry(DATA1) {
    globalidCounAc = DATA1;

    let params = { DATA1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCountryByID",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        document.getElementById("txt_showNameCountry").value = response[0].DATA2;
        document.getElementById("txt_showInitialsCountry").value = response[0].DATA3;
        document.getElementById("sel_ShowtiersCountry").value = response[0].DATA4;
        $('#modalCountry').modal({ backdrop: 'static', keyboard: false });
    });
}



function showDetailTopic(DATA1) {
    globalidTopiAc = DATA1;

    let params = { DATA1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getTopicByID",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        document.getElementById("txt_showNameTopic").value = response[0].DATA2;
        $('#modalTopic').modal({ backdrop: 'static', keyboard: false });
    });
}



function updateTier() {
    var DATA1 = globalidTierAc;
    var DATA2 = document.getElementById("txt_showNameTiers").value;
    var DATA3 = document.getElementById("txt_showNameDescription").value;
    var DATA4 = document.getElementById("num_showCpc").value;
    var DATA5 = document.getElementById("num_showCpm").value;

    if (DATA1 == 0) {
        warningMessage('You have not added a correct tier.', 5000);
    } else if (DATA2 == '') {
        warningMessage('You have not added the name.', 5000);
    } else if (DATA3 == '') {
        warningMessage('You have not added the description.', 5000);
    } else if (DATA4 == 0 || isNaN(DATA4)) {
        warningMessage('You have not added the CPC.', 5000);
    } else if (DATA5 == 0 || isNaN(DATA5)) {
        warningMessage('You have not added the CPM.', 5000);
    } else if (DATA4 > DATA5) {
        warningMessage('Your cpc is greater than your cpm.', 5000);
    } else {
        let params = { DATA1, DATA2, DATA3, DATA4, DATA5 };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/updatier",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {

            if (response.status == 202 && response.result == 'OK') {
                successMessage('Tier updated successfully.', 5000);
                loadInitialsTableTiers();
                limpiarCampos('UpTier');
                $('#modalTier').modal('toggle');
                EnableDisable('mTiers');
                document.getElementById("btn_updatetier").style.display = "none";
            }
        });
    }
}



function updateCountry() {
    var DATA1 = globalidCounAc;
    var DATA2 = document.getElementById("txt_showNameCountry").value;
    var DATA3 = document.getElementById("txt_showInitialsCountry").value;
    var DATA4 = document.getElementById("sel_ShowtiersCountry").value;

    if (DATA1 == 0) {
        warningMessage('You have not added a correct country.', 5000);
    } else if (DATA2 == '') {
        warningMessage('You have not added the name.', 5000);
    } else if (DATA3 == '') {
        warningMessage('You have not added the initials.', 5000);
    } else if (DATA4 == 'SELECT') {
        warningMessage('You have not select the tier.', 5000);
    } else {
        let params = { DATA1, DATA2, DATA3, DATA4 };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/updaCountry",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {

            if (response.status == 202 && response.result == 'OK') {
                successMessage('Country updated successfully.', 5000);
                loadInitialsTableCountries();
                limpiarCampos('UpCountry');
                $('#modalCountry').modal('toggle');
                EnableDisable('mCountry');
                document.getElementById("btn_updatecoun").style.display = "none";
            }
        });
    }
}




function updateTopic() {
    var DATA1 = globalidTopiAc;
    var DATA2 = document.getElementById("txt_showNameTopic").value;

    if (DATA1 == 0) {
        warningMessage('You have not added a correct country.', 5000);
    } else if (DATA2 == '') {
        warningMessage('You have not added the name topic.', 5000);
    } else {
        let params = { DATA1, DATA2 };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/updaTopic",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {

            if (response.status == 202 && response.result == 'OK') {
                successMessage('Topic updated successfully.', 5000);
                loadInitialsTableTopics();
                limpiarCampos('UpTopic');
                $('#modalTopic').modal('toggle');
                EnableDisable('mTopic');
                document.getElementById("btn_updatetopi").style.display = "none";
            }
        });
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