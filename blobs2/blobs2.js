var g = [];
var g_count = 1000;
var changeX = 0;
var changeY = 0;
var vChange = .1;
var sclMax = 10;
var vMax = 5;
var bounceFriction = .5;

function setup(){
	createCanvas(600,500);
	frameRate(60);
	for (var i = 0; i < g_count; i++) {
		g[i] = new glider;
	}
}

function draw(){
	background("rgba(255,255,255,.6)");
	for (var i = 0; i < g.length; i++) {
		g[i].update();
		g[i].show();
	}
} 

function keyPressed(){
	if(keyCode === UP_ARROW){
		changeX = 0;
		changeY -= vChange;
	} else if(keyCode === DOWN_ARROW){
		changeX = 0;
		changeY += vChange;
	} else if(keyCode === LEFT_ARROW){
		changeX -= vChange;
		changeY = 0;
	} else if(keyCode === RIGHT_ARROW){
		changeX += vChange;
		changeY = 0;
	}
}

function glider(){
	this.scl = Math.random()* sclMax;
	this.x = Math.random()*width;
	this.y = Math.random()*height;
	this.xSpeed = (Math.random()*vMax - Math.random()*vMax) * (this.scl/sclMax);
	this.ySpeed = (Math.random()*vMax - Math.random()*vMax) * (this.scl/sclMax);

	this.update = function(){
		this.xSpeed += changeX;
		this.ySpeed += changeY;
		
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		if(this.x<0){
			this.x = 0;
			this.xSpeed = bounceFriction*-this.xSpeed;
		} else if(this.x>(width-this.scl)){
			this.x = width-this.scl;
			this.xSpeed = bounceFriction*-this.xSpeed;
		}

		if(this.y<0){
			this.y = 0;
			this.ySpeed = bounceFriction*-this.ySpeed;
		} else if(this.y>(height-this.scl)){
			this.y = height-this.scl;
			this.ySpeed = bounceFriction*-this.ySpeed;
		}
	}

	this.show = function(){
		fill(255);
		ellipse(this.x,this.y,this.scl,this.scl);
	}
}