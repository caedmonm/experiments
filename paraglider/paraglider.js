var g;
var gliderWidth = 20;
var gliderHeight = 5;
var altitude = 1;
var altitudeMax = 1; // 
var vMax = 3;
var turnSpeed = 5;

function setup(){
	angleMode(DEGREES);
	createCanvas(600,500);
	frameRate(60);
	g = new glider;
}

function draw(){
	background("rgba(255,20,255,1)");
	g.update();
	g.show();
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

function glider(){
	this.angle = 0;
	this.x = Math.random()*width;
	this.y = Math.random()*height;

	this.update = function(){

		if(this.angle>360){
			this.angle = 0;
		} else if(this.angle<0){
			this.angle = 360;
		}

	}

	this.show = function(){
		fill(50);
		translate(this.x, this.y); 
		rotate(this.angle);
		ellipse(0,0,(gliderWidth*altitude),(gliderHeight*altitude));
	}
}