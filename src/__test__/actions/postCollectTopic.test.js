import { asyncFetch } from '../../utils';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { 
    START_POST_COLLECT_TOPIC , 
    SUCCESS_POST_COLLECT_TOPIC , 
    FAIL_POST_COLLECT_TOPIC,
    postCollectTopic,
    deleteCollectTopic
} from '../../actions/index';

const middlewares = [asyncFetch];
const mockStore = configureMockStore(middlewares);

describe('测试收藏的aciton' , () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('当点击收藏成功时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/collect' , {
            accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
            topic_id : '5bd4772a14e994202cd5bdb7'
        })
        .reply(200 , {
            data : {
                success : true,
            },
            type : SUCCESS_POST_COLLECT_TOPIC,
            method : 'post',
            id : '5bd4772a14e994202cd5bdb7'
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'post'},
            {type : SUCCESS_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'post' , data : {
                success : true
            }}
        ];
        return store.dispatch(postCollectTopic({
           url : 'https://cnodejs.org/api/v1/topic_collect/collect',
           data : {
               accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
               topic_id : '5bd4772a14e994202cd5bdb7'
           }
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('当点击取消收藏成功时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/de_collect' , {
            accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
            topic_id : '5bd4772a14e994202cd5bdb7'
        })
        .reply(200 , {
            method : 'delete',
            type : 'SUCCESS_POST_COLLECT_TOPIC',
            id : '5bd4772a14e994202cd5bdb7',
            data : {
                success : true
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'delete'},
            {type : SUCCESS_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'delete' , data : {
                success : true
            }}
        ];
        return store.dispatch(deleteCollectTopic({
            url : 'https://cnodejs.org/api/v1/topic_collect/de_collect',
            data : {
                accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
                topic_id : '5bd4772a14e994202cd5bdb7'
            }
         })).then(() => {
             expect(store.getActions()).toEqual(expectedAction);
         })
    });
    it('因为没有accesstoken值或者accesstoken值错误，点击收藏失败时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/collect' , {
            accesstoken : '',     // 如果没有accesstoken或accesstoken是错误的
            topic_id : '5bd4772a14e994202cd5bdb7'
        })
        .reply(401 , {
            type : FAIL_POST_COLLECT_TOPIC,
            method : 'post',
            id : '5bd4772a14e994202cd5bdb7',
            error : {
                status : 401,
                statusText : 'Unauthorized'
            }
        })
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'post'},
            {type : FAIL_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'post' , error : {
                status : 401,
                statusText : 'Unauthorized'
            }}
        ];
        return store.dispatch(postCollectTopic({
            url : 'https://cnodejs.org/api/v1/topic_collect/collect',
            data : {
               accesstoken : '',
               topic_id : '5bd4772a14e994202cd5bdb7'
            }
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('因为没有topic_id或者topic_id值错误，点击收藏失败时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/collect' , {
            accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
            topic_id : ''     // 如果没有主题id或主题id是错误的
        })
        .reply(400 , {
            type : FAIL_POST_COLLECT_TOPIC,
            method : 'post',
            id : '',
            error : {
                status : 400,
                statusText : 'Bad Request'
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '' , method : 'post'},
            {type : FAIL_POST_COLLECT_TOPIC , id : '' , method : 'post' , error : {
                status : 400,
                statusText : 'Bad Request'
            }}
        ];
        return store.dispatch(postCollectTopic({
            url : 'https://cnodejs.org/api/v1/topic_collect/collect',
            data : {
               accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
               topic_id : ''
            }
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('因为没有accesstoken值或者accesstoken值错误，点击取消收藏失败时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/de_collect' , {
            accesstoken : '',
            topic_id : '5bd4772a14e994202cd5bdb7'
        })
        .reply(401 , {
            method : 'delete',
            id : '5bd4772a14e994202cd5bdb7',
            type : FAIL_POST_COLLECT_TOPIC,
            error : {
                status : 401,
                statusText : 'Unauthorized'
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'delete'},
            {type : FAIL_POST_COLLECT_TOPIC , id : '5bd4772a14e994202cd5bdb7' , method : 'delete' , error : {
                status : 401,
                statusText : 'Unauthorized'
            }}
        ];
        return store.dispatch(deleteCollectTopic({
            url : 'https://cnodejs.org/api/v1/topic_collect/de_collect',
            data : {
                accesstoken : '',
                topic_id : '5bd4772a14e994202cd5bdb7'
            }
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it('因为没有topic_id值或者topic_id值错误，点击取消收藏失败时' , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/topic_collect/de_collect' , {
            accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
            topic_id : ''
        })
        .reply(400 , {
            method : 'delete',
            id : '',
            type : FAIL_POST_COLLECT_TOPIC,
            error : {
                status : 400,
                statusText : 'Bad Request'
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_COLLECT_TOPIC , id : '' , method : 'delete'},
            {type : FAIL_POST_COLLECT_TOPIC , id : '' , method : 'delete' , error : {
                status : 400,
                statusText : 'Bad Request'
            }}
        ];
        return store.dispatch(deleteCollectTopic({
            url : 'https://cnodejs.org/api/v1/topic_collect/de_collect',
            data : {
                accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
                topic_id : ''
            }
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
});