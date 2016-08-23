// Configuration variable

const BASIC_URL = 'http://grimedetector-api.ttarnawski.usermd.net';

var vm_report;
var vm_languages;
var vm_checked;
var vm_grime;
var vm_text;

$(document).ready(function () {
    vm_report = $("#report");
    vm_languages = $("#status-languages");
    vm_checked = $("#status-checked");
    vm_grime = $("#status-grime");
    vm_text = $("#text");
    vm_report.hide();
    fetchData();
});

function fetchData() {
    $.getJSON(BASIC_URL+'/status', function (data) {
        vm_languages.html(data.languages);
        vm_checked.html(data.checked);
        vm_grime.html(data.grime);
    });
}

function check() {
    var data;
    var textValue = vm_text.val();

    if(textValue.length == 0 || textValue.length > 255) {
        return false;
    }

    data = {
        text: textValue,
        correct: true
    };

    $.post( BASIC_URL+'/check', JSON.stringify(data))
        .done(function( response ) {
            $("#form").hide();
            vm_report.html('<h2>STATUS: ' + response.STATUS+'</h2>');
            vm_report.show();
            console.log(response);
        })
        .fail(function( response ) {
            console.log(response);
        });
}