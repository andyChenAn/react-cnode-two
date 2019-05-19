import fetch from 'isomorphic-fetch';
import { storage } from '../utils';
import { bindActionCreators } from '../../node_modules/redux';
// 全局的加载中action类型
export const IS_FETCHING = 'ISFETCHING';
// 全局的加载完成action类型
export const HAS_FETCHED = 'HAS_FETCHED';

// 选择主题action类型
export const SELECTED_TOPIC = 'SELECTED_TOPIC';

// 开始请求主题列表action类型
export const START_POST_TOPICLIST = 'START_POST_TOPIC';
// 接收到请求主题列表action类型
export const RECEIVE_TOPICLIST = 'RECEIVE_TOPICLIST';
// 请求主题列表失败action类型
export const FAIL_POST_TOPICLIST = 'FAIL_POST_TOPICLIST';

// 请求主题列表下一页action类型
export const NEXT_PAGE = 'NEXT_PAGE';
// 开始请求下一页主题列表aciton类型
export const START_POST_NEXT_TOPICLIST = 'START_POST_NEXT_TOPICLIST';
// 接收到请求下一页主题列表aciton类型
export const RECEVIE_NEXT_TOPICLIST = 'RECEVIE_NEXT_TOPICLIST';
// 请求下一页主题列表失败action类型
export const FAIL_POST_NEXT_TOPICLIST = 'FAIL_POST_NEXT_TOPICLIST';

// 开始请求主题内容aciton类型
export const START_POST_TOPIC_CONTENT = 'START_POST_TOPIC_CONTENT';
// 接收到主题内容action类型
export const RECEVIE_TOPIC_CONTENT = 'RECEVIE_TOPIC_CONTENT';
// 请求主题内容失败action类型
export const FAIL_TOPIC_CONTENT = 'FAIL_TOPIC_CONTENT';

// 开始请求收藏主题action类型
export const START_POST_COLLECT_TOPIC = 'START_POST_COLLECT_TOPIC';
// 请求收藏主题成功action类型
export const SUCCESS_POST_COLLECT_TOPIC = 'SUCCESS_POST_COLLECT_TOPIC';
// 请求收藏主题失败action类型
export const FAIL_POST_COLLECT_TOPIC = 'FAIL_POST_COLLECT_TOPIC';

// 开始请求验证accessToken的action类型
export const START_POST_ACCESSTOKEN = 'START_POST_ACCESSTOKEN';
// 验证accessToken成功的action类型
export const SUCCESS_POST_ACCESSTOKEN = 'SUCCESS_POST_ACCESSTOKEN';
// 请求验证accessToken失败的action类型
export const FAIL_POST_ACCESSTOKEN = 'FAIL_POST_ACCESSTOKEN';


const pages = {
    all : 1,
    share : 1,
    good : 1,
    ask : 1,
    job : 1
};

// 选择主题action函数
export function selectTopic (topic) {
    return {
        type : SELECTED_TOPIC,
        topic
    }
};
// 请求下一页action函数
export function getNextPageNumber (topic) {
    return {
        type : NEXT_PAGE,
        topic,
        page : ++pages[topic]
    }
};

// 点击主题导航请求主题列表数据的action函数
export function postTopicList (options) {
    return {
        types : [START_POST_TOPICLIST , RECEIVE_TOPICLIST , FAIL_POST_TOPICLIST],
        callApi : () => fetch(options.url),
        shouldCallApi : state => {
            let data = state.topicList && state.topicList[options.topic];
            if (!data) {
                return true;
            } else {
                return false;
            }
        },
        payload : {topic : options.topic}
    }
};

// 请求下一页主题列表数据的aciton函数
export function postNextTopicList (options) {
    return {
        types : [START_POST_NEXT_TOPICLIST , RECEVIE_NEXT_TOPICLIST , FAIL_POST_NEXT_TOPICLIST],
        callApi : () => fetch(options.url),
        shouldCallApi : state => {
            let data = state.topicList[options.topic];
            if (!data.isFetching) {
                return true;
            } else {
                return false;
            }
        },
        payload : {topic : options.topic}
    }
};

export function postTopicContent (options) {
    return {
        types : [START_POST_TOPIC_CONTENT , RECEVIE_TOPIC_CONTENT , FAIL_TOPIC_CONTENT],
        callApi : () => fetch(options.url),
        shouldCallApi : state => {
            let data = state.content[options.id];
            if (!data) {
                return true;
            } else {
                return false;
            }
        },
        payload : {id : options.id}
    }
};

// 收藏主题功能
export function postCollectTopic (options) {
    return {
        types : [START_POST_COLLECT_TOPIC , SUCCESS_POST_COLLECT_TOPIC , FAIL_POST_COLLECT_TOPIC],
        callApi : () => fetch(options.url , {
            method : 'post',
            body : JSON.stringify(options.data),
            headers : {
                'content-type' : 'application/json'
            }
        }),
        payload : {
            method : 'post',  // 通过payload来区别该请求是点击收藏还是获取收藏状态，如果是post那么表示这个请求是用户点击按钮收藏主题，如果是get那么表示这个请求是获取用户之前已收藏的主题
            id : options.data.topic_id
        }
    }
};

// 获取用户收藏主题数据
export function getCollectTopic (options) {
    return {
        types : [START_POST_COLLECT_TOPIC , SUCCESS_POST_COLLECT_TOPIC , FAIL_POST_COLLECT_TOPIC],
        callApi : () => fetch(options.url),
        payload : {method : 'get'}    // 通过payload来区别该请求是点击收藏还是获取收藏状态，如果是post那么表示这个请求是用户点击按钮收藏主题，如果是get那么表示这个请求是获取用户之前已收藏的主题
    }
};

// 取消用户收藏主题
export function deleteCollectTopic (options) {
    return {
        types : [START_POST_COLLECT_TOPIC , SUCCESS_POST_COLLECT_TOPIC , FAIL_POST_COLLECT_TOPIC],
        callApi : () => fetch(options.url , {
            method : 'post',
            body : JSON.stringify(options.data),
            headers : {
                'content-type' : 'application/json'
            }
        }),
        payload : {method : 'delete' , id : options.data.topic_id}
    }
}

export function postAccessToken (options) {
    return {
        types : [START_POST_ACCESSTOKEN , SUCCESS_POST_ACCESSTOKEN , FAIL_POST_ACCESSTOKEN],
        callApi : () => fetch(options.url , {
            method : 'POST',
            body : JSON.stringify(options.data),
            headers : {
                'content-type' : 'application/json'
            }
        }),
        payload : {
            history : options.history , 
            accesstoken : options.data.accesstoken
        },
        success : (payload) => {
            storage.set('accesstoken' , payload.accesstoken);
            payload.history.go(-1);
        }
    }
};




