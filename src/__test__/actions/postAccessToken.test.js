import { asyncFetch , storage } from '../../utils';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { 
    START_POST_ACCESSTOKEN , 
    SUCCESS_POST_ACCESSTOKEN , 
    FAIL_POST_ACCESSTOKEN,
    postAccessToken
} from '../../actions/index';

const middlewares = [asyncFetch];
const mockStore = configureMockStore(middlewares);

describe("测试验证accesstoken的action" , () => {
    it("当验证accesstoken成功时" , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/accesstoken')
        .reply(200 , {
            history : {},
            accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af',
            type : SUCCESS_POST_ACCESSTOKEN,
            data : {
                success : true,
                loginname : 'andyChenAn',
                avatar_url : 'https://avatars1.githubusercontent.com/u/18094223?v=4&s=120',
                id : '590b3319ee41dcb8037f862e'
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_ACCESSTOKEN , history : {} , accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af'},
            {type : SUCCESS_POST_ACCESSTOKEN , history : {} , accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af' , data : {
                success : true,
                loginname : 'andyChenAn',
                avatar_url : 'https://avatars1.githubusercontent.com/u/18094223?v=4&s=120',
                id : '590b3319ee41dcb8037f862e'
            }}
        ];
        return store.dispatch(postAccessToken({
            url : 'https://cnodejs.org/api/v1/accesstoken',
            data : {
                accesstoken : 'e820c735-9f43-4ad2-a3d2-e76969d949af'
            },
            history : {}
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
    it("当验证accesstoken失败时" , () => {
        nock('https://cnodejs.org')
        .post('/api/v1/accesstoken')
        .reply(401 , {
            history : {},
            accesstoken : '',
            type : FAIL_POST_ACCESSTOKEN,
            error : {
                status : 401,
                statusText : 'Unauthorized'
            }
        });
        const store = mockStore({});
        const expectedAction = [
            {type : START_POST_ACCESSTOKEN , history : {} , accesstoken : ''},
            {type : FAIL_POST_ACCESSTOKEN , history : {} , accesstoken : '' , error : {
                status : 401,
                statusText : 'Unauthorized'
            }}
        ];
        return store.dispatch(postAccessToken({
            url : 'https://cnodejs.org/api/v1/accesstoken',
            data : {
                accesstoken : ''
            },
            history : {}
        })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    });
})