var startTrunkWidth;
var cW = $(document).width();
var cH = $(document).height();
var fillCol = "rgb(0,0,0)";
var trees = [];
var treeCount = 1;
var wind = 0;
// tree setups
var startWidth = 7;
var startLength = 60;
var decay_length = .8;
var decay_width = .8;
var min_width = 1;
var min_length = 5;
var singleBranchProb = .1; // 1 = all singles
//
//
// var startWidth = 1;
// var startLength = 20;
// var decay_length = .95;
// var decay_width = .95;
// var min_length = 1;
// var min_width = .1;
// var singleBranchProb = .7; // 1 = all singles

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
        t.nodes.push({
          x: round(n.x + random(-n.length, n.length)),
          y: round(n.y - random(n.length)),
          length: n.length * decay_length,
          width: new_width,
          parent: j,
          branches: new_branches,
          // branches: 2,
          sprouted: 0
        })
        n.sprouted++;
      }
    }
  }
}

function drawTree(i) {
  var t = trees[i];
  for (var i = 0; i < t.nodes.length; i++) {
    var n = t.nodes[i];
    if (n.parent > -1) {
      strokeWeight(n.width);
      // var x1 = n.x + (wind * (startWidth - n.width));
      var x1 = n.x;
      var y1 = n.y;
      // var x2 = t.nodes[n.parent].x + (wind * (startWidth - n.width));
      var x2 = t.nodes[n.parent].x;
      var y2 = t.nodes[n.parent].y;
      line(x1, y1, x2, y2);
    }
  }
}


function setup() {
  createTrees();
  frameRate(30);
  createCanvas(cW, cH);
}

function draw() {
  wind = random(-.1, .1);
  background(255);
  var fps = frameRate();
  fill(0);
  text("FPS: " + fps.toFixed(2), 100, 100);
  for (var i = 0; i < trees.length; i++) {
    addNode(i);
    drawTree(i);
  }

}
