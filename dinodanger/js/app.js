var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var platforms, player, landscape, poly;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('boy',
    'assets/boy.png',
    { frameWidth: 50, frameHeight: 100 }
  );
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 868, 'ground').setScale(20).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'boy');
  player.setScale(1,1);

  player.body.setGravityY(30)

  player.setBounce(0.2);
  //player.setCollideWorldBounds(true);
  // set bounds so the camera won't go outside the game world
  //this.cameras.main.setBounds(0, 0, 800, 600);
  // make the camera follow the player
  this.cameras.main.startFollow(player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');


  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 3 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'boy', frame: 4 }],
    frameRate: 10
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('boy', { start: 5, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(stars, landscape);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, landscape);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function collectStar (player, star)
{
    star.disableBody(true, true);
}

function update() {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.body.setVelocityX(100);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-350);
  }
}