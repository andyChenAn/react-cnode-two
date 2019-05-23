import { combineReducers } from 'redux';
import {
    SELECTED_TOPIC,
    START_POST_TOPICLIST,
    RECEIVE_TOPICLIST,
    FAIL_POST_TOPICLIST,
    NEXT_PAGE,
    START_POST_NEXT_TOPICLIST,
    RECEVIE_NEXT_TOPICLIST,
    FAIL_POST_NEXT_TOPICLIST,
    START_POST_TOPIC_CONTENT,
    RECEVIE_TOPIC_CONTENT,
    FAIL_TOPIC_CONTENT,
    START_POST_ACCESSTOKEN,
    SUCCESS_POST_ACCESSTOKEN,
    FAIL_POST_ACCESSTOKEN,
    START_POST_COLLECT_TOPIC,
    SUCCESS_POST_COLLECT_TOPIC,
    FAIL_POST_COLLECT_TOPIC
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

function getContent (state = {
    isFetching : false,
    error : ''
} , action) {
    switch (action.type) {
        case START_POST_TOPIC_CONTENT :
        return Object.assign({} , state , {
            isFetching : true
        });
        case RECEVIE_TOPIC_CONTENT :
        return Object.assign({} , state , {
            isFetching : false,
            id : action.data.id,
            content : action.data.content,
            title : action.data.title,
            author : action.data.author.loginname,
            avatar : action.data.author.avatar_url,
            replies : action.data.replies,
            visit_count : action.data.visit_count
        });
        case FAIL_TOPIC_CONTENT :
        return Object.assign({} , state , {
            isFetching : false,
            error : action.error
        });
        default :
        return state;
    }
}

// 获取主题详情
function postContent (state={} , action) {
    switch (action.type) {
        case START_POST_TOPIC_CONTENT :
        case RECEVIE_TOPIC_CONTENT :
        case FAIL_TOPIC_CONTENT :
        return Object.assign({} , state , {
            [action.id] : getContent(state[action.id] , action)
        });
        default :
        return state;
    }
};

// 验证用户
function accesstoken (state={
    isFetching : false,
    validate : null
} , action) {
    switch (action.type) {
        case START_POST_ACCESSTOKEN :
        return Object.assign({} , state , {
            isFetching : true,
            validate : false
        });
        case SUCCESS_POST_ACCESSTOKEN :
        return Object.assign({} , state , {
            isFetching : false,
            validate : true,
            data : action.data
        });
        case FAIL_POST_ACCESSTOKEN :
        return Object.assign({} , state , {
            isFetching : false,
            validate : false
        });
        default : 
        return state;
    }
};

// 收藏主题逻辑，其中包括收藏，取消收藏，获取收藏主题列表
function collection (state={} , action) {
    switch (action.type) {
        case START_POST_COLLECT_TOPIC :
        if (action.method === 'get' || action.method === 'delete') {
            return state;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : true,
                    collected : false
                }
            });
        }
        case SUCCESS_POST_COLLECT_TOPIC :
        if (action.method === 'get') {
            let res = {};
            action.data.forEach(item => {
                res[item.id] = {
                    isFetching : false,
                    collected : true
                }
            });
            return res;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : false,
                    collected : true,
                }
            });
        } else if (action.method === 'delete') {
            let res = JSON.parse(JSON.stringify(state));
            delete res[action.id];
            return res;
        };
        case FAIL_POST_COLLECT_TOPIC :
        if (action.method === 'get' || action.method === 'delete') {
            return state;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : false,
                    collected : false
                }
            });
        }
        default : 
        return state;
    }
}

const rootReducer = combineReducers({
    selectedTopic,
    topicList,
    pages : setNextPageNumber,
    content : postContent,
    accesstoken,
    collection
});
export default rootReducer;