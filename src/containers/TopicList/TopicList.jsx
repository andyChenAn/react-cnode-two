import React , { Component } from 'react';
import './TopicList.css';
import ListItem from '../../components/ListItem/ListItem';
import Loading from '../../components/Loading/Loading';
class TopicList extends Component {
    render () {
        const { items , isFetching } = this.props.topicList;
        return (
            <div className="topic-list-box">
                {
                    isFetching ?
                    <Loading /> :
                    items.map(topic => {
                        return <ListItem topic={topic} key={topic.id} />
                    })
                }
            </div>
        )
    }
};
export default TopicList;