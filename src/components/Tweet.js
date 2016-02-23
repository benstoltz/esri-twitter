import React, { Component, PropTypes } from 'react';


export default class ListItem extends Component {
    static propTypes = {
        tweet: PropTypes.object.isRequired
    }

    render() {
        return <div>
            <blockquote>
                <h3>{this.props.tweet.user.name}</h3>
                <h5>I'm very: {this.props.tweet.sentiment}</h5>
                <h5>I'm using: {this.props.tweet.source}</h5>
                <p>{this.props.tweet.text}</p>
                <p>From: {this.props.tweet.user.location}</p>
                <p>But really my location is: {this.props.tweet.place.full_name}</p>
            </blockquote>
            <hr />
        </div>;
    }
}