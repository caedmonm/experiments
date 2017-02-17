var canvas = $("canvas")[0],
    ctx = canvas.getContext("2d"),
	scale = 2,
	cw = 600,
	ch = 400;

	$("canvas").css({width:cw, height:ch});
    canvas.width = cw*scale;
    canvas.height = ch*scale;
    ctx.scale(scale,scale);
	
	var w = canvas.width/scale,
    h = canvas.height/scale,
    creatures = [],
	frame = 0,
	DNA = [
		{
			x: Math.round(random(w)),
			y: Math.round(random(h)),
			size: 10,
			col: "#f00"
		},
		{
			x: random(w),
			y: random(h),
			size: 10,
			col: "#006"
		},
	];

// simple random number generator
function random(){
    var 
        min = arguments.length == 1 ? 0 : arguments[0],
        max = arguments.length == 1 ? arguments[0] : arguments[1];
    return Math.random() * (max - min) + min;
}

// main animation loop
function animate(){
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0,0,w,h);
    for(var i in creatures){
        creatures[i].animate();
    }
    window.requestAnimationFrame(animate);
    // if(frame % 10 === 0) report(frame); // report every 10 frames
    ++frame;
}



for (var i = 0; i < DNA.length; i++) {
	DNA[i].id = i;
	creatures.push(new creature(DNA[i]));
}

setTimeout(function(){
    animate();
}, 1000);
