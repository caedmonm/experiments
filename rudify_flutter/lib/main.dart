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
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
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
AudioPlayer advancedPlayer = new AudioPlayer();

class _MyHomePageState extends State<MyHomePage> {
  String _text = "";
  
  var wordLists = [["spiny","rotten","mouldy","squelchy","stinky","smelly","slimy","muddy","squishy","wandering","scaly","hairy","furry","itching","scratching"],["toilet","dungeon","garbage","arm pit","pant","fridge","suburban","urban","tree","river","space","field","lake","ocean","sea","wood","forest","desert","toe","butt","boob"],["hobbit","cucumber","fudge","slime","stink","turd","smell","tussock","clod","worm","slug","banana","bunion","dribble","plop","toenail"]];
  FlutterTts flutterTts = new FlutterTts();
  
  AudioCache audioCache = new AudioCache(fixedPlayer: advancedPlayer);
  
  Future _playWord(say,i) async {
    print(i);
    audioCache.play('voice1/'+say[i]+'.mp3');
    i++;
    if(i<4){
      advancedPlayer.completionHandler = () => (_playWord(say,i));
    } else {
      advancedPlayer.completionHandler = () => (null);
    }
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
      write += " "+say[2];
      write += " "+say[3];
      
      _text = write;
    });
    // await flutterTts.speak(_text);
    // await flutterTts.setVolume(1.0);
    audioCache.loadAll(['voice1/'+say[0]+'.mp3','voice1/'+say[1]+'.mp3','voice1/'+say[2]+'.mp3','voice1/'+say[3]+'.mp3']);
    _playWord(say,0);
    
    // advancedPlayer.completionHandler = () => (){
    //   audioCache.play('voice1/'+say[1]+'.mp3');

    // };
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          // Column is also layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '$_text',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _getWords,
        tooltip: 'Increment',
        icon: Icon(Icons.chat_bubble_outline),
        backgroundColor: Colors.pink,
        label: Text("RUDIFY!"),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
