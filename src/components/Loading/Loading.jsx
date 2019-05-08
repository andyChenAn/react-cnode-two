import React , { Component } from 'react';
import './Loading.css';
class Loading extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div>
                <div className="loading"></div>
            </div>
        )
    }
};
export default Loading;