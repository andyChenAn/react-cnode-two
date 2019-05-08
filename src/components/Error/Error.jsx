import React , { Component } from 'react';
import './Error.css';
class Error extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="error">请求异常！</div>
        )
    }
};
export default Error;