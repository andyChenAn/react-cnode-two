import React , { Component } from 'react';
import Enzyme , { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header/Header';
function setup () {
    const props = {
        title : '详情',
        leftIcon : 'hanhui',
        goBack : jest.fn()
    };
    const enzymeWrapper = shallow(<Header {...props} />);
    return {
        props,
        enzymeWrapper
    }
};
Enzyme.configure({adapter : new Adapter()});
describe('测试Header组件' , () => {
    it('应该会渲染出主题详情的页面头部' , () => {
        const { enzymeWrapper , props } = setup();
        expect(enzymeWrapper.find('header').hasClass('topic-info-title')).toBe(true);
        expect(enzymeWrapper.find('div').hasClass('topic-title-inner')).toBe(true);
        expect(enzymeWrapper.find('span.info-title').hasClass('info-title')).toBe(true);
        expect(enzymeWrapper.find('span.info-title').text()).toBe(props.title);
        expect(enzymeWrapper.find('span.iconfont').hasClass(`icon-${props.leftIcon}`)).toBe(true);
        const span = enzymeWrapper.find('span.iconfont');
        // 点击返回上一页按钮
        span.props().onClick();
        expect(props.goBack.mock.calls.length).toBe(1);
        span.props().onClick();
        expect(props.goBack.mock.calls.length).toBe(2);
    })
});