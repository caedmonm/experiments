var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; //0 to 2
msg.lang = 'en-GB';

msg.onend = function(e) {
	vr.textOutput = 1;
};

var recognition
var vr = {
	output: $('#output'),
	commands: {
		clear_text: function(){
			vr.output.empty();
			recognition.start();
		},
		read_back: function(){
			if(!vr.reading){
				vr.reading = 1;
				msg.text = vr.output.text();
				speechSynthesis.speak(msg);
			}
		}
	},
	init: function(){
		console.log('init');
		vr.textOutput = 1;
		vr.reading = 0;
		recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.start();
		recognition.onresult = function(e) {
			console.log(e);
			vr.output.empty();
			for (var i = 0; i < e.results.length; i++) {
				var t = e.results[i][0].transcript;
				var t_k = t.trim().replace(/ /g,"_");
				if(vr.commands[t_k]!=undefined){
					vr.commands[t_k]();
				} else {
					if(vr.textOutput){
						vr.output.append("<p>"+t+"</p>");
					}
				}
			}
		}
	}
}

// msg.text = "Good morning Ivo, how are you today?";
// speechSynthesis.speak(msg);
vr.init();




