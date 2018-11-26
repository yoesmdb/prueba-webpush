$(document).ready(() => {
    loadInitialSelects();
    loadInitialsTablesUrl();
});

let globalJsonPages;

document.getElementById("btn-confirm").addEventListener("click", addUrl);
document.getElementById("btn-downloadFile").addEventListener("click", downloadZip);
document.getElementById("btn-downloadFile-table").addEventListener("click", downloadZipModal);
document.getElementById("btn-copyText").addEventListener("click", copyText);
document.getElementById("btn-copyText-modal").addEventListener("click", copyTextModal);

async function addUrl() {

    let DATA1 = document.getElementById("inputUrl").value;
    let DATA2 = document.getElementById("sel_Topic").value;
    let DATA3 = document.getElementById("sel_Country").value;

    if (DATA1 == '') {

        warningMessage('You have not added the domain.', 5000);
        $('#panelScript').hide();

    } else if (DATA2 == 'SELECT') {

        warningMessage('You have not selected a topic.', 5000);
        $('#panelScript').hide();

    } else if (DATA3 == 'SELECT') {

        warningMessage('You have not selected a country.', 5000);
        $('#panelScript').hide();

    } else {

        let params = { DATA1, DATA2, DATA3 };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/addUrlEditor",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": params
        }

        $.ajax(settings).done(function(response) {
            loadInitialsTablesUrl();
            if (response.status == 202 && response.result == 'OK') {

                limpiarCampos();

                successMessage('Domain saved successfully.', 5000);

                $('#panelScript').show();

                $('#script-genered').empty();

                let contentScript =
                    `<span class="colorTagScript"> &lt;link </span><span class="colorTagScriptAtrrib">rel=</span><span class="colorTagScriptAtrribContent">"manifest"</span> <span class="colorTagScriptAtrrib">href=</span>` +
                    `<span class="colorTagScriptAtrribContent">"${response.DATA1}"</span><span class="colorTagScript">&gt;</span>
                <br>
                <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">type=</span><span class="colorTagScriptAtrribContent">"text/javascript"</span> <span class="colorTagScriptAtrrib">data-cfasync=</span>` +
                    `<span class="colorTagScriptAtrribContent">"false"</span><span class="colorTagScript">&gt;</span>
                <br>
                <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataPush =</span> <span class="colorTagScriptAtrribContent">{dataDomain: '${response.DATA2}'};</span>
                <br>
                <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataTopi =</span> <span class="colorTagScriptAtrribContent">['${response.DATA3}'];</span>
                <br>
                <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataCoun =</span> <span class="colorTagScriptAtrribContent">['${response.DATA4}'];</span>
                <br>
                <span class="colorTagScript">&lt;/script&gt;</span>
                <br>
                <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScriptAtrribContent">"https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js"</span>` +
                    `<span class="colorTagScript">&gt;</span><span class="colorTagScript">&lt;/script&gt;</span>
                <br>
                <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScriptAtrribContent">"https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js"</span>` +
                    `<span class="colorTagScript">&gt;</span><span class="colorTagScript">&lt;/script&gt;</span>
                <br>
                <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScript">&gt;</span><span class="colorTagScriptAtrribContent">"${response.DATA5}"</span><span class="colorTagScript">&lt;/script&gt;</span>`;

                $('#script-genered').append(contentScript);

            } else if (response.status == 202 && response.result == 'url is already added') {

                warningMessage('Domain is already added.', 5000);
                $('#panelScript').hide();

            } else if (response.status == 202 && response.result == 'bad url') {

                warningMessage('Please enter a valid domain', 5000);
                $('#panelScript').hide();

            }
        });
    }

}

function limpiarCampos() {
    document.getElementById("inputUrl").value = '';
    document.getElementById("sel_Topic").value = 'SELECT';
    document.getElementById("sel_Country").value = 'SELECT';
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
        var select = document.getElementById("sel_Topic");
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

async function loadInitialsTablesUrl() {
    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getDataEditors",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        //console.log(response);
        $('#detailUrls').empty();
        var table = $('#tableUrls').DataTable();
        table.clear().draw();
        table.destroy();

        $.each(response, function(index, val) {

            var str = val.DATA4;
            var resultStr = str.substring(0, 10);

            var url = '<td>' + val.DATA2 + '</td>';
            var country = '<td>' + val.DATA5 + '</td>';
            var dateAdmission = '<td>' + resultStr + '</td>';
            var topic = '<td>' + val.DATA6 + '</td>';
            var opcions = '<td> ' +
                '<a  href="#modalSuccess" data-toggle="modal" class="label label-primary" data-backdrop="false" >Edit</a>' +
                `<a onclick="showDetail(${val.DATA1});" data-toggle="modal" class="label label-success">Detail</a>` +
                '</td>';

            var detailUrls = "<tr>" + url + country + dateAdmission + topic + opcions + "</tr>";

            $('#detailUrls').append(detailUrls);

        });

        if (response != null && response != undefined) {
            globalJsonPages = response;
        }
        $('#tableUrls').DataTable({
            retrieve: true,
            "pageLength": 10,
            "bDestroy": true
        });
    });


}

function showDetail(DATA1) {

    let params = { DATA1 };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getDataEditorsId",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {

        let contentScriptModal =
            `<span class="colorTagScript"> &lt;link </span><span class="colorTagScriptAtrrib">rel=</span><span class="colorTagScriptAtrribContent">"manifest"</span> <span class="colorTagScriptAtrrib">href=</span>` +
            `<span class="colorTagScriptAtrribContent">"${response.DATA1}"</span><span class="colorTagScript">&gt;</span>
    <br>
    <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">type=</span><span class="colorTagScriptAtrribContent">"text/javascript"</span> <span class="colorTagScriptAtrrib">data-cfasync=</span>` +
            `<span class="colorTagScriptAtrribContent">"false"</span><span class="colorTagScript">&gt;</span>
    <br>
    <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataPush =</span> <span class="colorTagScriptAtrribContent">{dataDomain: '${response.DATA2}'};</span>
    <br>
    <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataTopi =</span> <span class="colorTagScriptAtrribContent">['${response.DATA3}'];</span>
    <br>
    <span class="colorTagScript">&nbsp;&nbsp;&nbsp;&nbsp;var</span> <span class="colorTagScriptAtrrib">dataCoun =</span> <span class="colorTagScriptAtrribContent">['${response.DATA4}'];</span>
    <br>
    <span class="colorTagScript">&lt;/script&gt;</span>
    <br>
    <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScriptAtrribContent">"https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js"</span>` +
            `<span class="colorTagScript">&gt;</span><span class="colorTagScript">&lt;/script&gt;</span>
    <br>
    <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScriptAtrribContent">"https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js"</span>` +
            `<span class="colorTagScript">&gt;</span><span class="colorTagScript">&lt;/script&gt;</span>
    <br>
    <span class="colorTagScript"> &lt;script</span> <span class="colorTagScriptAtrrib">src=</span><span class="colorTagScript">&gt;</span><span class="colorTagScriptAtrribContent">"${response.DATA5}"</span><span class="colorTagScript">&lt;/script&gt;</span>`;


        $('#panelScriptTable').show();

        $('#script-genered-table').empty();

        $('#script-genered-table').append(contentScriptModal);

        $('#modalDetail').modal({ backdrop: 'static', keyboard: false });

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

function downloadZip() {
    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getDataDownload",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        //console.log(response);
        let zip = new JSZip();
        //create manifest
        zip.file(response.DATA1,
            `{\n` +
            ` "name" : "${response.DATA4}",\n` +
            ` "gcm_sender_id" : "${response.DATA5}"\n` +
            `}`
        );
        //create sw
        zip.file(response.DATA6,
            `importScripts('${response.DATA2}');`
        );
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "whatpushFile.zip");
            });
    });

}


function downloadZipModal() {
    let params = {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getDataDownload",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": params
    }

    $.ajax(settings).done(function(response) {
        //console.log(response);
        let zip = new JSZip();
        //create manifest
        zip.file(response.DATA1,
            `{\n` +
            ` "name" : "${response.DATA4}",\n` +
            ` "gcm_sender_id" : "${response.DATA5}"\n` +
            `}`
        );
        //create sw
        zip.file(response.DATA6,
            `importScripts('${response.DATA2}');`
        );
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "whatpushFile.zip");
            });
    });
}


function copyText() {
    document.getElementById("script-genered").focus();
    document.execCommand('selectAll', false, null);
    let copySelected = document.execCommand('copy');
    copySelected ? copySelected : console.log('sorry, your browser doesn\'t support execCommand')
}


function copyTextModal() {
    document.getElementById("script-genered-table").focus();
    document.execCommand('selectAll', false, null);
    let copySelected = document.execCommand('copy');
    copySelected ? copySelected : console.log('sorry, your browser doesn\'t support execCommand')
}