import * as types from '../constants/ActionTypes';

const initialState = {
    tweets: []
};

export default function tweetslist(state = initialState, action) {


    switch (action.type) {

        case types.ADD_TWEET:

            let newTweet = action.value;
            newTweet.isNew = true;

            let oldTweets = state.tweets.map(t => {
                let copy = t;
                copy.isNew = false;
                return copy;
            });

            return {
                ...state,
                tweets: [newTweet, ...oldTweets].splice(0, 100)
            };


        default:
            return state;
    }
};
