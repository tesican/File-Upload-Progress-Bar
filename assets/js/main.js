$(document).ready(function () {
    $('.uploadBtn').click(function () {
        var obj = $(this).data('obj');
        var file = document.getElementById(obj).files[0];
        var formdata = new FormData();
        formdata.append(obj, file);
        var ajax = new XMLHttpRequest();
        $('.progressOverlaybg').fadeIn();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", errorHandler, false);
        ajax.open("POST", "upload.php");
        ajax.send(formdata);
    });
});
function progressHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    $("#progress-bar").width(Math.round(percent) + '%');
    $("#status").html(Math.round(percent) + "% uploaded... please wait");
}
function completeHandler(event) {
    $("#status").html(event.target.responseText);
    setTimeout(function () {
        $('.progressOverlaybg').fadeOut()
    }, 1000);
}
function errorHandler(event) {
    $("#status").html("Upload Failed");
}