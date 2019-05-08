import React , { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import ListItem from '../../components/ListItem/ListItem';
import Error from '../../components/Error/Error';
import './List.css';
class List extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { isFetching , postByTopic , selectedTopic , error } = this.props;
        let topicList = postByTopic[selectedTopic];
        return (
            <div className="list-box">
                {
                    isFetching ? 
                    <Loading /> :
                    error ?
                    <Error /> :
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
    const { postByTopic , isFetching , selectedTopic , error } = state;
    return {
        postByTopic,
        isFetching,
        selectedTopic,
        error
    }
};
export default connect(mapStateToProps)(List);