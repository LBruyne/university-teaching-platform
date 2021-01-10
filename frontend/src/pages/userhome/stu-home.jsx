import React from 'react';
import klee from '../../assets/images/user/klee.jpg';

class StuHome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user_type: "stu",
            user_id: "u123",
        };
    }
    get_avatar(){
        return klee;
    }
    get_name(){
        //@TODO
        let name = localStorage.getItem('username');
        return "Klee";
    }
    go2_notice_details(){
        alert("details is in building...");
    }
    get_notices(){
        let notices = [
            {
                'title': 'not1',
                'content': '课程 软件需求工程 的作业 软件需求工程课程总结 已于2021.01.10 10:21开放'
            },
            {
                'title': 'not2',
                'content': '课程 软件需求工程 的作业 组内评分表 已于2021.01.10 10:19开放'
            },
            {
                'title': 'not3',
                'content': '课程 软件需求工程 的作业 项目总结陈述PPT 已于2021.01.10 10:20开放'
            },
            {
                'title': 'not4',
                'content': '课程 软件需求工程 的作业 项目总结报告 提交即将于今天截止'
            },
        ];
        return (
            <div class={"notices"}>
                {notices.map(item =>(
                    <li class={'notice-item'} key={item}>
                        <div class={'item-title'}
                        onClick={this.go2_notice_details}>
                            {item['title']}
                        </div>
                        <div class={'item-content'}>{item['content']}</div>
                    </li>
                ))}
            </div>
        );
    }
    get_courses(){
        let courses = [
            {
                'id': 1,
                'name': '软件需求工程',
                'info': '',
            },
            {
                'id': 2,
                'name': '软件工程管理',
                'info': '',
            },
            {
                'id': 3,
                'name': '软件质量测试与保证',
                'info': '',
            },
            {
                'id': 4,
                'name': '服务科学导论',
                'info': '',
            },
        ]
        return (
            <div class={"courses-list"}>
                {courses.map(item=>(
                    <li class={'course-item'}
                        key={item}
                        onClick={()=>{
                            window.location.href = '/user/course?course='+item['id']
                        }}
                    >
                        {item['name']}</li>
                ))}
            </div>
        );
    }
    render(){
        return (
            <div class="uhp">
                <div class="uhp-left">
                    <img class="avatar" src={this.get_avatar()}/>
                    <div class="name">
                        <div>{this.get_name()}</div>
                    </div>
                    <div class={"menu"}>
                        <div class={"item"}>学习笔记</div>
                        <div class={"item"}>公告</div>
                    </div>
                </div>

                <div class="uhp-center">
                    <div class={"notices-title-bar"}>notice</div>
                    {this.get_notices()}
                </div>

                <div class="uhp-right">
                    <div class={"courses-title-bar"}>courses</div>
                    {this.get_courses()}
                </div>
            </div>
        )
    }
}


export default StuHome;