import React from 'react';
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
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

		const soundObjects = [
			new Audio.Sound(),
			new Audio.Sound(),
			new Audio.Sound(),
			new Audio.Sound()
		];

		// preload sounds
		for (let i = 0; i < 4; i++) {
			await soundObjects[i].loadAsync(words[i]);
		}

		await soundObjects[0].playAsync();

		soundObjects[0].setOnPlaybackStatusUpdate(async function (status) {
			if (status.isLoaded == true) {
				if ((.5 * status.playableDurationMillis) < status.positionMillis && playing == 0) {
					soundObjects[0] = null;
					playing = 1;
					await soundObjects[1].playAsync();
					soundObjects[1].setOnPlaybackStatusUpdate(async function (status) {
						soundObjects[1] = null;
						if (status.isLoaded == true) {
							if ((.7 * status.playableDurationMillis) < status.positionMillis && playing == 1) {
								playing = 2;
								await soundObjects[2].playAsync();
								soundObjects[2].setOnPlaybackStatusUpdate(async function (status) {
									if (status.isLoaded == true) {
										if ((.6 * status.playableDurationMillis) < status.positionMillis && playing == 2) {
											soundObjects[2] = null;
											playing = 3;
											await soundObjects[3].playAsync();
											soundObjects[3] = null;
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
			say.push(voice_opening[this.state.voice].req);
		}

		for (var i = 0; i < wordLists.length; i++) {
			const word = wordLists[i][Math.floor(Math.random() * wordLists[i].length)];
			write.push(word.text);
			if (this.state.voice) {
				say.push(word.audio[this.state.voice].req);
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
		if (this.state.voice == undefined && !v) {
			return styles.voiceTabActive
		}
		if (v == this.state.voice) {
			return styles.voiceTabActive
		}
		return styles.voiceTab
	}

	setVoice = (v) => {
		this.setState({ voice: v });
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
		top: 20
	},
	voiceTab: {
		width: 80,
		height: 80,
		padding: 5,
		backgroundColor: "#eeeeee",
		borderColor: "#ffffff",
		borderWidth: 2,
		borderRadius: 5
	},
	voiceTabActive: {
		width: 80,
		height: 80,
		padding: 5,
		backgroundColor: "#dfe6e9",
		borderColor: "#6c5ce7",
		borderWidth: 2,
		borderRadius: 5
	},
	voiceTabImg: {
		width: 70,
		height: 70
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
		backgroundColor: '#F44336',
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
		"spiny",
		"rotten",
		"mouldy",
		"squelchy",
		"stinky",
		"smelly",
		"slimy",
		"muddy",
		"squishy",
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
		"toilet",
		"dungeon",
		"garbage",
		"arm pit",
		"pant",
		"fridge",
		"suburban",
		"urban",
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
		// "mould",
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
		"toenail"
	]
]

const voice_opening = [
	null,
	{
		req: require("./assets/sounds/yourea.mp3"),
		audio: null
	}
]

var wordLists = [
	[
		{
			"text": "spiny",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/spiny.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "rotten",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/rotten.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "mouldy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/mouldy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "squelchy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/squelchy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "stinky",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/stinky.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "smelly",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/smelly.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "slimy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/slimy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "muddy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/muddy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "squishy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/squishy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "wandering",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/wandering.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "scaly",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/scaly.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "hairy",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/hairy.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "furry",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/furry.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "itching",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/itching.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "scratching",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/scratching.mp3'),
					"audio": null
				}
			]
		}
	],
	[
		{
			"text": "toilet",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/toilet.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "dungeon",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/dungeon.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "garbage",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/garbage.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "arm pit",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/armpit.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "pant",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/pant.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "fridge",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/fridge.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "suburban",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/suburban.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "urban",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/urban.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "tree",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/tree.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "river",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/river.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "space",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/space.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "field",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/field.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "lake",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/lake.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "ocean",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/ocean.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "sea",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/sea.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "wood",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/wood.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "forest",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/forest.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "desert",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/desert.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "toe",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/toe.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "butt",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/butt.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "boob",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/boob.mp3'),
					"audio": null
				}
			]
		}
	],
	[
		{
			"text": "hobbit",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/hobbit.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "cucumber",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/cucumber.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "fudge",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/fudge.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "slime",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/slime.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "stink",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/stink.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "turd",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/turd.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "smell",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/smell.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "tussock",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/tussock.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "clod",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/clod.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "worm",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/worm.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "slug",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/slug.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "banana",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/banana.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "bunion",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/bunion.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "dribble",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/dribble.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "plop",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/plop.mp3'),
					"audio": null
				}
			]
		},
		{
			"text": "toenail",
			"audio": [
				null,
				{
					"req": require('./assets/sounds/toenail.mp3'),
					"audio": null
				}
			]
		}
	]
];