import React , { Component } from 'react';
import Enzyme , { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Error from '../../components/Error/Error';
function setup1 () {
    const props = {
        error : {
            status : 404,
            statusText : 'Not Found'
        }
    };
    const enzymeWrapper = shallow(<Error {...props} />);
    return {
        props,
        enzymeWrapper
    }
};
function setup2 () {
    const props = {
        error : {
            status : 400,
            statusText : 'Bad Request'
        }
    };
    const enzymeWrapper = shallow(<Error {...props} />);
    return {
        props,
        enzymeWrapper
    }
}
Enzyme.configure({adapter : new Adapter()});
describe('测试Error组件' , () => {
    it('应该会渲染出status为404的Error组件' , () => {
        const { enzymeWrapper } = setup1();
        expect(enzymeWrapper.find('div.error-box').hasClass('error-box')).toBe(true);
        expect(enzymeWrapper.find('.error-text').text()).toBe('请求的页面资源未找到');
    });
    it('应该会渲染出status为400的Error组件' , () => {
        const { enzymeWrapper , props } = setup2();
        expect(enzymeWrapper.find('div.error-box').hasClass('error-box')).toBe(true);
        expect(enzymeWrapper.find('.error-text').text()).toBe(props.error.statusText);
    })
});

