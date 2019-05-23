import React , { Component } from 'react';
import './Login.css';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { postAccessToken } from '../../actions/index';
import { storage } from '../../utils';
class Login extends Component {
    constructor (props) {
        super(props);
        this.inputRef = React.createRef();
    }
    goBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    login = () => {
        const { dispatch , history } = this.props;
        const accesstoken = this.inputRef.value;
        if (!accesstoken.trim()) {
            return;
        };
        dispatch(postAccessToken({
            url : 'https://cnodejs.org/api/v1/accesstoken',
            data : {
                accesstoken
            },
            history
        })).then(res => {
            const user = JSON.stringify(res.data);
            storage.set('accesstoken' , res.accesstoken);
            storage.set('user' , user);
            history.go(-1);
        });
    }
    render () {
        const { accesstoken } = this.props;
        return (
            <div>
                <Header title="登录" leftIcon="fanhui" goBack={this.goBack} />
                <div className="login-box">
                    <input ref={(node) => this.inputRef = node} type="text" className="login-input" placeholder="请输入accessToken"/>
                    <button onClick={this.login} className="login-button">
                        {
                            !accesstoken.isFetching && accesstoken.validate===null ?
                            '登录' :
                            accesstoken.isFetching && accesstoken.validate===false ?
                            '验证中，请稍后...' :
                            !accesstoken.isFetching && accesstoken.validate===true ?
                            '验证成功' :
                            '验证失败，请重新登录'
                        }
                    </button>
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => {
    const { accesstoken } = state;
    return {
        accesstoken
    }
};
export default connect(mapStateToProps)(Login);