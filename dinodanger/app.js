var kid, dino;

function preload() {
    kid = loadAnimation('imgs/boy1.png');
    dino = loadAnimation('imgs/dino1.png');
}

function setup() {
  createCanvas(800, 300);
}

function draw() {
  background(255, 255, 255);

  //specify the animation instance and its x,y position
  //animation() will update the animation frame as well
  animation(kid, 150, 100);
  animation(asterisk, 100, 100);
}