const START_POST_TOPICLIST = 'START_POST_TOPIC';
const RECEIVE_TOPICLIST = 'RECEIVE_TOPICLIST';
const FAIL_POST_TOPICLIST = 'FAIL_POST_TOPICLIST';
const START_POST_NEXT_TOPICLIST = 'START_POST_NEXT_TOPICLIST';
const RECEVIE_NEXT_TOPICLIST = 'RECEVIE_NEXT_TOPICLIST';
const FAIL_POST_NEXT_TOPICLIST = 'FAIL_POST_NEXT_TOPICLIST';
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

describe('测试reducer函数topicList' , () => {
    it('应该返回初始值' , () => {
        const expectedValue = {};
        expect(topicList(undefined , {})).toEqual(expectedValue);
    });
    it('应该返回主题为share的列表数据' , () => {
        const expectedValue = {
            share : {
                isFetching : false,
                items : [
                    {
                        id: "5cbfd9aca86ae80ce64b3175",
                        tab: "share",
                        title: "Node 12 值得关注的新特性",
                        reply_count: 38,
                        visit_count: 27945,
                        create_at: "2019-04-24T03:36:12.582Z",
                        author: 'atian25',
                        avatar : 'https://avatars2.githubusercontent.com/u/227713?v=4&s=120'
                    }
                ],
                error : ''
            }
        };
        const value = topicList(undefined , {
            topic : 'share',
            type : RECEIVE_TOPICLIST,
            data : [{
                id: "5cbfd9aca86ae80ce64b3175",
                author_id: "4f447c2f0a8abae26e01b27d",
                tab: "share",
                title: "Node 12 值得关注的新特性",
                last_reply_at: "2019-05-17T10:18:39.290Z",
                good: false,
                top: true,
                reply_count: 38,
                visit_count: 27945,
                create_at: "2019-04-24T03:36:12.582Z",
                author: {
                    loginname: "atian25",
                    avatar_url: "https://avatars2.githubusercontent.com/u/227713?v=4&s=120"
                }
            }]
        });
        expect(value).toEqual(expectedValue);
    });
});