import React , { Component } from 'react';
import './TopicContent.css';
import Reply from '../../components/Reply/Reply';
import axios from 'axios';
import { connect } from 'react-redux';
import { collectTopic } from '../../actions/list';
class TopicContent extends Component {
    constructor (props) {
        super(props);
    }
    collect = () => {
        const { id } = this.props.data;
        const { dispatch } = this.props;
        dispatch(collectTopic({
            topic_id : id,
            accesstoken : '3949d1e4-f391-4574-8378-09ce61e8a0e7'
        }));
    }
    componentDidMount () {
        
    }
    render () {
        const { data , collectedTopic} = this.props;
        let isCollected = false;
        if (data) {
            isCollected = collectedTopic[data.id] ? collectedTopic[data.id].collected : false;
        }
        return (
            <div className="topic-info-box">
                {
                    data &&
                    <div>
                        <div className="topic-info-header">
                            <div className="topic-info-logo-box">
                                <img className="topic-info-logo" src={data.avatar} alt=""/>
                            </div>
                            <div className="topic-info-content">
                                <div className="topic-content-title mb5">{data.title}</div>
                                <div className="mb5 topic-info-author">
                                    <span className="info-author-desc">作者：</span>
                                    <span className="info-author">{data.author}</span>
                                </div>
                                <div className="mb5 info-visit">浏览次数：{data.visit_count}次</div>
                                {
                                    isCollected ?
                                    <button onClick={this.collect} className="collection is-collected">取消收藏</button> :
                                    <button onClick={this.collect} className="collection">收藏</button>
                                }
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html : data.content}} className="topic-info-container"></div>
                        <div className="topic-info-reply-box">
                            <p className="topic-reply-title">共{data.replies.length}条回复</p>
                            {
                                data.replies.map((reply) => (
                                    <Reply key={reply.id} reply={reply} />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
};
const mapStateToProps = function (state) {
    const { collectedTopic } = state;
    return {
        collectedTopic
    }
};
export default connect(mapStateToProps)(TopicContent);