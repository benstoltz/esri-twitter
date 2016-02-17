import React, { Component, PropTypes } from 'react';


export default class ListItem extends Component {
    static propTypes = {
        tweet: PropTypes.object.isRequired
    }

    render() {
        return <div>
            <blockquote>
                <p>{this.props.tweet.text}</p>
            </blockquote>
        </div>;
    }
}