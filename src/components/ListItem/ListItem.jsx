import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListItem.css';
class ListItem extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { topic } = this.props;
        return (
            <li className="topic-item">
                <Link className="topic-link" to={`/topic/${topic.id}`}>
                    <div className="avatar-box">
                        <img className="avatar" src={topic.avatar} alt=""/>
                    </div>
                    <div className="topic-item-content">
                        <div className="item-title segmetation">{topic.title}</div>
                        <div className="item-author segmetation">作者：{topic.author}</div>
                        <div className="item-publish-date segmetation">发布时间：{topic.create_at}</div>
                    </div>
                </Link>
            </li>
        )
    }
}
export default ListItem;