import { asyncFetch } from '../../utils';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { 
    START_POST_TOPIC_CONTENT , 
    RECEVIE_TOPIC_CONTENT , 
    FAIL_TOPIC_CONTENT,
    postTopicContent
} from '../../actions/index';

const middlewares = [asyncFetch];
const mockStore = configureMockStore(middlewares);

describe('测试请求主题列表详情的action' , () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('当请求成功时' , () => {
        nock(`https://cnodejs.org`)
        .get('/api/v1/topic/5433d5e4e737cbe96dcef312')
        .reply(200 , {
            type : RECEVIE_TOPIC_CONTENT,
            id : '5433d5e4e737cbe96dcef312',
            data : {}
        });
        const expectedAction = [
            {type : START_POST_TOPIC_CONTENT , id : '5433d5e4e737cbe96dcef312'},
            {type : RECEVIE_TOPIC_CONTENT , id : '5433d5e4e737cbe96dcef312' , data : {}}
        ];
        const store = mockStore({
            content : {}
        });
        return store.dispatch(postTopicContent({
            url : `https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312`,
            id : '5433d5e4e737cbe96dcef312'
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('当请求失败时' , () => {
        nock(`https://cnodejs.org`)
        .get('/api/v1/topic1/5433d5e4e737cbe96dcef312')
        .reply(404 , {
            id : '5433d5e4e737cbe96dcef312',
            type : FAIL_TOPIC_CONTENT,
            error : {
                status : 404,
                statusText : 'Not Found'
            }
        });
        const expectedAction = [
            {type : START_POST_TOPIC_CONTENT , id : '5433d5e4e737cbe96dcef312'},
            {type : FAIL_TOPIC_CONTENT , id : '5433d5e4e737cbe96dcef312' , error : {
                status : 404,
                statusText : 'Not Found'
            }}
        ];
        const store = mockStore({
            content : {}
        });
        return store.dispatch(postTopicContent({
            url : `https://cnodejs.org/api/v1/topic1/5433d5e4e737cbe96dcef312`,
            id : '5433d5e4e737cbe96dcef312'
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
});