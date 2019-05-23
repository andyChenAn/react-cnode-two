const START_POST_TOPIC_CONTENT = 'START_POST_TOPIC_CONTENT';
const RECEVIE_TOPIC_CONTENT = 'RECEVIE_TOPIC_CONTENT';
const FAIL_TOPIC_CONTENT = 'FAIL_TOPIC_CONTENT';
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
describe('测试获取主题详细内容的reducer' , () => {
    it('应该返回初始值' , () => {
        const expectedValue = {};
        const value = postContent(undefined , {});
        expect(value).toEqual(expectedValue);
    });
    it('应该会返回主题id为"5433d5e4e737cbe96dcef312"的主题详情请求加载中的状态' , () => {
        const expectedValue = {
            "5433d5e4e737cbe96dcef312" : {
                isFetching : true,
                error : ''
            }
        };
        const value = postContent(undefined , {
            type : START_POST_TOPIC_CONTENT,
            id : '5433d5e4e737cbe96dcef312'
        });
        expect(value).toEqual(expectedValue);
    });
    it('应该会返回主题id为"5433d5e4e737cbe96dcef312"的主题详情' , () => {
        const expectedValue = {
            "5433d5e4e737cbe96dcef312" : {
                isFetching : false,
                error : '',
                id : '5433d5e4e737cbe96dcef312',
                content : '',
                title : '一个面向 Node.js 初学者的系列课程：node-lessons',
                author : 'alsotang',
                avatar : 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120',
                replies : [],
                visit_count : 77474
            }
        };
        const value = postContent(undefined , {
            type : RECEVIE_TOPIC_CONTENT,
            id : '5433d5e4e737cbe96dcef312',
            data : {
                id : '5433d5e4e737cbe96dcef312',
                content : '',
                title : '一个面向 Node.js 初学者的系列课程：node-lessons',
                author : {
                    loginname : 'alsotang',
                    avatar_url : 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120'
                },
                replies : [],
                visit_count : 77474
            }
        });
        expect(value).toEqual(expectedValue);
    });
    it('应该会返回一个错误' , () => {
        const expectedValue = {
            "5433d5e4e737cbe96dcef31234" : {
                isFetching : false,
                error : {
                    status : 400,
                    statusText : '不是有效的话题id'
                }
            }
        };
        const value = postContent(undefined , {
            type : FAIL_TOPIC_CONTENT,
            id : '5433d5e4e737cbe96dcef31234',
            error : {
                status : 400,
                statusText : '不是有效的话题id'
            }
        });
        expect(value).toEqual(expectedValue);
    });
});