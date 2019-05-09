import React , { Component } from 'react';
import Header from '../../components/Header/Header';
class TopicInfo extends Component {
    constructor (props) {
        super(props);
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render () {
        return (
            <div>
                <Header title="详情" goBack={this.goBack} leftIcon="fanhui" />
            </div>
        )
    }
}
export default TopicInfo;