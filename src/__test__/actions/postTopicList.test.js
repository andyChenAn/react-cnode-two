import { asyncFetch } from '../../utils';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { 
    START_POST_TOPICLIST , 
    RECEIVE_TOPICLIST , 
    FAIL_POST_TOPICLIST,
    postTopicList
} from '../../actions/index';

const middlewares = [asyncFetch];
const mockStore = configureMockStore(middlewares);

describe('测试请求"share"主题列表数据的action' , () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('当请求成功时' , () => {
        nock(`https://cnodejs.org`)
        .get('/api/v1/topics?limit=10&tab=share')
        .reply(200 , {
            topic : 'share',
            type : RECEIVE_TOPICLIST,
            data : {}
        });
        const expectedAction = [
            {type : START_POST_TOPICLIST , topic : 'share'},
            {type : RECEIVE_TOPICLIST , topic : 'share' , data : {}}
        ];
        const store = mockStore({
            topicList : {}
        });
        return store.dispatch(postTopicList({
            url : `https://cnodejs.org/api/v1/topics?limit=10&tab=share`,
            topic : 'share'
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('当请求失败时' , () => {
        nock(`https://cnodejs.org`)
        .get('/api/v1/topics1?limit=10&tab=share')
        .reply(404 , {
            topic : 'share',
            type : FAIL_POST_TOPICLIST,
            error : {
                status : 404,
                statusText : 'Not Found'
            }
        });
        const expectedAction = [
            {type : START_POST_TOPICLIST , topic : 'share'},
            {type : FAIL_POST_TOPICLIST , topic : 'share' , error : {
                status : 404,
                statusText : 'Not Found'
            }}
        ];
        const store = mockStore({});
        return store.dispatch(postTopicList({
            url : `https://cnodejs.org/api/v1/topics1?limit=10&tab=share`,
            topic : 'share'
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
});