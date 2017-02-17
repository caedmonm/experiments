var cols = 100;
var rows = 100;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];
var img;

var useDiags = 1;
var wallProb = .3;
var useImg = 1;



function preload() {
	img = loadImage("img.png");
}

function setup(){
	createCanvas(500,500);
  	background(0);

	image(img, 0, 0, 500, 500);
	img.loadPixels();
	
}

function draw(){
	
}

