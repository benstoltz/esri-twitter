import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as TweetActions from '../actions/TweetActions';
import { EntityList } from '../components';
import { MapContainer } from '../components';

// 'obama'
// '-180,-90,180,90'
// '-125.001106,24.94932,-66.93264,49.59037'
// '-77.119766,38.791672,-76.909538,38.99596'

const socket = io();

const mapStyles = {
    paddingLeft: 0
}

const tweetListStyles = {
    maxHeight: 90,
    overflowY: scroll
}


@connect(state => ({
    tweetslist: state.tweetslist
}))
export default class TweetsApp extends Component {
    constructor(props, context) {
        super(props, context)

        this.actions = bindActionCreators(TweetActions, this.props.dispatch);

        let socket = io.connect();
        this.state = {socket};
        this.fetchRecents();
    }

    fetchRecents() {
        this.state.socket.emit('search', {keyword: '-180,-90,180,90'})
        this.state.socket.on('sendGeoTweet', (data) => {
            this.actions.addTweet(data);
        });
    }

    render() {
        const {tweetslist} = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 pull-left" style={mapStyles}>
                        <MapContainer
                            tweets={tweetslist.tweets} />

                    </div>
                    <div className="col-md-3 pull-right">
                        <h2>Tweets for topic:'-180,-90,180,90'</h2>
                        <EntityList
                            tweets={tweetslist.tweets}
                            style={tweetListStyles} />
                    </div>
                </div>
            </div>
        );
    }


}