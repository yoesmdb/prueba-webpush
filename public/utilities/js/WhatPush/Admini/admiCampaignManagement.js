$(document).ready(() => {
    loadInitialsTableToAprobed();
    loadInitialsTableAprobed();
    loadInitialsTableReyected();
});

let globalidCcampaign = 0;
let globalJsonCA;
let globalJsonCApproved;
let globalJsonCRejected;


function loadInitialsTableToAprobed() {
    let params = { DATA1: 0 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCampaignByAprobed",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        $('#detaiCA').empty();
        var table = $('#tableTiers').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var cName = '<td>' + val.DATA2 + '</td>';
            var tBala = '<td>' + val.DATA11 + '</td>';
            var dBala = '<td>' + val.DATA12 + '</td>';
            var dUser = `<td> ${val.DATA21} ${val.DATA22}</td>`;
            var opcions = '<td> ' +
                `<a onclick="showDetailSeting(${val.DATA1});" data-toggle="modal" class="label label-success btncur" style="cursor:pointer">Detail</a>` +
                '</td>';

            var detailCA = "<tr>" + cName + tBala + dBala + dUser + opcions + "</tr>";
            $('#detaiCA').append(detailCA);
        });

        if (response != null && response != undefined) {
            globalJsonCA = response;
        }
        $('#tableCA').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
}


function showDetailSeting(DATA1) {
    globalidCcampaign = DATA1;

    let params = { DATA1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCampaignByID",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        document.getElementById("txt_showNameCamp").value = response[0].DATA2;
        document.getElementById("txt_showtittleCamp").value = response[0].DATA4;
        document.getElementById("txt_showContentCamp").value = response[0].DATA5;
        document.getElementById("txt_showUrlCamp").value = response[0].DATA6;
        document.getElementById("txt_showCountryCamp").value = response[0].DATA8;
        document.getElementById("txt_showTopicCamp").value = response[0].DATA17;
        document.getElementById("txt_showUserCamp").value = `${response[0].DATA21} ${response[0].DATA22}`;
        document.getElementById("txt_showCompanyCamp").value = response[0].DATA23;
        document.getElementById("txt_showObsebationscamp").value = response[0].DATA24;
        $('#modalSetCampaign').modal({ backdrop: 'static', keyboard: false });
    });
}


function AprovRejecCampaign(option) {

    if (globalidCcampaign != 0) {

        var observ = document.getElementById('txt_showObsebationscamp').value;

        let params = { DATA1: globalidCcampaign, DATA2: option, DATA3: observ };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/updaAproReject",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            if (response.status == 202 && response.result == 'OK') {
                successMessage('Campaign update successfully.', 5000);
                $('#modalSetCampaign').modal('toggle');
                loadInitialsTableToAprobed();
                if (option == 1)
                    loadInitialsTableAprobed();
                if (option == 2)
                    loadInitialsTableReyected();
            }
        });
    }
}


function loadInitialsTableAprobed() {
    let params = { DATA1: 1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCampaignByAprobed",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        $('#detailCApproved').empty();
        var table = $('#tableCApproved').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var cName = '<td>' + val.DATA2 + '</td>';
            var tBala = '<td>' + val.DATA11 + '</td>';
            var dBala = '<td>' + val.DATA12 + '</td>';
            var dUser = `<td> ${val.DATA21} ${val.DATA22}</td>`;
            //var opcions = '<td> ' +
            //    `<a onclick="showDetailTiers(${val.DATA1});" data-toggle="modal" class="label label-success btncur" style="cursor:pointer">Detail</a>` +
            //    '</td>';

            var detailCApproved = "<tr>" + cName + tBala + dBala + dUser + "</tr>"; //opcions +
            $('#detailCApproved').append(detailCApproved);
        });

        if (response != null && response != undefined) {
            globalJsonCApproved = response;
        }
        $('#tableCApproved').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
}


function loadInitialsTableReyected() {
    let params = { DATA1: 2 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getCampaignByAprobed",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        $('#detailCRejected').empty();
        var table = $('#tableCRejected').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {


            var cName = '<td>' + val.DATA2 + '</td>';
            var tBala = '<td>' + val.DATA11 + '</td>';
            var dBala = '<td>' + val.DATA12 + '</td>';
            var dUser = `<td> ${val.DATA21} ${val.DATA22}</td>`;
            //var opcions = '<td> ' +
            //    `<a onclick="showDetailTiers(${val.DATA1});" data-toggle="modal" class="label label-success btncur" style="cursor:pointer">Detail</a>` +
            //    '</td>';

            var detailCRejected = "<tr>" + cName + tBala + dBala + dUser + "</tr>"; //opcions +
            $('#detailCRejected').append(detailCRejected);
        });

        if (response != null && response != undefined) {
            globalJsonCRejected = response;
        }
        $('#tableCRejected').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });
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