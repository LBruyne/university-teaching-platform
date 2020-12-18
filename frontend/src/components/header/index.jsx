import React from 'react';
// TODO: LOGIN

import sxxlogo from "../../assets/images/header/sxxlogo.png"

/**
 * logo + 导航栏
 */

function goto_course(){
    window.location.href = '/user/course';
}

const WebHeader = () => {

    return(
        <div className="header-container">
            <div className="header-logo">
                <img src={sxxlogo}/>
            </div>
            <div className="header-ul">
                <li>热门课程</li>
                <li onClick={goto_course}>
                    我的课程
                </li>
                <li>个人信息</li>
                <li>专栏</li>
                <li>文章</li>
                <li>手记</li>
            </div>
            <div className="header-input">
                <input type="text"

                />
                <div className={"input-search"}>
                    <svg className='icon-svg'>
                        <use xlinkHref='#iconsousuo'></use>
                    </svg>
                </div>
            </div>
            <div className="header-right">

                <div className="header-btn login" onClick={()=>{

                }}>登录</div>
                <div className='btn-line'>/</div>
                <div className="header-btn register" onClick={()=>{

                }}>注册</div>

            </div>
        </div>
    )

}

export default WebHeader