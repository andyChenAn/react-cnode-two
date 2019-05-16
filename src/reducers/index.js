import { combineReducers } from 'redux';
import {
    SELECTED_TOPIC,
    START_POST_TOPICLIST,
    RECEIVE_TOPICLIST,
    FAIL_POST_TOPICLIST,
    NEXT_PAGE,
    START_POST_NEXT_TOPICLIST,
    RECEVIE_NEXT_TOPICLIST,
    FAIL_POST_NEXT_TOPICLIST
} from '../actions/index';

function selectedTopic (state='all' , action) {
    switch (action.type) {
        case SELECTED_TOPIC :
        return action.topic;
        default :
        return state;
    }
};

function getTopicList (state={
    isFetching : false,
    items : [],
    error : ''
} , action) {
    switch (action.type) {
        case START_POST_TOPICLIST :
        case START_POST_NEXT_TOPICLIST :
        return Object.assign({} , state , {
            isFetching : true
        });
        case RECEIVE_TOPICLIST :
        case RECEVIE_NEXT_TOPICLIST :
        let res = [];
        action.data.forEach(item => {
            res.push({
                id : item.id,
                title : item.title,
                author : item.author.loginname,
                avatar : item.author.avatar_url,
                create_at : item.create_at,
                tab : item.tab,
                visit_count : item.visit_count,
                reply_count : item.reply_count
            })
        });
        return Object.assign({} , state , {
            isFetching : false,
            items : [
                ...state.items,
                ...res
            ]
        });
        case FAIL_POST_TOPICLIST :
        case FAIL_POST_NEXT_TOPICLIST :
        return Object.assign({} , state , {
            isFetching : false,
            error : action.error
        });
        default :
        return state;
    }
};

function topicList (state = {} , action) {
    switch (action.type) {
        case START_POST_TOPICLIST :
        case RECEIVE_TOPICLIST :
        case FAIL_POST_TOPICLIST :
        case START_POST_NEXT_TOPICLIST :
        case RECEVIE_NEXT_TOPICLIST :
        case FAIL_POST_NEXT_TOPICLIST :
        return Object.assign({} , state , {
            [action.topic] : getTopicList(state[action.topic] , action)
        });
        default : 
        return state;
    }
};

function setNextPageNumber (state={
    all : 1,
    good : 1,
    share : 1,
    ask : 1,
    job : 1
} , action) {
    switch (action.type) {
        case NEXT_PAGE :
        return Object.assign({} , state , {
            [action.topic] : action.page
        });
        default : 
        return state;
    }
};

const rootReducer = combineReducers({
    selectedTopic,
    topicList,
    pages : setNextPageNumber
});
export default rootReducer;