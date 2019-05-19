import { NEXT_PAGE , getNextPageNumber } from '../../actions/index';
describe('测试获取下一页的页数action' , () => {
    it('获取第二页页数' , () => {
        const topic = 'share';
        const expectedAction = {
            type : NEXT_PAGE,
            topic,
            page : 2
        };
        expect(getNextPageNumber(topic)).toEqual(expectedAction);
    })
});