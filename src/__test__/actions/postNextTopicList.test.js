import { asyncFetch } from '../../utils';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { 
    START_POST_NEXT_TOPICLIST , 
    RECEVIE_NEXT_TOPICLIST , 
    postNextTopicList
} from '../../actions/index';

const middlewares = [asyncFetch];
const mockStore = configureMockStore(middlewares);

describe('测试获取share主题列表的下一页数据' , () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('当请求获取下一页数据成功时' , () => {
        nock('https://cnodejs.org')
        .get('/api/v1/topics?limit=10&tab=share&page=2')
        .reply(200 , {
            type : RECEVIE_NEXT_TOPICLIST,
            topic : 'share',
            data : {}
        });
        const expectedAction = [
            {type : START_POST_NEXT_TOPICLIST , topic : 'share'},
            {type : RECEVIE_NEXT_TOPICLIST , topic : 'share' , data : {}}
        ];
        // 初始值
        const store = mockStore({
            topicList : {
                share : {
                    isFetching : false,
                    items : []
                }
            }
        });
        return store.dispatch(postNextTopicList({
            url : 'https://cnodejs.org/api/v1/topics?limit=10&tab=share&page=2',
            topic : 'share'
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
})
