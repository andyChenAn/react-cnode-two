import React , { Component } from 'react';
import './TopicInner.css';
import { connect } from 'react-redux';
import { postTopicContent } from '../../actions/index';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import TopicContent from '../../components/TopicContent/TopicContent';
class TopicInner extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        this.setState({
            id
        });
        dispatch(postTopicContent({
            url : `https://cnodejs.org/api/v1/topic/${id}`,
            id : id
        }));
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render () {
        const { content } = this.props;
        const { id } = this.state;
        return (
            <div>
                <Header title="详情" leftIcon="fanhui" goBack={this.goBack} />
                {
                    content[id] && content[id].isFetching ?
                    <Loading /> :
                    content[id] && !content[id].isFetching ?
                    <TopicContent content={content[id]} /> : 
                    null
                }
            </div>
        )
    }
};
const mapStateToProps = state => {
    const { content } = state;
    return {
        content
    }
};
export default connect(mapStateToProps)(TopicInner);