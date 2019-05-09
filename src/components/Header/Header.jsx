import React , { Component } from 'react';
import './Header.css';
class Header extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { title , leftIcon , goBack , rightIcon } = this.props;
        return (
            <div className="topic-info-title">
                <div className="topic-title-inner">
                    {
                        leftIcon && <span onClick={goBack} className={`iconfont icon-${leftIcon}`}></span>
                    }
                    <span className="info-title">{title}</span>
                </div>
            </div>
        )
    }
};
export default Header;