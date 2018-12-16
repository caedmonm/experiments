var out = $("#chat");
var i = 0;
var msg = '';
var isJS = 0;


function newMsg(message){
    msg = message;
    i = 0;
    typeit();
}

function typeit(){
    if(i < msg.length){
        setTimeout(function(){
            const l = msg[i];
            out.val(out.val()+l);
            i++;
            typeit();
        }, 20);
    } else {
        out.val(out.val()+"\n> ");
    }
}

$(document).on("keydown", "#chat", function(e){
    if(e.keyCode==8){
        var p = out.getCursorPosition();
        var l = out.val()[p-3]+out.val()[p-2]+out.val()[p-1];
        if(l=="\n> "){
            return false;
        }
    } else if(e.keyCode == 13){
        var lines = out.val().split("\n");
        var code = lines[lines.length - 1].substr(2);
        if(isJS){
            eval(code);
        } else if(code=="JSOn"){
            isJS = 1;
            newMsg("Javascript evaluation is on.");
        } else if(code=="clear"){
            out.val('');
        }
        out.val(out.val()+"\n> ");
        return false;
    } else {
        console.log(e.keyCode);
    }
});


(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);



newMsg('> Hello. If you want to contact Caedmon please email him here: caedmon@bigpebbles.co.uk');