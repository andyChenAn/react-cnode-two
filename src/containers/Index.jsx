import React , { Component } from 'react';
import Nav from '../components/Nav/Nav';
import List from '../containers/List/List';
import { connect } from 'react-redux';
import { selectTopic , postsIfNeed } from '../actions/index';
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
        const { selectedTopic } = this.props;
        return (
            <div>
                <Nav topic={selectedTopic} />
                <List />
            </div>
        )
    }
};
const mapStateToProps = function (state) {
    const { selectedTopic } = state;
    return {
        selectedTopic
    }
};
export default connect(mapStateToProps)(Index);