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
$(document).on('click', '#btn-chat', function (e) {
    debugger;
    var message = $("#btn-input").val();
    var sentMessage = $(".msg_container:last-child").clone();
    $(sentMessage).find("p").text(message);
    $(sentMessage).removeClass("base_sent");
    $(sentMessage).removeClass("base_receive");
    $(sentMessage).addClass("base_sent");
    sentMessage.appendTo(".msg_container_base");
    $("#btn-input").val("");
    $.post("url", { data: message })
        .done(function (data) {
            debugger;
            var recievedMsg = $(".msg_container:last-child").clone();
            $(recievedMsg).find("p").text(data);
            $(recievedMsg).removeClass("base_sent");
            $(recievedMsg).removeClass("base_receive");
            $(recievedMsg).addClass("base_receive");
            recievedMsg.appendTo(".msg_container_base");
        });
    
    /*var size = $(".chat-window:last-child").css("margin-left");
    size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $("#chat_window_1").clone().appendTo(".container");
    clone.css("margin-left", size_total);*/
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $("#chat_window_1").remove();
});