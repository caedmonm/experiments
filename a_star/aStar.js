var cols = 500;
var rows = 500;
var scl = 8;
cols = Math.round(cols / scl);
rows = Math.round(rows / scl);
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];
var img;

var useDiags = true;
var wallProb = .2;
var useImg = false;

// var gpu = new GPU();

function removeFromArray(arr,elm){
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] == elm){
			arr.splice(i, 1);
		}
	}
}

function hueristic(a,b){
	if(useDiags){
		var d = dist(a.i, a.j, b.i, b.j);
	} else {
		var d = abs(a.i-b.i) + abs(a.j-b.j);
	}
	return d;
}

function node(i,j){
	this.f = 0; // cost of move to next node
	this.g = 0; // cost from beginning
	this.h = 0; // (hueristic) guess at cost to target
	this.i = i;
	this.j = j;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if(useImg){
		// var pos = (this.i*w) + ((this.j*h)*width);
		var x = this.i;
		var y = this.j;
		var loc = (x + y*img.width)*(4*scl);
		var c = img.pixels[loc];
		if(c==0){
			this.wall = true;
		}
	} else {
		if(Math.random()<wallProb){
			this.wall = true;
		}
	}

	this.show = function(col){
			if(this.wall){
				noStroke();
				fill(0);
				if(useImg){
					rect(this.i*w, this.j*h, w-1, h-1);
				} else {
					ellipse(this.i*w + w/2, this.j*h + h/2, w/2, h/2);
				}
			}
	}
	this.addNeighbors = function(grid){
		var ti = this.i;
		var tj = this.j;

		if(ti<cols-1){
			this.neighbors.push([1,grid[ti+1][tj]]);
		}
		if(tj<rows-1){
			this.neighbors.push([1,grid[ti][tj+1]]);
		}
		if(ti){
			this.neighbors.push([1,grid[ti-1][tj]]);
		}
		if(tj){
			this.neighbors.push([1,grid[ti][tj-1]]);
		}
		
		if(useDiags){
			if(ti<cols-1 && tj<rows-1){
				this.neighbors.push([1.4,grid[ti+1][tj+1]]);
			}
			if(ti<cols-1 && tj){
				this.neighbors.push([1.4,grid[ti+1][tj-1]]);
			}
			if(ti && tj<rows-1){
				this.neighbors.push([1.4,grid[ti-1][tj+1]]);
			}
			if(ti && tj){
				this.neighbors.push([1.4,grid[ti-1][tj-1]]);
			}
		}

	}
}

function preload() {
	if(useImg){
		img = loadImage("img.png");
	}
}

function setup(){
	// frameRate(10);
	createCanvas(500,500);

  	if(useImg){
	  	image(img, 0, 0, 500, 500);
	  	img.loadPixels();
	}

	w = width / cols;
	h = height / rows;

	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new node(i,j);
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols-1][rows-1];

	start.wall = false;
	end.wall = false;

	openSet.push(start);

	// console.log(grid);
}

function draw(){
	background("rgba(255,255,255,1)");
	if(openSet.length){
		// continue search
		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}
		var current = openSet[winner];

		if(current===end){
			// *********************** FINISH
			console.log("DONE!"); 
			noLoop();
		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];

			var newPath = false;
			if(!closedSet.includes(neighbor[1]) && !neighbor[1].wall){
				
				var tempG = current.g + neighbor[0];    /// adding 1 as all gs are 1

				if(openSet.includes(neighbor[1])){
					if(tempG < neighbor[1].g){
						// find new route
						newPath = true;
					}
				} else {
					// continue on current route
					newPath = true;
					openSet.push(neighbor[1]);
				}

				if(newPath){
					neighbor[1].g = tempG;
					neighbor[1].h = hueristic(neighbor[1], end); 
					neighbor[1].f = neighbor[1].g + neighbor[1].h;
					neighbor[1].previous = current;
				}
			}
		}
 
	} else {
		console.log("no solution");
		noLoop();
		return;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(255);
		}
	}

	for (var i = 0; i < openSet.length; i++) {
		// openSet[i].show(color(0,255,0));
	}

	for (var i = 0; i < closedSet.length; i++) {
		// closedSet[i].show(color(255,0,0));
	}

	
	var temp = current;
	path = [];
	path.push(temp);
	while(temp.previous){
		path.push(temp.previous);
		temp = temp.previous;
	}

	// fill(255,66,66);
	// ellipse(path[0].i*w, path[0].j*h, 10, 10);

	noFill();
	stroke(255,100,0);
	strokeWeight(5);
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].i*w + w/2, path[i].j*h + h/2);
	}
	endShape();
}

