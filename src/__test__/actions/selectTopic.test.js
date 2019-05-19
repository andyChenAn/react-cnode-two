import { SELECTED_TOPIC , selectTopic } from '../../actions/index';
describe('测试选择主题aciton' , () => {
    it('应该会创建一个选择"share"主题的action' , () => {
        const topic = 'share';
        const expectedAction = {
            type : SELECTED_TOPIC,
            topic
        };
        expect(selectTopic(topic)).toEqual(expectedAction);
    })
});