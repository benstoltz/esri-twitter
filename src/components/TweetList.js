import React, { Component, PropTypes } from 'react';

import ListItem from './Tweet';


export default class EntityList extends Component {
    static propTypes = {
        tweets: PropTypes.array.isRequired
    }

    render() {
        return <div className="list-group">
            {
                this.props.tweets.map(tweet => {
                    return <ListItem
                        key={tweet.tweet.properties.id_str}
                        tweet={tweet.tweet.properties}
                    />;
                })
            }
        </div>;
    }
}