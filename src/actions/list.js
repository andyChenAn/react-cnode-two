import axios from 'axios';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SELECTED_TOPIC = 'SELECTED_TOPIC';

function makeActionCreator (type , ...args1) {
    return function (...args2) {
        let result = {type};
        args1.forEach((arg , index) => {
            result[args1[index]] = args2[index];
        });
        return result;
    }
};

export const requestStart = makeActionCreator(REQUEST_START , 'topic');
export const requestSuccess = makeActionCreator(REQUEST_SUCCESS , 'topic' , 'data');
export const requestFail = makeActionCreator(REQUEST_FAIL , 'topic' , 'error');
export const selectTopic = makeActionCreator(SELECTED_TOPIC , 'topic');

function posts (topic) {
    return dispatch => {
        dispatch(requestStart(topic));
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${topic}&limit=10`)
        .then(res => {
            dispatch(requestSuccess(topic , res.data.data))
        })
        .catch(err => {
            dispatch(requestFail(topic , err.message));
        })
    }
};

function shouldPosts (state , topic) {
    let list = state.postByTopic[topic];
    let isFetching = state.isFetching;
    if (list.length > 0) {
        return false;
    } else if (isFetching) {
        return false;
    } else {
        return true;
    }
}

export function postsIfNeed (topic) {
    return (dispatch , getState) => {
        if (shouldPosts(getState() , topic)) {
            return dispatch(posts(topic));
        }
    }
}