import React , { Component } from 'react';
import './Header.css';
class Header extends Component {
    render () {
        const { title , leftIcon , goBack } = this.props;
        return (
            <header className="topic-info-title">
                <div className="topic-title-inner">
                    {
                        leftIcon && <span onClick={goBack} className={`iconfont icon-${leftIcon}`}></span>
                    }
                    <span className="info-title">{title}</span>
                </div>
            </header>
        )
    }
};
export default Header;