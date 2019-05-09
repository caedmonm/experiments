import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:audioplayers/audio_cache.dart';
import 'package:audioplayers/audioplayers.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        fontFamily: 'Nanum',
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'RUDIFY!'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

var players = [
  new AudioPlayer(),
  new AudioPlayer(),
  new AudioPlayer(),
  new AudioPlayer()
];

class _MyHomePageState extends State<MyHomePage> {
  String _text = "";
  int _voice = 0;

  var wordLists = [
    [
      "spiny",
      "rotten",
      "mouldy",
      "squelchy",
      "stinky",
      "smelly",
      "slimy",
      "muddy",
      "squishy",
      "wandering",
      "scaly",
      "hairy",
      "furry",
      "itching",
      "scratching"
    ],
    [
      "toilet",
      "dungeon",
      "garbage",
      "arm pit",
      "pant",
      "fridge",
      "suburban",
      "urban",
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
      "toe",
      "butt",
      "boob"
    ],
    [
      "hobbit",
      "cucumber",
      "fudge",
      "slime",
      "stink",
      "turd",
      "smell",
      "tussock",
      "clod",
      "worm",
      "slug",
      "banana",
      "bunion",
      "dribble",
      "plop",
      "toenail"
    ]
  ];
  FlutterTts flutterTts = new FlutterTts();

  var audioCaches = [
    new AudioCache(fixedPlayer: players[0]),
    new AudioCache(fixedPlayer: players[1]),
    new AudioCache(fixedPlayer: players[2]),
    new AudioCache(fixedPlayer: players[3]),
  ];

  Future _playWord(say, i) async {
    Duration _duration = new Duration();
    Duration _position = new Duration();
    List overlap = [.4, .8, .4, 1];

    audioCaches[i].play("voice1/" + say[i] + ".mp3");

    players[i].durationHandler = (d) => setState(() {
          _duration = d;
        });

    players[i].positionHandler = (p) => setState(() {
          _position = p;
          if (_duration * overlap[i] < _position) {
            if (i < 5) {
              _playWord(say, (i + 1));
            } else {
              return null;
            }
          }
        });
  }

  Future _getWords() async {
    var say = [];
    setState(() {
      say.add("yourea");
      say.add((wordLists[0]..shuffle()).first);
      say.add((wordLists[1]..shuffle()).first);
      say.add((wordLists[2]..shuffle()).first);

      String write = "You're a ";
      write += say[1];
      write += " " + say[2];
      write += " " + say[3];

      _text = write;
    });

    if (_voice == 0) {
      await flutterTts.speak(_text);
      await flutterTts.setVolume(1.0);
    } else {
      audioCaches[0].load("voice${_voice}/" + say[0] + '.mp3');
      audioCaches[1].load("voice${_voice}/" + say[1] + '.mp3');
      audioCaches[2].load("voice${_voice}/" + say[2] + '.mp3');
      audioCaches[3].load("voice${_voice}/" + say[3] + '.mp3');
      _playWord(say, 0);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text('$_text',
                    style: TextStyle(fontFamily: 'Nanum', fontSize: 40)),
              ],
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: _getWords,
          tooltip: 'Increment',
          icon: Icon(Icons.chat_bubble_outline),
          backgroundColor: Colors.pink,
          label: Text("RUDIFY!"),
        ),
        bottomNavigationBar: BottomAppBar(
            child: Row(
          children: <Widget>[
            FlatButton(
                onPressed: () => {_voice = 0},
                color: Colors.orange,
                child: Row(
                  children: <Widget>[
                    Text(
                      "Robo",
                    ),
                  ],
                )),
            FlatButton(
                onPressed: () => {_voice = 1},
                color: Colors.orange,
                child: Row(
                  children: <Widget>[
                    Text(
                      "Ivo",
                    ),
                  ],
                )),
          ],
        )));
  }
}
