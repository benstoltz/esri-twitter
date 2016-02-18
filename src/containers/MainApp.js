import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as TweetActions from '../actions/TweetActions';
import { EntityList } from '../components';


const socket = io();


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
                    <div className="col-xs-12 col-md-8">
                        <h2>Tweets for topic: blah</h2>
                        <EntityList
                            tweets={tweetslist.tweets} />
                    </div>
                </div>
            </div>
        );
    }


}