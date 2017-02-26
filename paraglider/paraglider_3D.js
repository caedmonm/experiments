
var canvas;
var ypos = 10000;
var xpos = 10000;
var xoff,yoff;
var posterise = 3;
var w = 800;
var h = 400;
var inc = .03;
var v = [.01,.01];
var waterLevel = 75;
var snowLevel = 170;

function preload() {
}

function setup(){
	createCanvas(w, h, WEBGL);
	// ortho(-width, width, height, -height/2, 0.1, 100);
	// pixelDensity(1);
} 

function createMap(){
	// beginShape();

	yoff = ypos - (250*inc);
	for (var y = 0; y < height; y+=10) {
		xoff = xpos - (500*inc);
		for (var x = 0; x < width; x+=10) {
			var z = Math.round(noise(xoff,yoff) * 100);
			point(x,y,z);
			// console.log(x,y,z);
			xoff += inc;
		}
		yoff += inc;
	}
	xpos += v[0];
	ypos += v[1];
	// endShape();
}


function draw(){
	createMap();
	noLoop();
} 

function keyPressed(){
	if(keyCode === UP_ARROW){
		
	} else if(keyCode === DOWN_ARROW){
		
	} else if(keyCode === LEFT_ARROW){
		g.angle += turnSpeed;
	} else if(keyCode === RIGHT_ARROW){
		g.angle -= turnSpeed;
	}
}

