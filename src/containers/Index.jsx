import React , { Component } from 'react';
import Nav from '../components/Nav/Nav';
import List from '../containers/List/List';
import { posts } from '../actions/list';
import { connect } from 'react-redux';
import { selectTopic } from '../actions/list';
class Index extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        const { dispatch , location } = this.props;
        let topic = location.search.slice(5) ? location.search.slice(5) : 'all';
        dispatch(selectTopic(topic));
        dispatch(posts(topic));
    }
    componentWillReceiveProps (nextProps) {
        let selectedTopic = nextProps.location.search.slice(5) ? nextProps.location.search.slice(5) : 'all';
        let oldSelectedTopic = this.props.location.search.slice(5) ? this.props.location.search.slice(5) : 'all';
        let { dispatch } = nextProps;
        if (selectedTopic !== oldSelectedTopic) {
            dispatch(selectTopic(selectedTopic));
            dispatch(posts(selectedTopic));
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
    const { selectedTopic , postByTopic } = state;
    return {
        selectedTopic
    }
};
export default connect(mapStateToProps)(Index);