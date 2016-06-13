window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    cw = 500,
    ch = 500,
    chartCanvas = $("#chart"),
    chart,
    scale = 2,
    pause = 0,
    roundReport = 0;
    
    $("#canvas").css({width:cw, height:ch, marginLeft: -(cw/2), marginTop: -(ch/2)});
    canvas.width = cw*scale;
    canvas.height = ch*scale;
    ctx.scale(scale,scale);
var    
    w = canvas.width/scale,
    h = canvas.height/scale,
    creatures = [],
    creatureCount = 100,
    frame = 0,
    vRand = .5,
    fMax = 1,
    DNAdefault = {col:"#fff", assimDist: 20, vMax: 1, targForce: .1, wins: 0},
    DNAs = [
        {col:"#f00", id: 0, assimDist: 40, vMax: 1, targForce: .1, wins: 0},    // red
        {col:"#00f", id: 1, assimDist: 40, vMax: 1, targForce: .1, wins: 0},    // blue
        {col:"#0f0", id: 2, assimDist: 40, vMax: 1, targForce: .1, wins: 0}     // green
    ],
    DNAmods = {},
    winners = [],
    round = 0,
    roundTimer = new Date().getTime();

    DNAmods.assimDist   = {max:70,  min:10,     varMax:2},
    DNAmods.vMax        = {max:5,   min:.1,     varMax:.2},
    DNAmods.targForce   = {max:2,   min:0,      varMax:.1};

function creature(x, y, dna){
    this.size = 1.5;
    this.life = 0;
    this.location = new Vector(x,y);
    this.velocity = new Vector(0, 0);
    this.tInd = new Vector(random(w),random(h));
    this.dna = dna;
    this.connectionTime = 0;
    this.assimTime = 500;
    if(dna.id != undefined){
        this.dna = dna;
        this.original = 1;
    } else {
        this.dna = DNAdefault
        this.original = 0;
    }
}

creature.prototype = {
    constructor: creature,
    update: function(){

        this.assimilateAndTarget();

        this.move();
        this.boundaries();
        this.repel(75);

        this.life++;
    },
    assimilateAndTarget: function(){
        
        var count = 0;
        var assim = 0;
        var target = new Vector(0,0);

        for (var i in creatures){
            d = this.location.dist(creatures[i].location);
            if (creatures[i] != this && this.checkCompatible(creatures[i]) && d < creatures[i].dna.assimDist){
                ++count;
            }
        }
        if(count){
            if(!this.connectionTime){
                this.connectionTime = new Date().getTime();
            }
            if(new Date().getTime() - this.connectionTime > 500){
                assim = 1;
            }
        }
        if(assim){
            this.link('#fff');
            var force = this.maintainGroup().limit(this.dna.targForce);
            var force2 = this.targetGroup().limit(this.dna.targForce/5);
            // group target
        } else {
            var force = this.targetInd().limit(this.dna.targForce);
        }
        // seperation force
        force.add(this.seperate(this.dna.assimDist/2));

        this.velocity.add(force).limit(this.dna.vMax);

    },
    draw: function(){
        this.update();
        
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.size, 0, this.size * Math.PI, false);
        ctx.fillStyle = this.dna.col;
        ctx.fill();
        this.boundaries();
    },
    move: function(){
        
        this.location.add(this.velocity);
    },
    
    boundaries: function()
    {
         var f = new Vector(0,0);
        var c = new Vector(w/2,h/2);
        var d = this.location.dist(c);
        if(d > (w/2) ){
            var diff = this.location.copy().sub(c);
            diff.normalize();
            diff.div(d);
            f.add(diff);
            f.normalize();
            f.mul(this.dna.vMax);
            f.limit(fMax);
            this.velocity.sub(f.mul(50));
        }
        
    },

    link: function(col){
        for (var i in creatures){
            if (creatures[i] != this && this.checkCompatible(creatures[i])){  
                if(this.location.dist(creatures[i].location) <= creatures[i].dna.assimDist){
                    ctx.beginPath();
                    ctx.moveTo(this.location.x,this.location.y);
                    ctx.lineTo(creatures[i].location.x, creatures[i].location.y);
                    ctx.strokeStyle = col;
                    ctx.lineWidth=.1;
                    ctx.stroke();
                    this.dna = creatures[i].dna;
                }
            }
        }
    },
    seperate: function(){
        var sum = new Vector(0,0);
        var count = 0;
        var d = 0;
        for (var i in creatures){
            if (creatures[i] != this){  
                d = this.location.dist(creatures[i].location);
                if(d < (creatures[i].dna.assimDist/2)){
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
        sum.mul(this.dna.vMax);
        sum.limit(this.dna.targForce);
        return sum.mul(5);
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
        v.mul(this.dna.vMax);
        v.limit(fMax);
        this.velocity.add(v.mul(50)); // -- this gives a gradual effect
        // this.location.add(v.mul(50)); // --- instant, cut the structure.
    },
    targetInd: function(){
        if(Math.round(random(100)) == 1 || !frame){
            var force = new Vector(random(-.1,.1), random(-.1,.1));
        } else {
            var force = new Vector(0,0);
        }
        return force;
    },
    maintainGroup: function(){
        var target = new Vector(0,0);
        var count = 0;
        for (var i in creatures)
        {
            if (creatures[i] != this && this.checkCompatible(creatures[i])){
                var d = this.location.dist(creatures[i].location);
                if(d<creatures[i].dna.assimDist){
                    target.add(creatures[i].location);
                    count++;
                }
            }
        }
        target.div(count);

        var force = target.copy().sub(this.location);
        force.normalize();
        force.mul(this.dna.targForce);

        return force;
    },
    targetGroup: function(){
        var force = new Vector(0,0);
        var count = 0;
        for (var i in creatures)
        {
            if (creatures[i] != this && this.checkCompatible(creatures[i])){
                var d = this.location.dist(creatures[i].location);
                if(d<creatures[i].dna.assimDist){
                    force.add(creatures[i].velocity);
                    count++;
                }
            }
        }
        force.div(count);

        return force;
    },
    checkCompatible(targ){
        if(targ.dna.id != undefined && (this.dna.id == undefined || this.dna.id == targ.dna.id)){
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

// main animation loop
function animate(){
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0,0,w,h);
    for(var i in creatures){
        creatures[i].draw();
    }
    if(!pause) window.requestAnimationFrame(animate);
    if(frame % 10 === 0) report(frame); // report every 10 frames
    ++frame;
}

function DNAmod(id){
    for (var i = 0; i < DNAs.length; i++) {
        if(i!=id){
            DNAs[i].wins = 0;
            DNAs[i].vMax = DNAs[id].vMax + random(0-DNAmods.vMax.varMax, DNAmods.vMax.varMax);
                if(DNAs[i].vMax > DNAmods.vMax.max){
                    DNAs[i].vMax = DNAmods.vMax.max;
                } else if(DNAs[i].vMax < DNAmods.vMax.min){
                    DNAs[i].vMax = DNAmods.vMax.min;
                }
            DNAs[i].assimDist = DNAs[id].assimDist + random(0-DNAmods.assimDist.varMax, DNAmods.assimDist.varMax);
                if(DNAs[i].assimDist > DNAmods.assimDist.max){
                    DNAs[i].assimDist = DNAmods.assimDist.max;
                } else if(DNAs[i].assimDist < DNAmods.assimDist.min){
                    DNAs[i].assimDist = DNAmods.assimDist.min;
                }
            DNAs[i].targForce = DNAs[id].targForce + random(0-DNAmods.targForce.varMax, DNAmods.targForce.varMax);
                if(DNAs[i].targForce > DNAmods.targForce.max){
                    DNAs[i].targForce = DNAmods.targForce.max;
                } else if(DNAs[i].targForce < DNAmods.targForce.min){
                    DNAs[i].targForce = DNAmods.targForce.min;
                }
        } else {
            DNAs[i].wins++;
        }
    }
}

function report(frame){
    var totals = [];
    var grandTotal = 0;
    for (var i = 0; i < creatures.length; i++) {
        if(totals[creatures[i].dna.id]!=undefined){
            totals[creatures[i].dna.id]++;
            ++grandTotal;
        } else if(creatures[i].dna.id!=undefined){
            totals[creatures[i].dna.id] = 1;
            ++grandTotal;
        }
    }
    if(creatureCount - grandTotal==0 && !roundReport){
        var winner = totals.indexOf(Math.max.apply(window,totals));
        nextRound(winner);
        frame = 0;
    }
    if(!frame){
        $("#report").html('');
        var html = "<div>";
            html += "<div>id</div><div>linkD</div><div>vMax</div><div>targF</div><div>wins</div><div>[count]</div>";
            html += "</div>";
             $("#report").append(html);
        for (var i = 0; i < DNAs.length; i++) {
            var html = "<div class='row' id='total_container_"+DNAs[i].id+"' style='color:"+DNAs[i].col+"'>";
            html += "<div>"+DNAs[i].id+"</div><div>"+round2(DNAs[i].assimDist)+"</div><div>"+round2(DNAs[i].vMax)+"</div><div>"+round2(DNAs[i].targForce)+"</div><div>"+DNAs[i].wins+"</div><div><span id='total_"+DNAs[i].id+"'>0</span></div>";
            html += "</div>";
             $("#report").append(html);
        }
        $("#report").append("<div class='row'><div>-</div><div>-</div><div>-</div><div>-</div><div>-</div><div><span id='total_free'>0</span></div></div>");
    }
    $("#report").find('div.row').sort(function(a, b) {
        return $(b).find("span").text() - $(a).find("span").text();
    }).appendTo($("#report"));
    $("#total_free").html(creatureCount - grandTotal);
    for (var i = 0; i < totals.length; i++) {
        if(totals[i]!=undefined){
            $("#total_"+i).html(totals[i]);
        }
    }
}

function nextRound(winner){
    roundReport = 1;
    var win = {};
    win.time = (new Date().getTime() - roundTimer) / 1000;
    win.round = round;
    win.winner = creatures[winner].dna;
    winners.push(win);
    updateChart();
    roundTimer = new Date().getTime();
    DNAmod(winner);
    for (var i = 0; i < creatures.length; i++) {
        creatures[i].connectionTime = 0;
        creatures[i].location.x = (random(w));
        creatures[i].location.y = (random(h));
        if(creatures[i].original){
            creatures[i].dna = DNAs[i];
        } else {
            creatures[i].dna = DNAdefault;
        }
    }
    roundReport = 0; 
}

function updateChart(){
    var d = {
    labels: [],
    datasets: [
            {
                label: "Round Time",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
            }
        ]
    }

    for (var i = 0; i < winners.length; i++) {
        d.labels.push(i);
        d.datasets[0].data.push(winners[i].time);
    }

    if(winners.length==1){
        $("#chart").show();
        chart = new Chart(chartCanvas, {
            type: 'line',
            data: d,
            options: {
                responsive: false
            }
        });
    } else {
        console.log(d.datasets[0].data);
        console.log(d.labels);
        chart.data.labels = d.labels; 
        chart.data.datasets[0].data = d.datasets[0].data; 
        chart.update();
    }

}

function round2(num){
    return Math.round(num * 100) / 100;
}

// set initial creature positions
for (var i = 0; i < creatureCount; i++) {
    var x = random(w);
    var y = random(h);
    var dna = {};
    if(DNAs[i] != undefined){
        dna = DNAs[i];
    }
    creatures.push(new creature(x, y, dna));
}

// run after pause;
setTimeout(function(){
    animate();
}, 1000);



