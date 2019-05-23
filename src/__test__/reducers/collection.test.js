const START_POST_COLLECT_TOPIC = 'START_POST_COLLECT_TOPIC';
const SUCCESS_POST_COLLECT_TOPIC = 'SUCCESS_POST_COLLECT_TOPIC';
const FAIL_POST_COLLECT_TOPIC = 'FAIL_POST_COLLECT_TOPIC';
function collection (state={} , action) {
    switch (action.type) {
        case START_POST_COLLECT_TOPIC :
        if (action.method === 'get' || action.method === 'delete') {
            return state;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : true,
                    collected : false
                }
            });
        }
        case SUCCESS_POST_COLLECT_TOPIC :
        if (action.method === 'get') {
            let res = {};
            action.data.forEach(item => {
                res[item.id] = {
                    isFetching : false,
                    collected : true
                }
            });
            return res;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : false,
                    collected : true,
                }
            });
        } else if (action.method === 'delete') {
            let res = JSON.parse(JSON.stringify(state));
            delete res[action.id];
            return res;
        };
        case FAIL_POST_COLLECT_TOPIC :
        if (action.method === 'get' || action.method === 'delete') {
            return state;
        } else if (action.method === 'post') {
            return Object.assign({} , state , {
                [action.id] : {
                    isFetching : false,
                    collected : false
                }
            });
        }
        default : 
        return state;
    }
};
describe('测试主题收藏的reducer' , () => {
    it('应该会返回初始值' , () => {
        const expectedValue = {};
        const value = collection(undefined , {});
        expect(value).toEqual(expectedValue);
    });
    it('开始请求收藏主题id为"5cbfd9aca86ae80ce64b3175"的主题' , () => {
        const expectedValue = {
            "5cbfd9aca86ae80ce64b3175" : {
                isFetching : true,
                collected : false
            }
        };
        const value = collection(undefined , {
            type : START_POST_COLLECT_TOPIC,
            method : 'post',
            id : '5cbfd9aca86ae80ce64b3175'
        });
        expect(value).toEqual(expectedValue);
    });
    it('成功请求收藏主题id为"5cbfd9aca86ae80ce64b3175"的主题' , () => {
        const expectedValue = {
            "5cbfd9aca86ae80ce64b3175" : {
                isFetching : false,
                collected : true
            }
        };
        const value = collection(undefined , {
            type : SUCCESS_POST_COLLECT_TOPIC,
            method : 'post',
            id : '5cbfd9aca86ae80ce64b3175'
        });
        expect(value).toEqual(expectedValue);
    });
    it('请求收藏主题id为"5cbfd9aca86ae80ce64b3175"的主题失败时' , () => {
        const expectedValue = {
            "5cbfd9aca86ae80ce64b3175" : {
                isFetching : false,
                collected : false
            }
        };
        const value = collection(undefined , {
            type : FAIL_POST_COLLECT_TOPIC,
            method : 'post',
            id : '5cbfd9aca86ae80ce64b3175'
        });
        expect(value).toEqual(expectedValue);
    });
    it('请求成功取消收藏主题id为"5cbfd9aca86ae80ce64b3175"的主题' , () => {
        const expectedValue = {};
        const value = collection({
            "5cbfd9aca86ae80ce64b3175" : {
                isFetching : false,
                collected : true
            }
        } , {
            type : SUCCESS_POST_COLLECT_TOPIC,
            method : 'delete',
            id : '5cbfd9aca86ae80ce64b3175'
        });
        expect(value).toEqual(expectedValue);
    });
});