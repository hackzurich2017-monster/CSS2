﻿var sendReceiveMsg = function () {
    var message = $("#btn-input").val();
    var sentMessage = $($(".msg_container.base_sent")[0]).clone();
    $(sentMessage).find("p").text(message);
    sentMessage.appendTo(".msg_container_base");
    $("#btn-input").val("");
    $(".msg_container_base").scrollTop($(".msg_container_base").height() + 1000);
    $.post("../api/values", { "": message })
        .done(function (data) {
            var recievedMsg = $($(".msg_container.base_receive")[0]).clone();
            $(recievedMsg).find("p").text(data);
            recievedMsg.appendTo(".msg_container_base");
            $(".msg_container_base").scrollTop($(".msg_container_base").height() + 1000);
        });
}

$(document).on('keypress', function (e) {
    if (e.which === 13) {
        sendReceiveMsg();
    }
});

$(document).on('click', '#btn-chat', function (e) {
    sendReceiveMsg();
});

$('#fileupload').fileupload({
    dataType: 'json',
    replaceFileInput: false,
    add: function (e, data) {
        data.context = $('<p/>').text('Uploading...').appendTo(document.body);
        /*data.submit();*/
    },
    done: function (e, data) {
        $.each(data.result.files, function (index, file) {
            $('<p/>').text(file.name).appendTo(document.body);
        });
        data.context.text('Upload finished.');
    }
});

