import React, {Component} from 'react';
import {Modal, Select} from 'antd'

const { Option } = Select;

class Login extends Component {
    state = {
        visible: false,
        tabStatus:'login',
        username: "",
        password: "",
        isLogin: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleTypeChange = e => {
        this.setState({
            type: e
        })
    }

    attemptLogin = () => {
        // 模态窗消失
        this.state.visible = false;

        let url = "http://localhost:5000/loginValidness?" + "userName=" + this.state.username + "&" +
            "passWD=" + this.state.password + "&" + "type=" + this.state.type

        // 从外部取数据
        fetch(url, {
                method: "GET",
                mode: "cors",
            }
        )
        .then(response => response.json())
            .then(data => {
            console.log(data);
            if(data["identity"] == true && data["match"] == true) {
                this.setState({
                    isLogin: true
                })
                console.log(this.state.isLogin)
            }
            else {
                this.setState({
                    isLogin: false
                })
                console.log(this.state.isLogin)
            }
        }).catch(function (e) {
            console.log(e);
        });


    }

    render() {
        let {tabStatus}=this.state
        return (
            <div className='login-container'>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    className='login-modal'
                    centered={true}
                    width={384}
                    closable={false}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <div
                                className={tabStatus=='login'?'text active':'text'}
                                onClick={()=>this.changeTab('login')}>登陆
                                <span></span>
                            </div>
                            <div
                                className={tabStatus=='register'?'text active':'text'}
                                onClick={()=>this.changeTab('register')}>注册
                                <span></span>
                            </div>
                        </div>

                        {tabStatus=='login'&&<div className="login-box">
                            <div className="modal-input">
                                <div className="input-box">
                                    <input onChange={this.handleUsernameChange.bind(this)} type="text" placeholder='请输入用户名' />
                                </div>
                                <div className="input-box">
                                    <input onChange={this.handlePasswordChange.bind(this)} type="password" placeholder='请输入密码'/>
                                </div>

                                <div style={{ marginTop:16 }}>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="选择登录身份"
                                        optionFilterProp="children"
                                        onChange={this.handleTypeChange.bind(this)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="ins">教师</Option>
                                        <Option value="stu">学生</Option>
                                        <Option value="ta">助教</Option>
                                    </Select>,
                                </div>

                                <div className="input-bottom">
                                    <div className="autoLogin"><input type="checkbox"/>7天内自动登录</div>
                                    <div className="searchSecret"><span>找回密码</span><div className='line'>|</div><span>无法登录</span></div>
                                </div>

                            </div>
                            <div className="loginBtn" onClick={()=>this.attemptLogin()}>登录</div>
                            <div className="login-bottom">
                                <div className="text">手机短信登陆</div>
                                <div className="line"></div>
                                <svg className='icon-svg'>
                                    <use xlinkHref='#iconxinlangweibo'></use>
                                </svg>
                                <svg className='icon-svg1'>
                                    <use xlinkHref='#iconweixin'></use>
                                </svg>
                                <svg className='icon-svg2'>
                                    <use xlinkHref='#iconQQ'></use>
                                </svg>
                            </div>
                            <div className="rightBottom">
                                <div className="caret"></div>
                                <svg className='icon-svg'>
                                    <use xlinkHref='#iconerweima'></use>
                                </svg>
                            </div>

                        </div>}
                        {tabStatus=='register'&&<div className="register-box">
                            <div className="modal-input">
                                <div className="input-box">
                                    <input type="text" placeholder='请输入用户名'/>
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder='请输入密码'/>
                                </div>
                                <div className="input-bottom">
                                    <div className="autoLogin"><input type="checkbox"/>同意  </div>
                                    <span>《高校教学平台注册协议》</span>
                                </div>

                            </div>
                            <div className="loginBtn">注册</div>
                            <div className="login-bottom">
                                <div className="text">其他方式登录</div>
                                <div className="line"></div>
                                <svg className='icon-svg2'>
                                    <use xlinkHref='#iconQQ'></use>
                                </svg>
                                <svg className='icon-svg1'>
                                    <use xlinkHref='#iconweixin'></use>
                                </svg>
                                <svg className='icon-svg'>
                                    <use xlinkHref='#iconxinlangweibo'></use>
                                </svg>
                            </div>
                        </div>}

                    </div>
                </Modal>
            </div>
        );
    }
    changeTab=(value)=>{
        this.setState({
            tabStatus:value
        })
    }

}

export default Login;