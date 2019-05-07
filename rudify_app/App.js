import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native-elements';
import { Font, Speech } from 'expo';

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

 getRude = () => {
  var out = "You're a ";
  for (var i = 0; i < words.length; i++) {
	  const a = words[i];
	  out += a[Math.floor(Math.random()*a.length)] + " ";
  }
	Speech.speak(out, {
		language: "en",
		pitch: 1,
		inProgress: false,
		rate: .75
	});

	this.setState({rudeText: out});
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

const words = [
  [
	  "wandering",
	  "scaly",
	  "hairy",
	  "furry",
	  "itching",
	  "scratching",
	  "spiny",
	  "rotten",
	  "moldy",
	  "squelchy",
	  "stinky",
	  "smelly",
	  "slimy",
	  "muddy",
	  "squishy",
	  "squelchy",
	  "spotty",
	  "orange",
	  "faded",
	  "soggy",
	  "oily",
	  "greasy",
	  "oozing",
	  "boring",
	  "gelatinous",
	  "rancid",
	  "disgusting",
	  "gassy",
	  "oozing",
	  "dripping",
	  "scabby",
	  "bulging",
	  "cheesy",
	  "waxy",
	  "squeaky",
	  "bushy"
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
	  "hedge",
	  "gutter",
	  "mud",
	  "bog",
	  "marsh",
	  "chimney",
	  "attic",
	  "cellar",
	  "cave",
	  "sewer",
	  "slime",
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
	  "buttock"
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
	  "lump",
	  "raspberry",
	  "fart",
	  "trumpet",
	  "burp",
	  "twit",
	  "flump",
	  "nugget",
	  "cist",
	  "spillage",
	  "cheese",
	  "drip",
	  "bogey",
	  "stain",
	  "scab",
	  "wart",
	  "plug",
	  "hole",
	  "wiener",
	  "nostril",
	  "orifice",
	  "log",
	  "bunion",
	  "dribble",
	  "plop",
	  "stench",
	  "toe nail"
  ]
]


