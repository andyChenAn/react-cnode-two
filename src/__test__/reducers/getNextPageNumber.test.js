const NEXT_PAGE = 'NEXT_PAGE';
function setNextPageNumber (state={
    all : 1,
    good : 1,
    share : 1,
    ask : 1,
    job : 1
} , action) {
    switch (action.type) {
        case NEXT_PAGE :
        return Object.assign({} , state , {
            [action.topic] : action.page
        });
        default : 
        return state;
    }
};
const pages = {
    all : 1,
    share : 1,
    good : 1,
    ask : 1,
    job : 1
};
describe('测试获取下一页页数的reducer' , () => {
    it('应该会获取"share"主题列表的第二页页数' , () => {
        const expectedValue = {
            all : 1,
            good : 1,
            share : 2,
            ask : 1,
            job : 1
        };
        const value = setNextPageNumber(undefined , {
            type : NEXT_PAGE,
            page : ++pages['share'],
            topic : 'share'
        });
        expect(value).toEqual(expectedValue);
    });
    it('应该会获取"good"主题列表的第二个页数' , () => {
        const expectedValue = {
            all : 1,
            good : 2,
            share : 2,
            ask : 1,
            job : 1
        };
        const value = setNextPageNumber({
            all : 1,
            good : 1,
            share : 2,
            ask : 1,
            job : 1
        } , {
            type : NEXT_PAGE,
            topic : 'good',
            page : ++pages['good']
        });
        expect(value).toEqual(expectedValue);
    })
});