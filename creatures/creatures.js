function creature(DNA){
	this.dna = DNA;
	this.p = [DNA.x,DNA.y];
	this.v = [0,0];
	this.animate = function(){
		this.move();
		this.draw();
	}
	this.move = function(){
		this.p[0] += this.v[0];
		this.p[1] += this.v[1];
	}
	this.draw = function(){
		ctx.beginPath();
        ctx.arc(this.p[0], this.p[1], this.dna.size, 0, this.dna.size * Math.PI, false);
        ctx.fillStyle = this.dna.col;
        ctx.fill();
	}
}