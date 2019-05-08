import React from 'react';
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback,TouchableHighlight } from 'react-native';
// import { Header } from 'react-native-elements';
import { Font, Speech, Audio } from 'expo';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			rudeText: "",
			fontLoaded: false,
			speechOps: {
				language: "en-GB",
				pitch: 1,
				inProgress: false,
				rate: .75,
				voice: 0
			}
		}
	}

	async componentDidMount() {
		await Font.loadAsync({
			'nanum-pen-script': require('./assets/fonts/NanumPenScript-Regular.ttf')
		});
		this.setState({ fontLoaded: true });
	}


	async sayWords(words) {
		var playing = 0;
		const overlap = .6;

		const soundObjects = [
			new Audio.Sound(),
			new Audio.Sound(),
			new Audio.Sound(),
			new Audio.Sound()
		];

		await soundObjects[0].loadAsync(words[0]);
		await soundObjects[0].playAsync();

		soundObjects[0].setOnPlaybackStatusUpdate(async function (status) {
			if (status.isLoaded == true) {
				if ((overlap * status.playableDurationMillis) < status.positionMillis && playing == 0) {
					playing = 1;
					await soundObjects[1].loadAsync(words[1]);
					await soundObjects[1].playAsync();
					soundObjects[1].setOnPlaybackStatusUpdate(async function (status) {
						if (status.isLoaded == true) {
							if ((overlap * status.playableDurationMillis) < status.positionMillis && playing == 1) {
								playing = 2;
								await soundObjects[2].loadAsync(words[2]);
								await soundObjects[2].playAsync();
								soundObjects[2].setOnPlaybackStatusUpdate(async function (status) {
									if (status.isLoaded == true) {
										if ((overlap * status.playableDurationMillis) < status.positionMillis && playing == 2) {
											playing = 3;
											await soundObjects[3].loadAsync(words[3]);
											await soundObjects[3].playAsync();
										}
									}
								});
							}
						}
					});
				}
			}
		});
	}

	getRude = () => {
		var write = [
			"You're a "
		];
		var say = [];

		if (this.state.voice) {
			say.push(voice_opening[this.state.voice]);
		}

		for (var i = 0; i < words.length; i++) {
			const word = words[i][Math.floor(Math.random() * words[i].length)];
			write.push(word[0]);
			if (this.state.voice) {
				say.push(word[1][this.state.voice]);
			}
		}

		var text = write[0] + " " + write[1] + " " + write[2] + " " + write[3];
		this.setState({ rudeText: text });

		if (!this.state.voice) {
			Speech.speak(text);
		} else {
			this.sayWords(say);
		}
	}

	voiceStyle = (v) => {
		if(this.state.voice==undefined && !v){
			return styles.voiceTabActive
		}
		if(v == this.state.voice){
			return styles.voiceTabActive
		}
			
		return styles.voiceTab
	}

	setVoice = (v) => {
		this.setState({voice:v});
	}

	render() {
		if (!this.state.fontLoaded) {
			return null
		}
		return (
			<View style={styles.container}>
				<View style={styles.voiceTabs}>
					<TouchableHighlight value="0" onPress={() => this.setVoice(0)} style={this.voiceStyle(0)} >
						<Image
							source={require('./assets/icons/bot.png')}
							style={styles.voiceTabImg} 
						/>
					</TouchableHighlight>
					<TouchableHighlight value="1" onPress={() => this.setVoice(1)} style={this.voiceStyle(1)} >
						<Image
							source={require('./assets/icons/boy.png')}
							style={styles.voiceTabImg} 
						/>
					</TouchableHighlight>
				</View>

				<Text style={styles.output}>{this.state.rudeText}</Text>

				<TouchableWithoutFeedback onPress={this.getRude}>
					<Text style={styles.rudeButton}>Call me something rude!</Text>
				</TouchableWithoutFeedback>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	voiceTabs: {
		flex: 1,
        flexDirection: 'row',
		justifyContent: 'space-between',
		top:20
	},
	voiceTab: {
		width: 80,
		height: 80,
		padding:5,
		backgroundColor: "#f9f9f9",
		borderRadius: 5
	},
	voiceTabActive: {
		width: 80,
		height: 80,
		padding:5,
		backgroundColor: "#eeeeee",
		borderRadius: 5
	},
	voiceTabImg:{
		width:70,
		height:70
	},	
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	rudeButton: {
		fontFamily: 'nanum-pen-script',
		fontSize: 30,
		width: 300,
		backgroundColor: '#f30',
		padding: 10,
		color: '#fff',
		textAlign: 'center'
	},
	output: {
		fontFamily: 'nanum-pen-script',
		fontSize: 56,
		minHeight: 200,
		textAlign: 'center'
	}
});

const words_all = [
	[
		"wandering",
		"scaly",
		"hairy",
		"furry",
		"itching",
		"scratching",
		// "spiny",
		//   "rotten",
		//   "moldy",
		//   "squelchy",
		//   "stinky",
		//   "smelly",
		//   "slimy",
		//   "muddy",
		//   "squishy",
		//   "squelchy",
		//   "spotty",
		//   "orange",
		//   "faded",
		//   "soggy",
		//   "oily",
		//   "greasy",
		//   "oozing",
		//   "boring",
		//   "gelatinous",
		//   "rancid",
		//   "disgusting",
		//   "gassy",
		//   "oozing",
		//   "dripping",
		//   "scabby",
		//   "bulging",
		//   "cheesy",
		//   "waxy",
		//   "squeaky",
		//   "bushy"
	],
	[
		"tree",
		"river",
		"space",
		"field",
		"lake",
		"ocean",
		"sea",
		"wood",
		"forest",
		"desert",
		//   "hedge",
		//   "gutter",
		//   "mud",
		//   "bog",
		//   "marsh",
		//   "chimney",
		//   "attic",
		//   "cellar",
		//   "cave",
		//   "sewer",
		//   "slime",
		//   "toilet",
		//   "dungeon",
		//   "garbage",
		//   "arm pit",
		//   "pant",
		//   "fridge",
		//   "suburban",
		//   "urban",
		"toe",
		"butt",
		"boob",
		//   "buttock"
	],
	[
		"hobbit",
		// "toad",
		"cucumber",
		"fudge",
		"slime",
		// "mold",
		"stink",
		"turd",
		"smell",
		"tussock",
		"clod",
		"worm",
		"slug",
		"banana",
		//   "lump",
		//   "raspberry",
		//   "fart",
		//   "trumpet",
		//   "burp",
		//   "twit",
		//   "flump",
		//   "nugget",
		//   "cist",
		//   "spillage",
		//   "cheese",
		//   "drip",
		//   "bogey",
		//   "stain",
		//   "scab",
		//   "wart",
		//   "plug",
		//   "hole",
		//   "wiener",
		//   "nostril",
		//   "orifice",
		//   "log",
		"bunion",
		"dribble",
		"plop",
		// "stench",
		"toe nail"
	]
]

const voice_opening = [
	null,
	require("./assets/sounds/yourea.mp3")
]
const words = [
	[
		[
			"wandering",
			[
				null,
				require("./assets/sounds/wandering.mp3")
			]
		],
		[
			"scaly",
			[
				null,
				require("./assets/sounds/scaly.mp3")
			]
		],
		[
			"hairy",
			[
				null,
				require("./assets/sounds/hairy.mp3")
			]
		],
		[
			"furry",
			[
				null,
				require("./assets/sounds/furry.mp3")
			]
		],
		[
			"itching",
			[
				null,
				require("./assets/sounds/itching.mp3")
			]
		],
		[
			"scratching",
			[
				null,
				require("./assets/sounds/scratching.mp3")
			]
		]
	],
	[
		[
			"tree",
			[
				null,
				require("./assets/sounds/tree.mp3")
			]
		],
		[
			"river",
			[
				null,
				require("./assets/sounds/river.mp3")
			]
		],
		[
			"space",
			[
				null,
				require("./assets/sounds/space.mp3")
			]
		],
		[
			"field",
			[
				null,
				require("./assets/sounds/field.mp3")
			]
		],
		[
			"lake",
			[
				null,
				require("./assets/sounds/lake.mp3")
			]
		],
		[
			"ocean",
			[
				null,
				require("./assets/sounds/ocean.mp3")
			]
		],
		[
			"sea",
			[
				null,
				require("./assets/sounds/sea.mp3")
			]
		],
		[
			"wood",
			[
				null,
				require("./assets/sounds/wood.mp3")
			]
		],
		[
			"forest",
			[
				null,
				require("./assets/sounds/forest.mp3")
			]
		],
		[
			"desert",
			[
				null,
				require("./assets/sounds/desert.mp3")
			]
		],
		[
			"toe",
			[
				null,
				require("./assets/sounds/toe.mp3")
			]
		],
		[
			"butt",
			[
				null,
				require("./assets/sounds/butt.mp3")
			]
		],
		[
			"boob",
			[
				null,
				require("./assets/sounds/boob.mp3")
			]
		]
	],
	[
		[
			"hobbit",
			[
				null,
				require("./assets/sounds/hobbit.mp3")
			]
		],
		[
			"cucumber",
			[
				null,
				require("./assets/sounds/cucumber.mp3")
			]
		],
		[
			"fudge",
			[
				null,
				require("./assets/sounds/fudge.mp3")
			]
		],
		[
			"slime",
			[
				null,
				require("./assets/sounds/slime.mp3")
			]
		],
		[
			"stink",
			[
				null,
				require("./assets/sounds/stink.mp3")
			]
		],
		[
			"turd",
			[
				null,
				require("./assets/sounds/turd.mp3")
			]
		],
		[
			"smell",
			[
				null,
				require("./assets/sounds/smell.mp3")
			]
		],
		[
			"tussock",
			[
				null,
				require("./assets/sounds/tussock.mp3")
			]
		],
		[
			"clod",
			[
				null,
				require("./assets/sounds/clod.mp3")
			]
		],
		[
			"worm",
			[
				null,
				require("./assets/sounds/worm.mp3")
			]
		],
		[
			"slug",
			[
				null,
				require("./assets/sounds/slug.mp3")
			]
		],
		[
			"banana",
			[
				null,
				require("./assets/sounds/banana.mp3")
			]
		],
		[
			"bunion",
			[
				null,
				require("./assets/sounds/bunion.mp3")
			]
		],
		[
			"dribble",
			[
				null,
				require("./assets/sounds/dribble.mp3")
			]
		],
		[
			"plop",
			[
				null,
				require("./assets/sounds/plop.mp3")
			]
		],
		[
			"toe nail",
			[
				null,
				require("./assets/sounds/toe nail.mp3")
			]
		]
	]
];