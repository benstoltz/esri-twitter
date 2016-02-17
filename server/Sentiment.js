var nodeSentiment = require('sentiment');

var sentiment = {};

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
            lang: tweet.lang,
            geo: tweet.geo
        };
        console.log(geoTweet.geo);
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
        socket.emit('sendNormTweet', {tweet: normTweet});
    }
};

module.exports = sentiment;