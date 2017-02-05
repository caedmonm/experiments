var mh = {};
mh.answers = [];
mh.rounds = 10000;



mh.render = function(d){
	if(d=="t"){
		mh.output.html("<table><tr><th>Round</th><th>Picked</th><th>Not</th><th>Right</th></tr></table>");
	}else if(d=="b"){
		var p = (100/(mh.right+mh.wrong))*mh.right;
		mh.output.prepend("<div class='results'><div><span>Right:</span> "+mh.right+"</div><div><span>Wrong:</span> "+mh.wrong+"</div><div>"+p+"%</div>");
	} else {
		mh.output.append("<table><tr class='"+d.right+"'><td>"+d.r+"</td><td>"+d.picked+"</td><td>"+d.not+"</td><td>"+d.right+"</td></tr></table>")
	}
}

mh.getAnswers = function(){
	for (var i = 0; i < mh.rounds; i++) {
		mh.answers.push(Math.round(Math.random()*2+1));
	}
}

mh.round = function(r){
	var picked = Math.round(Math.random()*2+1);
	var not;
	var right;

	for (var i = 1; i < 4; i++) {
		if(i!=picked && i!=mh.answers[r]){
			not = i;
		}
	}

	if(mh.switch){
		for (var i = 1; i < 4; i++) {
			if(i!=picked && i!=not){
				picked = i;
			}
		}
	}

	if(picked==mh.answers[r]){
		right = "right";
		mh.right++;
	} else {
		right = "wrong";
		mh.wrong++;
	}

	mh.render({r:r,picked:picked,not:not,right:right});
}

mh.setup = function(s){
	if(s){
		mh.switch = 1;
		mh.output = $(".s");
	} else{
		mh.switch = 0;
		mh.output = $(".ns");
	}
	mh.getAnswers();
	mh.right = 0;
	mh.wrong = 0;
}

mh.run = function(){
	mh.rounds = $("#rounds").val();

	// no switch
	mh.setup(0);
	
	mh.render('t');
	for (var i = 0; i < mh.answers.length; i++) {
		mh.round(i);
	}
	mh.render('b');

	// switch
	mh.setup(1);
	
	mh.render('t');
	for (var i = 0; i < mh.answers.length; i++) {
		mh.round(i);
	}
	mh.render('b');
}

$(".go").click(mh.run);