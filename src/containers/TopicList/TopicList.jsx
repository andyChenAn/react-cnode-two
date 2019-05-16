import React , { Component } from 'react';
import './TopicList.css';
import ListItem from '../../components/ListItem/ListItem';
import Loading from '../../components/Loading/Loading';
import LoadMore from '../../components/LoadMore/LoadMore';
class TopicList extends Component {
    render () {
        const { items , isFetching } = this.props.topicList;
        return (
            <div className="topic-list-box">
                {
                    // 当isFetching为true并且items.length=0时，
                    isFetching && items.length == 0 ?
                    <Loading /> :
                    items.map((topic , index) => {
                        return <ListItem topic={topic} key={index} />
                    })
                }
                {isFetching && items.length != 0 && <LoadMore />}
            </div>
        )
    }
};
export default TopicList;