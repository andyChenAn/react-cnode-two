const SELECTED_TOPIC = 'SELECTED_TOPIC';
function selectedTopic (state='all' , action) {
    switch (action.type) {
        case SELECTED_TOPIC :
        return action.topic;
        default :
        return state;
    }
};
describe('测试reducer函数selectedTopic' , () => {
    it('应该返回初始值' , () => {
        const expectedValue = 'all';
        expect(selectedTopic(undefined , {})).toEqual(expectedValue);
    });
    it('应该返回state的值是share' , () => {
        const expectedValue = 'share';
        expect(selectedTopic(undefined , {
            topic : 'share',
            type : SELECTED_TOPIC
        })).toEqual(expectedValue);
    });
});