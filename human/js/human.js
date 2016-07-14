var human = {
	isHuman: {
		trueFalse: false,
		why: "initial_state"
	},
	movement: 0,
	timePageLoaded: Date.now(),
	timeOnSite: 0,
	clicks: 0,
	scrolled: 0,
	humanMoved: function(){
		this.movement++;
		console.log("moved: "+this.movement);
	},
	getTimeOnSite: function(){
		this.timeOnSite = Date.now() - this.timePageLoaded;
		console.log("time: "+this.timeOnSite);
	},
	humanClicked: function(){
		this.clicks++;
		console.log("clicked: "+this.clicks);
	},
	humanScrolled: function(){
		this.scrolled++;
		console.log("scrolled: "+this.scrolled);
	},
	determineHumanity: function(){
		this.getTimeOnSite();

		if(this.timeOnSite<500){
			this.isHuman.trueFalse = false;
			this.isHuman.why = "too quick";
			return this.isHuman;
		}

		if(!this.movement){
			this.isHuman.trueFalse = false;
			this.isHuman.why = "no movement";
			return this.isHuman;
		}



	}
}

$(document).on("mousemove", function(e){
	human.humanMoved();
});

$(document).on("click", function(e){
	human.humanClicked();
	console.log(human.determineHumanity());
});

$(window).on("scroll", function(e){
	human.humanScrolled();
});

