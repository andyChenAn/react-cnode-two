import React , { Component } from 'react';
import './TopicInner.css';
import { connect } from 'react-redux';
import { storage } from '../../utils';
import { postTopicContent , getCollectTopic , postCollectTopic , deleteCollectTopic } from '../../actions/index';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import TopicContent from '../../components/TopicContent/TopicContent';
import Error from '../../components/Error/Error';
class TopicInner extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        const user = JSON.parse(storage.get('user'));
        this.setState({
            id
        });
        // 请求主题内容
        dispatch(postTopicContent({
            url : `https://cnodejs.org/api/v1/topic/${id}`,
            id : id
        }));
        // 获取用户收藏主题列表
        if (user) {
            dispatch(getCollectTopic({
                url : `https://cnodejs.org/api/v1/topic_collect/${user.loginname}`
            }));
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }
    collect = () => {
        const { dispatch , history } = this.props;
        const { id } = this.state;
        let accesstoken = storage.get('accesstoken');
        if (!accesstoken) {
            history.push('/login');
            return;
        }
        dispatch(postCollectTopic({
            url : `https://cnodejs.org/api/v1/topic_collect/collect`,
            data : {
                accesstoken : accesstoken,
                topic_id : id
            }
        }));
    }
    deCollect = (e) => {
        const { dispatch } = this.props;
        const topic_id = e.target.dataset.id;
        const accesstoken = storage.get('accesstoken');
        if (!accesstoken) {
            history.push('/login');
            return;
        }
        dispatch(deleteCollectTopic({
            url : `https://cnodejs.org/api/v1/topic_collect/de_collect`,
            data : {
                accesstoken,
                topic_id
            }
        }));
    }
    render () {
        const { content , history , collection } = this.props;
        const { id } = this.state;
        return (
            <div>
                <Header title="详情" leftIcon="fanhui" goBack={this.goBack} />
                {
                    content[id] && content[id].isFetching ?
                    <Loading /> :
                    content[id] && (!content[id].error) && !content[id].isFetching ?
                    <TopicContent collection={collection} deCollect={this.deCollect} collect={this.collect} history={history} content={content[id]} /> : 
                    content[id] && content[id].error ?
                    <Error error={content[id].error} /> :
                    null
                }
            </div>
        )
    }
};
const mapStateToProps = state => {
    const { content , collection } = state;
    return {
        content,
        collection
    }
};
export default connect(mapStateToProps)(TopicInner);