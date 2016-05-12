var nodeSentiment = require('sentiment');

var sentiment = {};
var pattern = /<a href[^>]*>((.|[\n\r])*)<\/a>/im;


var parseSource = function(tweetSource) {
    var source = [];
    var sourceTypes = ["Twitter for Android", "Twitter for iPhone", "Instagram", "Foursquare", "other"]
    var count;

    sourceTypes.map(function (src) {
        if (src === tweetSource) {
            source.push(1);
        } else {
            source.push(0);
        }
    });
    count = source.reduce(function (a, b) { return a + b });
    if ( count === 0 ) {
        source.pop();
        source.push(1);
    }
    return source;
};


sentiment.getSentiment = function(tweet, socket) {
    var tweetSentiment = nodeSentiment(tweet.text);

    if (tweetSentiment.score < 0) {
        tweetSentiment = 'negative';
    } else if (tweetSentiment.score > 0) {
        tweetSentiment = 'positive';
    } else {
        tweetSentiment = 'neutral';
    }

    sentiment.appendSentiment(tweet, tweetSentiment, socket);
};

// Make new tweet object
// Run through koop
// Send to client

sentiment.appendSentiment = function(tweet, sentiment, socket) {

    if (tweet.geo) {
        var geoTweet = {
            type: "Feature",
            properties: {
                sentiment: sentiment,
                source: pattern.exec(tweet.source)[1],
                sourceCounts: parseSource(pattern.exec(tweet.source)[1]),
                created_at: tweet.created_at,
                timestamp_ms: tweet.timestamp_ms,
                id_str: tweet.id_str,
                user: {
                    name: tweet.user.name,
                    screen_name: tweet.user.screen_name,
                    profile_image_url_https: tweet.user.profile_image_url_https,
                    location: tweet.user.location,
                    time_zone: tweet.user.time_zone
                },
                text: tweet.text,
                lang: tweet.lang,
                place: tweet.place ? tweet.place : null
            },
            geometry: {
                type: tweet.geo.type,
                coordinates: [tweet.geo.coordinates[1], tweet.geo.coordinates[0]]
            }
        };
        socket.emit('sendGeoTweet', {tweet: geoTweet});
    } else {
        var normTweet = {
            sentiment: sentiment,
            created_at: tweet.created_at,
            timestamp_ms: tweet.timestamp_ms,
            id_str: tweet.id_str,
            user: {
                name: tweet.user.name,
                screen_name: tweet.user.screen_name,
                profile_image_url_https: tweet.user.profile_image_url_https,
                location: tweet.user.location,
                time_zone: tweet.user.time_zone
            },
            text: tweet.text,
            lang: tweet.lang
        };
        console.log(normTweet.text);
    //    socket.emit('sendNormTweet', {tweet: normTweet});
    }
};

module.exports = sentiment;
