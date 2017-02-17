var cols = 50;
var rows = 50;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];
var noSolution = false;

var settings = {};
settings.diags = false;

function removeFromArray(arr,elm){
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] == elm){
			arr.splice(i, 1);
		}
	}
}

function hueristic(a,b){
	// var d = dist(a.i, a.j, b.b, b.j);
	var d = abs(a.i-b.i) + abs(a.j-b.j);
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
	if(Math.random()<.33){
		this.wall = true;
	}

	this.show = function(col){
		fill(col);
		if(this.wall){
			fill(0);
		}
		noStroke();
		rect(this.i*w, this.j*h, w-1, h-1);
	}
	this.addNeighbors = function(grid){
		var ti = this.i;
		var tj = this.j;

		if(ti<cols-1){
			this.neighbors.push(grid[ti+1][tj]);
		}
		if(tj<rows-1){
			this.neighbors.push(grid[ti][tj+1]);
		}
		if(ti){
			this.neighbors.push(grid[ti-1][tj]);
		}
		if(tj){
			this.neighbors.push(grid[ti][tj-1]);
		}
		
		if(settings.diags){
			if(ti<cols-1 && tj<rows-1){
				this.neighbors.push(grid[ti+1][tj+1]);
			}
			if(ti<cols-1 && tj){
				this.neighbors.push(grid[ti+1][tj-1]);
			}
			if(ti && tj<rows-1){
				this.neighbors.push(grid[ti-1][tj+1]);
			}
			if(ti && tj){
				this.neighbors.push(grid[ti-1][tj-1]);
			}
		}

	}
}

function setup(){
	createCanvas(400,400);
  	background(0);
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
			if(!closedSet.includes(neighbor) && !neighbor.wall){
				var tempG = current.g + 1;    /// adding 1 as all gs are 1
				if(openSet.includes(neighbor)){
					if(tempG < neighbor.g){
						neighbor.g = tempG;
					}
				} else {
					neighbor.g = tempG;
					openSet.push(neighbor);
				}
				neighbor.h = hueristic(neighbor, end); 
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.previous = current;
			}
		}
 
	} else {
		console.log("no solution");
		noLoop();
		noSolution = true;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0,255,0));
	}

	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255,0,0));
	}

	if(!noSolution){
		var temp = current;
		path = [];
		path.push(temp);
		while(temp.previous){
			path.push(temp.previous);
			temp = temp.previous;
		}
	}
	for (var i = 0; i < path.length; i++) {
		path[i].show(color(0,0,255));
	}
}

