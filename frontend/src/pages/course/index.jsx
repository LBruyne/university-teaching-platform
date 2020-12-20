import React from 'react';

class CoursePage extends React.Component{
    constructor(props) {
        super(props);

        this.INFO = 0;
        this.MATERIAL = 1;
        this.NOTICE = 2;
        this.ASSIGNMENT = 3;

        this.state = {
            contentFlag: this.INFO
        }
    }
    set_flag(flag){
        this.setState({
            contentFlag: flag
        })
    }
    render(){
        const style = {
            textAlign: "center",
            align: "center"
        }
        let course = {
            name: "软件需求工程",
            time: "2020-2021",
            instructor: "邢卫",
            // eslint-disable-next-line no-multi-str
            info: "本课程的主要任务是在软件工程整体知识的基础上，深入学习并实践软件需求获取与管理的原理、方法和过程，\
        学习并掌握使用UML工具对软件需求进行分析、表达与系统设计。课程内容包括两部分：一是需求获取和维护的过程和方法，\
        包括需求提取、需求分析和建模、需求表达、需求确认、需求变更控制，以及相应的工具；二是UML概念、方法和工具。\
        课程配合案例性实践环节进行教学。通过本课程的学习，应使学生掌握如何在软件工程的实践中完成复杂软件需求的获取、\
        表达和维护能力，学会应用UML进行软件需求分析与设计的技术和方法，为掌握软件工程的系统全面的知识和技能打下坚实基础。",
            mtrl: [
                "this is a material",
                "this is a material",
                "this is a material",
            ],
            ntic: [
                "this is a notice",
                "this is a notice",
                "this is a notice",
                "this is a notice",
            ],
            asgn: [
                "this is a assignment",
                "this is a assignment",
                "this is a assignment",
                "this is a assignment",
                "this is a assignment",
            ]
        }

        // let contentFlag = 0;

        let info = () => {
            return (
                <div>
                    <div className="cp-content-title">课程简介</div>
                    <div className="cp-content-text">{course.info}</div>
                </div>
            )
        }

        let material = () => {
            let elems = course.mtrl.map(
                (e) => <div className="cp-content-text">{e}</div>
            )
            return (
                <div>
                    <div className="cp-content-title">Material</div>
                    <div>{elems}</div>
                </div>
            )
        }

        let notice = () => {
            let elems = course.ntic.map(
                (e) => <div className="cp-content-text">{e}</div>
            )
            return (
                <div>
                    <div className="cp-content-title">Notice</div>
                    <div>{elems}</div>
                </div>
            )
        }

        let assignment = () => {
            let elems = course.asgn.map(
                (e) => <div className="cp-content-text">{e}</div>
            )
            return (
                <div>
                    <div className="cp-content-title">Assignment</div>
                    <div>{elems}</div>
                </div>
            )
        }

        let checkFlag = (flag) => {
            if(flag === this.INFO)
                return info()
            else if(flag === this.MATERIAL)
                return material()
            else if(flag === this.NOTICE)
                return notice()
            else if(flag === this.ASSIGNMENT)
                return assignment()
        }

        let getStyleByFlag = (flag) => {
            if(flag === this.state.contentFlag)
                return {
                    color: "#000000"
                }
            else
                return {}
        }
        return (
            <div class="coursepage" style={style}>
                <div class="cp-header">
                    <div class="cp-header-info">
                        <div class="cp-header-title">
                            {course.name}
                        </div>
                        <div class="cp-header-time">
                            {course.time}
                        </div>
                        <div class="cp-header-instructor">
                            {course.instructor}
                        </div>
                    </div>
                </div>
                <div class="cp-navigation">
                    <div class="cp-navigation-list">
                        <li class="cp-navigation-infomation"
                            style={getStyleByFlag(this.INFO)}
                            onClick={()=>{
                                this.setState({
                                    contentFlag: this.INFO,
                                })
                            }}>
                            课程信息
                        </li>
                        <li class="cp-navigation-material"
                            style={getStyleByFlag(this.MATERIAL)}
                            onClick={()=>{
                                // alert("hello");
                                this.setState({
                                    contentFlag: this.MATERIAL,
                                })
                            }}>
                            课件
                        </li>
                        <li class="cp-navigation-notice"
                            style={getStyleByFlag(this.NOTICE)}
                            onClick={()=>{
                                this.setState({
                                    contentFlag: this.NOTICE,
                                })
                            }}>
                            公告
                        </li>
                        <li class="cp-navigation-assignment"
                            style={getStyleByFlag(this.ASSIGNMENT)}
                            onClick={()=>{
                                this.setState({
                                    contentFlag: this.ASSIGNMENT,
                                })
                            }}>
                            作业
                        </li>
                    </div>
                </div>

                <div className="cp-content">
                    <div className="cp-content-info">
                        {checkFlag(this.state.contentFlag)}
                    </div>
                </div>
            </div>
        )
    }
}

export default CoursePage;