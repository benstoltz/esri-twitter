var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    http = require('http');

var config = require('../webpack.config'),
    Twitter = require('./Twitter'),
    Sentiment = require('./Sentiment');

var app = express();
var compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

var server = http.createServer(app).listen(3000, function() {
    console.log('Listening at http://localhost:3000');
});

var io = require('socket.io').listen(server);
var connections = [];

//Twitter.get('search/tweets', { q: 'Esri', count: 100000}, function(err, data, response) {
//    data.statuses.map(function(tweet) {
//        if (tweet.geo) {
//            console.log(tweet)
//        }
//        console.log('bob')
//    })
//});


io.sockets.on('connection', function(socket) {


    connections.push(socket);
    console.log('%s Connected. %s sockets connected', socket.id, connections.length);

    var prevSearch = false;
    var twitterStream

    socket.on('search', function(payload) {

        console.log('Keyword: %s', payload.keyword);

        if (prevSearch) {
            twitterStream.stop();
            console.log(prevSearch);
            console.log('stop stream');
        } else {
            prevSearch = true;
        }

        // track location

        twitterStream = Twitter.stream('statuses/filter', {language: 'en', locations: payload.keyword});

        // Turn on Twitter stream

        twitterStream.on('tweet', function(tweet) {
            Sentiment.getSentiment(tweet, socket);
        });

        socket.once('disconnect', function() {
            connections.splice(connections.indexOf(socket), 1);
            socket.disconnect();
            twitterStream.stop();
            console.log('Socket disconnected: %s sockets remaining', connections.length);
        });
    });
});