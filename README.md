## Twitter Express / React / Redux sample application

## Install
- `npm install webpack -g`
- `git clone https://github.com/benstoltz/esri-twitter.git`
- `npm install`
- `npm start` will start up an express server which starts up webpack. server will start up at localhost:3000


## Application flow
- When server starts:
  - Starts up a webpack hot reload server for front end compiling
  - Socket.io listens for the search event from the client and then begins emitting tweets.
  - Tweets are run through sentiment analysis
  - Tweets are consumed on the front end and added to map and sidebar
