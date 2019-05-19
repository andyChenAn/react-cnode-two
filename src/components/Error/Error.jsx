import React , { Component } from 'react';
import './Error.css';
class Error extends Component {
    render () {
        const { error } = this.props;
        return (
            <div className="error-box">
                {
                    error.status === 404 ?
                    <div style={{color : "#f00"}}>请求的页面资源未找到</div> :
                    <div>{error.statusText}</div>
                }
            </div>
        )
    }
};
export default Error;