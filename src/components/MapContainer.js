import React, { Component, PropTypes } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJson } from 'react-leaflet';

export default class MapContainer extends Component {

    static propTypes = {
        tweets: PropTypes.array.isRequired
    }

    constructor() {
        super();
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 2,
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {
                    this.props.tweets.map(tweet => {
                        return <GeoJson
                            key={tweet.tweet.properties.id_str}
                            data={tweet.tweet}
                        />;
                    })
                }
            </Map>
        );
    }
}