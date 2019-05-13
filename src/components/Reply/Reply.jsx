import React , { Component } from 'react';
import './Reply.css';
class Reply extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { author , content , ups } = this.props.reply;
        return (
            <div className="reply-list">
                <div className="reply-logo-box">
                    <img className="reply-logo" src={author.avatar_url} alt=""/>
                </div>
                <div className="reply-content-box">
                    <div className="reply-user mb5">{author.loginname}</div>
                    <div dangerouslySetInnerHTML={{__html : content}} className="reply-content mb5"></div>
                    <div className="reply-icon-box">
                        <div className="reply-dianzan-box">
                            <em className="iconfont icon-dianzan"></em>
                            <span>{ups.length}</span>
                        </div>
                        <em className="iconfont icon-ico_home_reply"></em>
                    </div>
                </div>
            </div>
        )
    }
};
export default Reply;