//import React, { Component, PropTypes } from 'react';
//import ReactDOM from 'react-dom';
//import ChartistGraph from 'react-chartist';
//
//
//export default class BarChart extends  Component {
//
//    static propTypes ={
//        tweets: PropTypes.array.isRequired
//    }
//
//    constructor() {
//        super();
//
//        this.state = {
//            simpleLineChartData : {
//                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//                series: [
//                    [12, 9, 7, 8, 5],
//                    [2, 1, 3.5, 7, 3],
//                    [1, 3, 4, 5, 6]
//                ]
//            }
//        }
//    }
//
//
//    render() {
//
//        //var simpleLineChartData = {
//        //    labels: ["Twitter for Android", "Twitter for iOS", "Instagram", "Foursquare", "other"],
//        //    series: [tweet.tweet.properties.sourceCounts]
//        //}
//
//        return (
//            <div>
//                <ChartistGraph
//                    data = this.state.simpleLineChartData
//                    type={'Line'} />;
//            </div>
//
//        )
//    }
//}