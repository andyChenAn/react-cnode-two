import React , { Component } from 'react';
import Header from '../../components/Header/Header';
import { postsIfNeed } from '../../actions/index';
import TopicContent from '../../components/TopicContent/TopicContent';
import Loading from '../../components/Loading/Loading';
import { connect } from 'react-redux';
class TopicInfo extends Component {
    constructor (props) {
        super(props);
    }
    goBack = () => {
        this.props.history.goBack();
    }
    componentDidMount () {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        window.scrollTo(0 , 0);
        dispatch(postsIfNeed({
            ID : 'topicInfo',
            name : id,
            data : {
                method : 'get',
                url : `https://cnodejs.org/api/v1/topic/${id}`
            }
        }));
    }
    render () {
        const { isFetching , topicInfo , collectByTopic } = this.props;
        const id = this.props.match.params.id;
        return (
            <div>
                <Header title="详情" goBack={this.goBack} leftIcon="fanhui" />
                {
                    isFetching ?
                    <Loading /> :
                    <TopicContent data={topicInfo[id]} collectByTopic={collectByTopic} />
                }
            </div>
        )
    }
};
const mapStateToProps = function (state) {
    const { isFetching , topicInfo , collectByTopic } = state;
    return {
        isFetching,
        topicInfo,
        collectByTopic
    }
}


export default connect(mapStateToProps)(TopicInfo);