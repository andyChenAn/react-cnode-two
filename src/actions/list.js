import axios from 'axios';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SELECTED_TOPIC = 'SELECTED_TOPIC';
export const GET_TOPIC_INFO = 'GET_TOPIC_INFO';
export const GET_COLLECT_TOPIC = 'GET_COLLECT_TOPIC';

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
export const getTopicInfo = makeActionCreator(GET_TOPIC_INFO , 'infoId' , 'data');
export const getCollectTopic = makeActionCreator(GET_COLLECT_TOPIC , 'topicId' , 'data');

function posts (options) {
    return dispatch => {
        if (options.ID === 'topic') {
            dispatch(requestStart(options.name));
            axios(options.data)
            .then(res => {
                dispatch(requestSuccess(options.name , res.data.data))
            })
            .catch(err => {
                dispatch(requestFail(options.name , err.message));
            })
        } else if (options.ID === 'topicInfo') {
            dispatch(requestStart(options.name));
            axios(options.data)
            .then(res => {
                dispatch(getTopicInfo(options.name , res.data.data));
            })
            .catch(err => {
                dispatch(requestFail(options.name , err.message));
            })
        }
    }
};

function shouldPosts (state , options) {
    if (options.ID === 'topic') {
        let list = state.postByTopic[options.name];
        let isFetching = state.isFetching;
        if (list.length > 0) {
            return false;
        } else if (isFetching) {
            return false;
        } else {
            return true;
        }
    } else if (options.ID === 'topicInfo') {
        let info = state.topicInfo[options.name];
        let isFetching = state.isFetching;
        if (info) {
            return false;
        } else if (isFetching) {
            return false;
        } else {
            return true;
        }
    }
}

export function postsIfNeed (options) {
    return (dispatch , getState) => {
        if (shouldPosts(getState() , options)) {
            return dispatch(posts(options));
        }
    }
};

export function collectTopic (options) {
    return dispatch => {
        return axios.post('https://cnodejs.org/api/v1/topic_collect/collect' , options)
        .then(res => {
            dispatch(getCollectTopic(options['topic_id'] , {
                topicId : options['topic_id']
            }));
        })
        .catch(err => {
            dispatch(requestFail(err));
        })
    }
}