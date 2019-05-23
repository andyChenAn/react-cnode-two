const START_POST_ACCESSTOKEN = 'START_POST_ACCESSTOKEN';
const SUCCESS_POST_ACCESSTOKEN = 'SUCCESS_POST_ACCESSTOKEN';
const FAIL_POST_ACCESSTOKEN = 'FAIL_POST_ACCESSTOKEN';
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
            user : action.data
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
describe('测试验证token的reducer' , () => {
    it('应该会返回初始值' , () => {
        const expectedValue = {
            isFetching : false,
            validate : null
        };
        const value = accesstoken(undefined , {});
        expect(value).toEqual(expectedValue);
    });
    it('应该会返回验证token的请求中' , () => {
        const expectedValue = {
            isFetching : true,
            validate : false
        };
        const value = accesstoken(undefined , {
            type : START_POST_ACCESSTOKEN
        });
        expect(value).toEqual(expectedValue);
    });
    it('应该会成功验证token' , () => {
        const expectedValue = {
            isFetching : false,
            validate : true
        };
        const value = accesstoken(undefined , {
            type : SUCCESS_POST_ACCESSTOKEN
        });
        expect(value).toEqual(expectedValue);
    });
    it('应该会验证token失败' , () => {
        const expectedValue = {
            isFetching : false,
            validate : false
        };
        const value = accesstoken(undefined , {
            type : FAIL_POST_ACCESSTOKEN
        });
        expect(value).toEqual(expectedValue);
    })
});