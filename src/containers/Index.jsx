import React , { Component } from 'react';
import Nav from '../components/Nav/Nav';
import List from '../containers/List/List';
import { connect } from 'react-redux';
import { selectTopic , postsIfNeed , postNextPageTopic , getNextPage } from '../actions/index';
class Index extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        const { dispatch , location } = this.props;
        let topic = location.search.slice(5) ? location.search.slice(5) : 'all';
        dispatch(selectTopic(topic));
        dispatch(postsIfNeed({
            ID : 'topic',
            name : topic,
            data : {
                url : 'https://cnodejs.org/api/v1/topics',
                params : {
                    tab : topic,
                    limit : 10
                },
                method : 'get'
            }
        }));
        window.addEventListener('scroll' , this.handleScroll.bind(this));
    }
    handleScroll () {
        const { dispatch , selectedTopic } = this.props;
        let winH = window.innerHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop + winH >= scrollHeight && scrollTop !== 0) {
            dispatch(getNextPage(selectedTopic));
            const { pages } = this.props;
            dispatch(postNextPageTopic({
                url : 'https://cnodejs.org/api/v1/topics',
                data : {
                    params : {
                        limit : 10,
                        tab : selectedTopic,
                        page : pages[selectedTopic]
                    }
                }
            }))
        }
    }
    componentWillReceiveProps (nextProps) {
        let selectedTopic = nextProps.location.search.slice(5) ? nextProps.location.search.slice(5) : 'all';
        let oldSelectedTopic = this.props.location.search.slice(5) ? this.props.location.search.slice(5) : 'all';
        let { dispatch } = nextProps;
        if (selectedTopic !== oldSelectedTopic) {
            dispatch(selectTopic(selectedTopic));
            dispatch(postsIfNeed({
                name : selectedTopic,
                ID : 'topic',
                data : {
                    method : 'get',
                    url : 'https://cnodejs.org/api/v1/topics',
                    params : {
                        tab : selectedTopic,
                        limit : 10
                    }
                }
            }));
        }
    }
    render () {
        const { selectedTopic , postByTopic , isFetching , error } = this.props;
        return (
            <div>
                <Nav topic={selectedTopic} />
                <List postByTopic={postByTopic} isFetching={isFetching} selectedTopic={selectedTopic} error={error}  />
            </div>
        )
    }
};
const mapStateToProps = function (state) {
    const { postByTopic , isFetching , selectedTopic , error , pages } = state;
    return {
        postByTopic,
        isFetching,
        selectedTopic,
        error,
        pages
    }
};
export default connect(mapStateToProps)(Index);