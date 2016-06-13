var mousex = 0, 
    mousey = 0;

var mouse = new Vector(0,0);
$("canvas").on("mousemove", function(event) {
    var parentOffset = $(this).offset();
    mousex = event.pageX - parentOffset.left;
    mousey = event.pageY - parentOffset.top;
    mouse.set(mousex,mousey);

});
$(function() {
    document.addEventListener('touchstart', function(e) {
        var parentOffset = $("canvas").offset();
        mousex = e.targetTouches[0].pageX - parentOffset.left;
        mousey = e.targetTouches[0].pageY - parentOffset.top;
    }, false);
    document.addEventListener('touchmove', function(e) {
        var parentOffset = $("canvas").offset();
        mousex = e.targetTouches[0].pageX - parentOffset.left;
        mousey = e.targetTouches[0].pageY - parentOffset.top;
        e.preventDefault();
    }, false);
});