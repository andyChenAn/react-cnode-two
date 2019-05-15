import fetch from 'isomorphic-fetch';
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

// 请求主题列表数据的action函数
export function postTopicList (options) {
    return {
        types : [START_POST_TOPICLIST , RECEIVE_TOPICLIST , FAIL_POST_TOPICLIST],
        callApi : () => fetch(options.url),
        shouldCallApi : state => {
            let data = state.topicList[options.topic];
            if (!data) {
                return true;
            } else if (data.isFetching) {
                return false;
            } else {
                return true;
            }
        },
        payload : {topic : options.topic}
    }
};


