import React , { Component } from 'react';
import Nav from '../components/Nav/Nav';
import List from '../containers/List/List';
import { posts } from '../actions/list';
import { connect } from 'react-redux';
class Index extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(posts('all'));
    }
    componentWillReceiveProps (nextProps) {
        console.log(this.props.location.search.slice(5));
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
}
export default connect(mapStateToProps)(Index);