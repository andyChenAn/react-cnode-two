import React , { Component } from 'react';
import Enzyme , { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from '../../components/ListItem/ListItem';
function setup () {
    const props = {
        topic : {
            author: "atian25",
            avatar: "https://avatars2.githubusercontent.com/u/227713?v=4&s=120",
            create_at: "2019-04-24T03:36:12.582Z",
            id: "5cbfd9aca86ae80ce64b3175",
            reply_count: 41,
            tab: "share",
            title: "Node 12 值得关注的新特性",
            visit_count: 30622
        }
    };
    const enzymeWrapper = shallow(<ListItem {...props} />);
    return {
        props,
        enzymeWrapper
    }
};
Enzyme.configure({adapter : new Adapter()});
describe('测试ListItem组件' , () => {
    it('应该会渲染出一个主题id为"5cbfd9aca86ae80ce64b3175"的主题列表内容' , () => {
        const { enzymeWrapper , props } = setup();
        expect(enzymeWrapper.find('li').hasClass('topic-item')).toBe(true);
        expect(enzymeWrapper.find('Link').hasClass('topic-link')).toBe(true);
        expect(enzymeWrapper.find('Link').props().to).toBe(`/topic/${props.topic.id}`);
        expect(enzymeWrapper.find('img').hasClass('avatar')).toBe(true);
        expect(enzymeWrapper.find('img').props().src).toBe(`${props.topic.avatar}`);
        expect(enzymeWrapper.find('.item-title').text()).toBe(`${props.topic.title}`);
        expect(enzymeWrapper.find('.item-author').text()).toBe(`作者：${props.topic.author}`);
        expect(enzymeWrapper.find('.item-publish-date').text()).toBe(`发布时间：${props.topic.create_at}`);
    })
})
