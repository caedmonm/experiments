var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var Twitter = require('twitter');

    var client = new Twitter({
      consumer_key: "4MMaCq1QyDUMnPbD9XdVkRcDb",
      consumer_secret: "9EgB18ehuWK0KTgH1mFhQLJ5uhN181zzrwofwkO1sFg9CsReZj",
      access_token_key: "204675533-L1TSn0UsIGTYwQ0wqbYldB4TmInmZHij6B3CN52l",
      access_token_secret: "vVUUStqxHHWw1Zp5XnEs78gj8fDTzh6mmts7vnA3E1M8i"
    });

    /**
     * Stream statuses filtered by keyword
     * number of tweets per second depends on topic popularity
     **/
    client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
      stream.on('data', function(tweet) {
        // console.log(tweet.text);
        res.end(tweet.text);
      });

      stream.on('error', function(error) {
        console.log(error);
      });
    });
}).listen(8080);
