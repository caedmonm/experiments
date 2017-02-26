
var canvas;
var ypos = 10000;
var xpos = 10000;
var xoff,yoff;
var posterise = 3;
var gpu = new GPU();
var w = 800;
var h = 400;
var inc = .03;
var v = [.01,.01];
var waterLevel = 75;
var snowLevel = 170;

function preload() {
}


function setup(){
	createCanvas(w, h);
	pixelDensity(1);
	loadPixels();
	
	incSlider = createSlider(6, 25, 10);
	incSlider.position(20, 10);

	postSlider = createSlider(0, 50, 0);
	postSlider.position(20, 25);

	waterSlider = createSlider(0, 255, 75);
	waterSlider.position(20, 40);

	snowSlider = createSlider(0, 255, 170);
	snowSlider.position(20, 55);
} 

function createMap(){
	yoff = ypos - (250*inc);
	for (var y = 0; y < height; y++) {
		xoff = xpos - (500*inc);
		for (var x = 0; x < width; x++) {
			var index = (x + y * width) * 4;
			var r = noise(xoff,yoff) * 255;
			if(posterise){
				r = Math.round(r / posterise);
				r *= posterise;
			}
			if(r<waterLevel){
				pixels[index] = 0;
				pixels[index + 1] = 0;
				pixels[index + 2] = 50;
				pixels[index + 3] = 255;
			}else if(r<120){
				pixels[index] = 0;
				pixels[index + 1] = r;
				pixels[index + 2] = 0;
				pixels[index + 3] = 255;
			} else if (r>snowLevel) {
				r = 255 - ((255-r)/2);
				pixels[index] = r;
				pixels[index + 1] = r;
				pixels[index + 2] = r;
				pixels[index + 3] = 255;
			} else {
				r -= 50;
				pixels[index] = r;
				pixels[index + 1] = r;
				pixels[index + 2] = r;
				pixels[index + 3] = 255;
			}
			
			xoff += inc;
		}
		yoff += inc;
	}

	xpos += v[0];
	ypos += v[1];
	updatePixels();
}


function draw(){
	inc = incSlider.value() / 1000;
	posterise = postSlider.value();
	waterLevel = waterSlider.value();
	snowLevel = snowSlider.value();
	createMap();
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

