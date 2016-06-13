var mousex = 0, 
    mousey = 0;


$(document).on("mousemove", function(event) {
    mousex = event.pageX;
    mousey = event.pageY;
});
$(function() {
    function updateMouse(x, y) {
        
    }
    document.addEventListener('touchstart', function(e) {
        mousex = e.targetTouches[0].pageX;
        mousey = e.targetTouches[0].pageY;
    }, false);

    document.addEventListener('touchmove', function(e) {
        mousex = e.targetTouches[0].pageX;
        mousey = e.targetTouches[0].pageY;
        e.preventDefault();
    }, false);
});