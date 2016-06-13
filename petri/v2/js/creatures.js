window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight*2;
    ctx.scale(2,2);
var    
    w = canvas.width/2;
    h = canvas.height/2;
    creatures = [],
    creatureIndex = 0,
    creatureCount = 200,
    frame = 0,
    vRand = .5,
    vCorrect = 1,
    vMax = 1,
    fMax = .03,
    specials = [{col:"#f00", DNA:'', id: 0},{col:"#00f", DNA:'', id: 1}];

function creature(x, y, special){
    this.color = "#fff";
    this.size = 1.5;
    this.life = 0;
    this.location = new Vector(x,y);
    this.velocity = new Vector(0, 0);
    this.index = creatureIndex;
    creatures[creatureIndex] = this;
    creatureIndex++;
    this.target = 2;
    this.mass = .3;
    this.length = this.mass * 10;
    this.base = this.length * .5;
    this.special = special;
    if(special.id != undefined){
        this.color = special.col;
    }

}

creature.prototype = {
    constructor: creature,
    update: function(){
        this.repel(75);
        this.move();
        this.boundaries();
        this.link(40,'#fff');
        this.life++;
    },
    draw: function(){
        this.update();
        
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.size, 0, this.size * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.boundaries();
    },
    move: function(){
        var target = this.meanLocation(70);
        var force = target.copy().sub(this.location)
        force.normalize();
        force.mul(fMax);
        force.add(this.seperate(20));
        force.add(this.align(20));
        // var force = new Vector(random(-.1,.1),random(-.1,.1));
        this.velocity.add(force).limit(vMax);
        this.location.add(this.velocity);
    },
    align: function(dist)
    {
        var sum = new Vector(0,0);
        var count = 0;
        var d = 0;
        for (var i in creatures)
        {
            if (creatures[i] != this && this.checkCompatible(creatures[i]))// && !this.world.creatures[i].special)
            {
                d = this.location.dist(creatures[i].location);
                if(d < dist){
                    sum.add(creatures[i].velocity);
                    count++;
                }
            }
        }   
        if (!count){
            return sum;
        }

        sum.div(count);
        sum.normalize();
        sum.mul(vMax);
        sum.sub(this.velocity).limit(vMax);

        return sum.limit(.01);
    },
    boundaries: function()
    {
        
        if(this.location.x>(w-10)){
            this.velocity.x -= vCorrect;
        } else if(this.location.x<10){
            this.velocity.x += vCorrect;
        }

        if(this.location.y>(h-10)){
            this.velocity.y -= vCorrect;
        } else if(this.location.y<10){
            this.velocity.y += vCorrect;
        }
        
    },

    link: function(dist,col){
        for (var i in creatures){
            if (creatures[i] != this && this.checkCompatible(creatures[i])){  
                if(this.location.dist(creatures[i].location) < dist){
                    ctx.beginPath();
                    ctx.moveTo(this.location.x,this.location.y);
                    ctx.lineTo(creatures[i].location.x, creatures[i].location.y);
                    ctx.strokeStyle = col;
                    ctx.lineWidth=.1;
                    ctx.stroke();
                }
            }
        }
    },
    seperate: function(dist){
        var sum = new Vector(0,0);
        var count = 0;
        var d = 0;
        for (var i in creatures){
            if (creatures[i] != this){  
                d = this.location.dist(creatures[i].location);
                if(d < dist){
                    var diff = this.location.copy().sub(creatures[i].location);
                    diff.normalize();
                    diff.div(d);
                    sum.add(diff);
                    count++;
                }
            }
        }
        if (!count){
            return sum;
        }

        sum.div(count);
        sum.normalize();
        sum.mul(vMax);
        sum.limit(fMax);
        return sum.mul(2);
    },
    repel: function(dist){
        var v = new Vector(0,0);
        var m = new Vector(mousex,mousey);
        var count = 0;
        var d = 0;
        if(!mousex && !mousey){ return v; }
        d = this.location.dist(m);
        if(d < dist){
            var diff = this.location.copy().sub(m);
            diff.normalize();
            diff.div(d);
            v.add(diff);
        }
        v.normalize();
        v.mul(vMax);
        v.limit(fMax);
        this.velocity.add(v.mul(50)); // -- this gives a gradual effect
        // this.location.add(v.mul(50)); // --- instant, cut the structure.
    },
    band: function(){
        for (var i in creatures){
            if (creatures[i] != this){  

            }
        }
    },
    meanLocation: function(dist){
        var mean = new Vector(0,0);
        var count = 0;
        for (var i in creatures)
        {
            if (creatures[i] != this && this.checkCompatible(creatures[i])){
                var d = this.location.dist(creatures[i].location);
                // if(i==1)console.log(d);
                if(d<dist){
                    mean.add(creatures[i].location);
                    count++;
                }
            }
        } 
        if(!count){
            return new Vector(random(w),random(h));
        }
        mean.div(count);
        // mean = creatures[Math.round(Math.random()*(creatureCount-1))].location;
        return mean;
    },
    checkCompatible(targ){
        if(targ.special.id != undefined && (this.special.id == undefined || this.special.id == targ.special.id) ){
            return true;
        }
        return false;
    }

};

// simple random number generator
function random(){
    var 
        min = arguments.length == 1 ? 0 : arguments[0],
        max = arguments.length == 1 ? arguments[0] : arguments[1];
    return Math.random() * (max - min) + min;
}

// set initial creature positions
for (var i = 0; i < creatureCount; i++) {
    var x = random(w);
    var y = random(h);
    var special = {};
    if(specials[i] != undefined){
        special = specials[i];
    }
    creatures.push(new creature(x, y, special));
}

// main animation loop
function animate(){
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0,0,w,h);
    for(var i in creatures){
        creatures[i].draw();
    }
    window.requestAnimationFrame(animate);
    ++frame;
}

// looop
setTimeout(function(){
    animate();
}, 1000);



