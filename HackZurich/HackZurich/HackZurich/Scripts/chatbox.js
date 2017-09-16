debugger;
$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});

var sendReceiveMsg = function () {
    debugger;
    var message = $("#btn-input").val();
    var sentMessage = $($(".msg_container.base_sent")[0]).clone();
    $(sentMessage).find("p").text(message);
    sentMessage.appendTo(".msg_container_base");
    $("#btn-input").val("");
    (".msg_container_base").scrollTop($(".msg_container_base").height() + 500);
    $.post("api/values", { "": message })
        .done(function (data) {
            debugger;
            //var recievedMsg = $(".msg_container:last-child").clone();
            var recievedMsg = $($(".msg_container.base_receive")[0]).clone();
            $(recievedMsg).find("p").text(data);
            recievedMsg.appendTo(".msg_container_base");
            $(".msg_container_base").scrollTop($(".msg_container_base").height() + 500);
        });
    /*$.ajax({
        method: "POST",
        url: "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/acceffd4-cce1-486f-ab0c-42455d31b86d/message?version=2017-05-26",
        contentType: "application/json",
        data: JSON.stringify({ text: message, name: 'NAO' })
        .done(function (data) {
            debugger;
            var recievedMsg = $($(".msg_container.base_receive")[0]).clone();
            $(recievedMsg).find("p").text(data);
            recievedMsg.appendTo(".msg_container_base");
        })
    });*/
}

$(document).on('keypress', function (e) {
    if (e.which === 13) {
        sendReceiveMsg();
    }
});

$(document).on('click', '#btn-chat', function (e) {
    sendReceiveMsg();
});

$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $("#chat_window_1").remove();
});