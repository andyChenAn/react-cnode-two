import axios from 'axios';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

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

export function posts (topic) {
    return dispatch => {
        dispatch(requestStart(topic));
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${topic}`)
        .then(res => {
            dispatch(requestSuccess(topic , res.data.data))
        })
        .catch(err => {
            dispatch(requestFail(topic , err.message));
        })
    }
}