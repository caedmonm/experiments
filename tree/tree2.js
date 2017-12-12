var startTrunkWidth;
var cW = $(document).width();
var cH = $(document).height();
var fillCol = "rgb(0,0,0)";
var trees = [];
var wind;

// tree setups
// var treeCount = 6;
// var startWidth = 7;
// var startLength = 60;
// var decay_length = .8;
// var decay_width = .8;
// var min_width = 1;
// var min_length = 5;
// var singleBranchProb = .1; // 1 = all singles
//
//
// var treeCount = 6;
// var startWidth = 25;
// var startLength = 60;
// var decay_length = .85;
// var decay_width = .7;
// var min_length = 5;
// var min_width = .1;
// var singleBranchProb = .2; // 1 = all singles

var wind = 0;
var treeCount = 3;
var startWidth = 25;
var startLength = 60;
var decay_length = .85;
var decay_width = .7;
var min_length = 5;
var min_width = .1;
var singleBranchProb = .2; // 1 = all singles

function createTrees() {
  for (var i = 0; i < treeCount; i++) {
    trees.push({
      nodes: [{
        x: round((cW / (treeCount + 1)) * (i + 1)),
        y: cH,
        width: startWidth,
        length: round(startLength - (random(1) * (startLength / 10))),
        parent: 0,
        branches: 1, // number of branches should be 1 at start, then 2,
        sprouted: 0
      }]
    });
  }
}

function addNode(i) {
  var t = trees[i];
  var l = t.nodes.length
  for (var j = 0; j < l; j++) {
    var n = t.nodes[j]; // this node.
    if (n.length > min_length && n.width) {
      while (n.sprouted < n.branches) {
        var new_width = n.width * decay_width;
        if (new_width < min_width) {
          new_width = min_width;
        }
        var new_branches = 2;
        if (random(1) < singleBranchProb) {
          new_branches = 1;
        }
        var new_x = round(n.x + (random(2) * random(-n.length, n.length)));
        var new_y = round(n.y - random(n.length));
        if(n.width == startWidth){
          new_x = n.x + random(-n.length/10 , n.length/10);
          new_y = n.y - (n.length * random(.8, 1));
        }

        if(wind){
           new_x += random(0,wind);
        }

        t.nodes.push({
          x: new_x,
          y: new_y,
          length: n.length * decay_length,
          width: new_width,
          parent: j,
          branches: new_branches,
          sprouted: 0
        })
        n.sprouted++;
      }
    }
  }
}

function leaf(x,y,w,h){
  var scale = Math.random()+.5;
  if(scale>1){
    scale = 1;
  }
  fill(0,round(random(30,70)),0);
  ellipse(x, y, w*scale, h*scale);
}

function drawTree(i) {
  var t = trees[i];
  for (var i = 0; i < t.nodes.length; i++) {
    var n = t.nodes[i];
    if (n.parent > -1) {
      strokeWeight(n.width);
      // stroke(46,26,10);
      stroke(0);
      var x1 = n.x;
      var y1 = n.y;
      var x2 = t.nodes[n.parent].x;
      var y2 = t.nodes[n.parent].y;
      line(x1, y1, x2, y2);
      if(n.length<=min_length || n.width == min_width){
         leaf(x1,y1,2,4);
      }
    }
  }
}


function setup() {
  createTrees();
  frameRate(30);
  createCanvas(cW, cH);
}

function draw() {
  background(60);
  var fps = frameRate();
  fill(0);
  text("FPS: " + fps.toFixed(2), 100, 100);
  for (var i = 0; i < trees.length; i++) {
    addNode(i);
    drawTree(i);
  }

}
