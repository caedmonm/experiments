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
      title: 'Rudify App',
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
      "spotty",
      "orange",
      "faded",
      "soggy",
      "oily",
      "greasy",
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
      "mould",
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
      "toenail",
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
    List overlap = [1, 1, 1, 1];
    audioCaches[i].play("voice$_voice/" + say[i] + ".mp3");

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
    } else {
      audioCaches[0].load("voice$_voice/" + say[0] + '.mp3');
      audioCaches[1].load("voice$_voice/" + say[1] + '.mp3');
      audioCaches[2].load("voice$_voice/" + say[2] + '.mp3');
      audioCaches[3].load("voice$_voice/" + say[3] + '.mp3');
      _playWord(say, 0);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            widget.title,
            style: TextStyle(fontSize: 36),
          ),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text('$_text',
                  style: TextStyle(fontFamily: 'Nanum', fontWeight: FontWeight.bold, fontSize: 80, color: Colors.pink),
                  textAlign: TextAlign.center,
                ),
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
            child: ButtonBar(
          children: <Widget>[
            FlatButton(
                onPressed: () => setState(() {
                      _voice = 0;
                    }),
                color: _voice == 0 ? Colors.blue : Colors.grey,
                child: Row(
                  children: <Widget>[
                    Text(
                      "Robo",
                      style: TextStyle(fontSize: 26),
                    ),
                    Image.asset('assets/icons/bot.png', width: 20, height: 20),
                  ],
                )),
            FlatButton(
                onPressed: () => setState(() {
                      _voice = 1;
                    }),
                color: _voice == 1 ? Colors.blue : Colors.grey,
                child: Row(
                  children: <Widget>[
                    Text(
                      "Ivo",
                      style: TextStyle(fontSize: 26),
                    ),
                    Image.asset('assets/icons/boy.png', width: 20, height: 20),
                  ],
                )),
                FlatButton(
                onPressed: () => setState(() {
                      _voice = 2;
                    }),
                color: _voice == 2 ? Colors.blue : Colors.grey,
                child: Row(
                  children: <Widget>[
                    Text(
                      "Monster",
                      style: TextStyle(fontSize: 26),
                    ),
                    // Image.asset('assets/icons/boy.png', width: 20, height: 20),
                  ],
                )),
          ],
        )));
  }
}
