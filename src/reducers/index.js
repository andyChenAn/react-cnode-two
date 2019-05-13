import { combineReducers } from 'redux';
import { 
    REQUEST_START , 
    REQUEST_SUCCESS , 
    REQUEST_FAIL,
    SELECTED_TOPIC,
    GET_TOPIC_INFO,
    GET_COLLECT_TOPIC
} from '../actions/list';

function selectedTopic (state = 'all' , action) {
    switch (action.type) {
        case SELECTED_TOPIC :
        return action.topic;
        default :
        return state;
    }
};

function isFetching (state = false , action) {
    switch (action.type) {
        case REQUEST_START :
        return true;
        case REQUEST_SUCCESS :
        case REQUEST_FAIL :
        case GET_TOPIC_INFO :
        return false;
        default : 
        return state;
    }
};

function error (state = '' , action) {
    switch (action.type) {
        case REQUEST_FAIL :
        return action.error;
        case REQUEST_START :
        return '';
        default :
        return state;
    }
};

function postByTopic (state = {
    all : [],
    good : [],
    share : [],
    ask : [],
    job : []
} , action) {
    switch (action.type) {
        case REQUEST_SUCCESS :
        let res = [];
        action.data.forEach(function (item , index) {
            res.push({
                id : item.id,
                title : item.title,
                author : item.author.loginname,
                avatar : item.author.avatar_url,
                create_at : item.create_at,
                tab : item.tab
            });
        });
        return Object.assign({} , state , {
            [action.topic] : res
        });
        default : 
        return state;
    }
};

function topicInfo (state = {} , action) {
    switch (action.type) {
        case GET_TOPIC_INFO :
        return Object.assign({} , state , {
            [action.data.id] : {
                id : action.data.id,
                content : action.data.content,
                title : action.data.title,
                author : action.data.author.loginname,
                avatar : action.data.author.avatar_url,
                visit_count : action.data.visit_count,
                replies : action.data.replies
            }
        });
        default :
        return state;
    }
}

function collectedTopic (state = {} , action) {
    switch (action.type) {
        case GET_COLLECT_TOPIC :
        return Object.assign({} , state , {
            [action.topicId] : {
                id : action.topicId,
                collected : true
            }
        });
        default :
        return state;
    }
};

const rootReducer = combineReducers({
    postByTopic,
    selectedTopic,
    isFetching,
    error,
    topicInfo,
    collectedTopic
});
export default rootReducer;