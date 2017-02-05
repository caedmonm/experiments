wat = {
	out: $("#app"),
	rows: 3,
	cols: 3,
	holes: [],
	score: 0,
	setup: function(){
		for (var i = 0; i < wat.rows; i++) {
			for (var ii = 0; ii < wat.cols; ii++) {
				wat.holes.push({x:(ii*(100/wat.cols)),y:(i*(100/wat.rows))});
			}
		}
		$(document).on("click",".hole.up",function(){
			wat.hit($(this).data('id'));
		});
		wat.renderHoles();
		$("#score").text(wat.score);
	},
	renderHoles: function(){
		for (var i = 0; i < wat.holes.length; i++) {
			wat.out.append("<div class='hole' data-id='"+i+"' style='left:"+wat.holes[i].x+"%; top:"+wat.holes[i].y+"%'><div class='inner'><div class='donald'></div></div></div>");
		}
	},
	run: function(){
		setInterval(wat.popup, 500);
	},
	popup: function(){
		for (var i = 0; i < wat.holes.length; i++) {
			var t = $(".hole[data-id='"+i+"']");
			if(Math.random()>.9){
				if(t.hasClass("up")){
					t.removeClass("up");
				}
			} else if (Math.random()>.95){
				if(!t.hasClass("up")){
					t.addClass("up");
					t.removeClass("hit");
				}
			}
		}
	},
	hit: function(id){
		$(".hole[data-id='"+id+"']").removeClass("up");
		$(".hole[data-id='"+id+"']").addClass("hit");
		wat.score++;
		$("#score").text(wat.score);
	}

}

wat.setup();
wat.run();