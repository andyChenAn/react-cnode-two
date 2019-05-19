import React , { Component } from 'react';
import './TopicContent.css';
import Reply from '../../components/Reply/Reply';
class TopicContent extends Component {
    render () {
        const { content , collect , deCollect , collection } = this.props;
        return (
            <div className="topic-info-box">
                <div className="topic-info-header">
                    <div className="topic-info-logo-box">
                        <img className="topic-info-logo" src={content.avatar} alt=""/>
                    </div>
                    <div className="topic-info-content">
                        <div className="topic-content-title mb5">{content.title}</div>
                        <div className="mb5 topic-info-author">
                            <span className="info-author-desc">作者：</span>
                            <span className="info-author">{content.author}</span>
                        </div>
                        <div className="mb5 info-visit">浏览次数：{content.visit_count}次</div>
                        {
                            collection[content.id] ?
                            <button onClick={deCollect} data-id={content.id} className="collection is-collected">取消收藏</button> :
                            <button onClick={collect} className="collection">收藏</button>
                        }
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html : content.content}} className="topic-info-container"></div>
                <div className="topic-info-reply-box">
                    <p className="topic-reply-title">共{content.replies.length}条回复</p>
                    {
                        content.replies.map((reply) => (
                            <Reply key={reply.id} reply={reply} />
                        ))
                    }
                </div>
            </div>
        )
    }
};
export default TopicContent;