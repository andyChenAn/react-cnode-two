import React , { Component } from 'react';
import { connect } from 'react-redux';
import { selectTopic , postTopicList , getNextPageNumber , postNextTopicList } from '../../actions/index';
import TopicNav from '../../components/TopicNav/TopicNav';
import TopicList from '../../containers/TopicList/TopicList';
class Index extends Component {
    constructor (props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount () {
        const { dispatch , location } = this.props;
        let topic = location.search.slice(5) ? location.search.slice(5) : 'all';
        // 目前选择的topic是哪一个
        dispatch(selectTopic(topic));
        // 请求对应的topic列表数据
        dispatch(postTopicList({
            url : `https://cnodejs.org/api/v1/topics?limit=${10}&tab=${topic}`,
            topic : topic
        }));
        window.addEventListener('scroll' , this.handleScroll);
    }
    componentWillUnmount () {
        window.removeEventListener('scroll' , this.handleScroll);
    }
    handleScroll () {
        const { dispatch , selectedTopic , topicList } = this.props;
        // 如果列表正在请求，那么滚动时就触发请求，直到请求结束后
        if (topicList[selectedTopic].isFetching) {
            return;
        }
        let winH = window.innerHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // scrollTop !== 0，这个判断是因为在tab切换的时候，scrollTop会是0
        if (scrollTop + winH >= scrollHeight && scrollTop !== 0) {
            dispatch(getNextPageNumber(selectedTopic));
            const { pages } = this.props;
            dispatch(postNextTopicList({
                url : `https://cnodejs.org/api/v1/topics?limit=${10}&tab=${selectedTopic}&page=${pages[selectedTopic]}`,
                topic : selectedTopic
            }));
        }
    }
    componentWillReceiveProps (nextProps) {
        let { dispatch , selectedTopic } = this.props;
        let newTopic = nextProps.location.search.slice(5) ? nextProps.location.search.slice(5) : 'all';
        if (selectedTopic !== newTopic) {
            dispatch(selectTopic(newTopic));
            dispatch(postTopicList({
                url : `https://cnodejs.org/api/v1/topics?limit=${10}&tab=${newTopic}`,
                topic : newTopic
            }))
        }
    }
    render () {
        const { selectedTopic , topicList } = this.props;
        return (
            <div>
                <TopicNav topic={selectedTopic} />
                {topicList[selectedTopic] && <TopicList topicList={topicList[selectedTopic]} />}
            </div>
        )
    }
};
const mapStateToProps = state => {
    const { selectedTopic , topicList , pages } = state;
    return {
        selectedTopic,
        topicList,
        pages
    }
}
export default connect(mapStateToProps)(Index);