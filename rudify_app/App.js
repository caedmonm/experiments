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

  async sayWord(word){
	const soundObject = new Audio.Sound();
	try {
		await soundObject.loadAsync(require(word)) 
		await soundObject.playAsync();
	} catch (error) {
		console.log(error);
	}
  }

 getRude = () => {
	var say = [];
	var write = [
		"You're a "
	];
  for (var i = 0; i < words.length; i++) {
	  const a = words[i];
	  say.push(a[Math.floor(Math.random()*a.length)][1]);
	  write.push(a[Math.floor(Math.random()*a.length)][0]);
  }
	// Speech.speak(out, {
	// 	language: "en",
	// 	pitch: 1,
	// 	inProgress: false,
	// 	rate: .75
	// });
	  
	var text = write[0]+" "+write[1]+" "+write[2];
	this.setState({rudeText: text});
	
	this.sayWord(say[1]);
	

  }
  render() {
	if(!this.state.fontLoaded){
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
	  "spiny",
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
	  "toad",
	  "cucumber",
	  "fudge",
	  "slime",
	  "mold",
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
	  "stench",
	  "toe nail"
  ]
]


const words = [  
	[  
	   [  
		  "wandering",
		  "./assets/sounds/wandering.mp3"
	   ],
	   [  
		  "scaly",
		  "./assets/sounds/scaly.mp3"
	   ],
	   [  
		  "hairy",
		  "./assets/sounds/hairy.mp3"
	   ],
	   [  
		  "furry",
		  "./assets/sounds/furry.mp3"
	   ],
	   [  
		  "itching",
		  "./assets/sounds/itching.mp3"
	   ],
	   [  
		  "scratching",
		  "./assets/sounds/scratching.mp3"
	   ],
	   [  
		  "spiny",
		  "./assets/sounds/spiny.mp3"
	   ]
	],
	[  
	   [  
		  "tree",
		  "./assets/sounds/tree.mp3"
	   ],
	   [  
		  "river",
		  "./assets/sounds/river.mp3"
	   ],
	   [  
		  "space",
		  "./assets/sounds/space.mp3"
	   ],
	   [  
		  "field",
		  "./assets/sounds/field.mp3"
	   ],
	   [  
		  "lake",
		  "./assets/sounds/lake.mp3"
	   ],
	   [  
		  "ocean",
		  "./assets/sounds/ocean.mp3"
	   ],
	   [  
		  "sea",
		  "./assets/sounds/sea.mp3"
	   ],
	   [  
		  "wood",
		  "./assets/sounds/wood.mp3"
	   ],
	   [  
		  "forest",
		  "./assets/sounds/forest.mp3"
	   ],
	   [  
		  "desert",
		  "./assets/sounds/desert.mp3"
	   ],
	   [  
		  "toe",
		  "./assets/sounds/toe.mp3"
	   ],
	   [  
		  "butt",
		  "./assets/sounds/butt.mp3"
	   ],
	   [  
		  "boob",
		  "./assets/sounds/boob.mp3"
	   ]
	],
	[  
	   [  
		  "hobbit",
		  "./assets/sounds/hobbit.mp3"
	   ],
	   [  
		  "toad",
		  "./assets/sounds/toad.mp3"
	   ],
	   [  
		  "cucumber",
		  "./assets/sounds/cucumber.mp3"
	   ],
	   [  
		  "fudge",
		  "./assets/sounds/fudge.mp3"
	   ],
	   [  
		  "slime",
		  "./assets/sounds/slime.mp3"
	   ],
	   [  
		  "mold",
		  "./assets/sounds/mold.mp3"
	   ],
	   [  
		  "stink",
		  "./assets/sounds/stink.mp3"
	   ],
	   [  
		  "turd",
		  "./assets/sounds/turd.mp3"
	   ],
	   [  
		  "smell",
		  "./assets/sounds/smell.mp3"
	   ],
	   [  
		  "tussock",
		  "./assets/sounds/tussock.mp3"
	   ],
	   [  
		  "clod",
		  "./assets/sounds/clod.mp3"
	   ],
	   [  
		  "worm",
		  "./assets/sounds/worm.mp3"
	   ],
	   [  
		  "slug",
		  "./assets/sounds/slug.mp3"
	   ],
	   [  
		  "banana",
		  "./assets/sounds/banana.mp3"
	   ],
	   [  
		  "bunion",
		  "./assets/sounds/bunion.mp3"
	   ],
	   [  
		  "dribble",
		  "./assets/sounds/dribble.mp3"
	   ],
	   [  
		  "plop",
		  "./assets/sounds/plop.mp3"
	   ],
	   [  
		  "stench",
		  "./assets/sounds/stench.mp3"
	   ],
	   [  
		  "toe nail",
		  "./assets/sounds/toe nail.mp3"
	   ]
	]
 ];