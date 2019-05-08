import React , { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import ListItem from '../../components/ListItem/ListItem';
class List extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { isFetching , postByTopic , selectedTopic } = this.props;
        let topicList = postByTopic[selectedTopic];
        return (
            <div>
                {
                    isFetching ? 
                    <Loading /> :
                    <ul>
                        {
                            topicList.map((topic , index) => {
                                return <ListItem topic={topic} key={topic.id} />
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
};
const mapStateToProps = function (state) {
    const { postByTopic , isFetching , selectedTopic } = state;
    return {
        postByTopic,
        isFetching,
        selectedTopic
    }
};
export default connect(mapStateToProps)(List);