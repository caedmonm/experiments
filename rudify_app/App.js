import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native-elements';
import { Font, Speech, Audio, FileSystem } from 'expo';

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
		console.log(words);
		const soundObject = new Audio.Sound();
		try {
			await soundObject.loadAsync(words[0]);
			await soundObject.playAsync();
		} catch (error) {
			console.log(error);
		}
		
		soundObject.setOnPlaybackStatusUpdate(async function(status){
			if(status.isLoaded == true){ 
				if((.7 * status.playableDurationMillis) < status.positionMillis && playing == 0){
					playing = 1;
					
					var soundObject2 = new Audio.Sound();
					try {
						await soundObject2.loadAsync(words[1]);
						await soundObject2.playAsync();
					} catch (error) {
						console.log(error);
					}

					soundObject2.setOnPlaybackStatusUpdate(async function(status){
						if(status.isLoaded == true){ 
							if((.7 * status.playableDurationMillis) < status.positionMillis && playing == 1){
								playing = 2;
								
								var soundObject3 = new Audio.Sound();
								try {
									await soundObject3.loadAsync(words[2]);
									await soundObject3.playAsync();
								} catch (error) {
									console.log(error);
								}
							}
						}
					});
				}
			}
		});
	}

	getRude = () => {
		var say = [];
		var write = [
			"You're a "
		];
		for (var i = 0; i < words.length; i++) {
			const word = words[i][Math.floor(Math.random() * words[i].length)];
			console.log('word',word);
			say.push(word[1]);
			write.push(word[0]);
		}

		// Speech.speak(out, {
		// 	language: "en",
		// 	pitch: 1,
		// 	inProgress: false,
		// 	rate: .75
		// });

		var text = write[0] + " " + write[1] + " " + write[2]+ " " + write[3];
		this.setState({ rudeText: text });
		this.sayWords(say);
	}
	render() {
		if (!this.state.fontLoaded) {
			return null
		}
		return (
			<View style={styles.container}>

				<Text style={styles.output}>{this.state.rudeText}</Text>


				<TouchableWithoutFeedback onPress={this.getRude}>
					<Text style={styles.rudeButton}>Call me something rude!</Text>
				</TouchableWithoutFeedback>

			</View>
		);
	}
}

const styles = StyleSheet.create({
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


const words = [
	[
		[
			"wandering",
			require("./assets/sounds/wandering.mp3")
		],
		[
			"scaly",
			require("./assets/sounds/scaly.mp3")
		],
		[
			"hairy",
			require("./assets/sounds/hairy.mp3")
		],
		[
			"furry",
			require("./assets/sounds/furry.mp3")
		],
		[
			"itching",
			require("./assets/sounds/itching.mp3")
		],
		[
			"scratching",
			require("./assets/sounds/scratching.mp3")
		]
	],
	[
		[
			"tree",
			require("./assets/sounds/tree.mp3")
		],
		[
			"river",
			require("./assets/sounds/river.mp3")
		],
		[
			"space",
			require("./assets/sounds/space.mp3")
		],
		[
			"field",
			require("./assets/sounds/field.mp3")
		],
		[
			"lake",
			require("./assets/sounds/lake.mp3")
		],
		[
			"ocean",
			require("./assets/sounds/ocean.mp3")
		],
		[
			"sea",
			require("./assets/sounds/sea.mp3")
		],
		[
			"wood",
			require("./assets/sounds/wood.mp3")
		],
		[
			"forest",
			require("./assets/sounds/forest.mp3")
		],
		[
			"desert",
			require("./assets/sounds/desert.mp3")
		],
		[
			"toe",
			require("./assets/sounds/toe.mp3")
		],
		[
			"butt",
			require("./assets/sounds/butt.mp3")
		],
		[
			"boob",
			require("./assets/sounds/boob.mp3")
		]
	],
	[
		[
			"hobbit",
			require("./assets/sounds/hobbit.mp3")
		],
		[
			"cucumber",
			require("./assets/sounds/cucumber.mp3")
		],
		[
			"fudge",
			require("./assets/sounds/fudge.mp3")
		],
		[
			"slime",
			require("./assets/sounds/slime.mp3")
		],
		[
			"stink",
			require("./assets/sounds/stink.mp3")
		],
		[
			"turd",
			require("./assets/sounds/turd.mp3")
		],
		[
			"smell",
			require("./assets/sounds/smell.mp3")
		],
		[
			"tussock",
			require("./assets/sounds/tussock.mp3")
		],
		[
			"clod",
			require("./assets/sounds/clod.mp3")
		],
		[
			"worm",
			require("./assets/sounds/worm.mp3")
		],
		[
			"slug",
			require("./assets/sounds/slug.mp3")
		],
		[
			"banana",
			require("./assets/sounds/banana.mp3")
		],
		[
			"bunion",
			require("./assets/sounds/bunion.mp3")
		],
		[
			"dribble",
			require("./assets/sounds/dribble.mp3")
		],
		[
			"plop",
			require("./assets/sounds/plop.mp3")
		],
		[
			"toe nail",
			require("./assets/sounds/toe nail.mp3")
		]
	]
];