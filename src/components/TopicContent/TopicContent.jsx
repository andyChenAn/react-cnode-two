import React , { Component } from 'react';
import './TopicContent.css';
class TopicContent extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { data } = this.props;
        console.log(data);
        return (
            <div className="topic-info-box">
                {
                    data &&
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
                        </div>
                    </div>
                }
            </div>
        )
    }
};
export default TopicContent;