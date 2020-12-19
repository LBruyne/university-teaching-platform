import React from 'react';

const CoursePage = () => {
    const style = {
        textAlign: "center",
        align: "center"
    }
    var course = {
        name: "软件需求工程",
        time: "2020-2021",
        instructor: "邢卫",
        info: "本课程的主要任务是在软件工程整体知识的基础上，深入学习并实践软件需求获取与管理的原理、方法和过程，\
        学习并掌握使用UML工具对软件需求进行分析、表达与系统设计。课程内容包括两部分：一是需求获取和维护的过程和方法，\
        包括需求提取、需求分析和建模、需求表达、需求确认、需求变更控制，以及相应的工具；二是UML概念、方法和工具。\
        课程配合案例性实践环节进行教学。通过本课程的学习，应使学生掌握如何在软件工程的实践中完成复杂软件需求的获取、\
        表达和维护能力，学会应用UML进行软件需求分析与设计的技术和方法，为掌握软件工程的系统全面的知识和技能打下坚实基础。"
    }
    const INFO = 0
    const MATERIAL = 1
    const NOTICE = 2
    const ASSIGNMENT = 3
    var contentFlag = 0
    
    let info = () => {
        return (<div class="cp-content-text">{course.info}</div>)
    }
    
    let material = () => {
        return (<div class="cp-content-text">{course.info}</div>)
    }
    
    let notice = () => {
        return (<div class="cp-content-text">{course.info}</div>)
    }
    
    let assignment = () => {
        return (<div class="cp-content-text">{course.info}</div>)
    }
    
    let checkFlag = (flag) => {
        if(flag == INFO)
            return info()
        else if(flag == MATERIAL)
            return material()
        else if(flag == NOTICE)
            return notice()
        else if(flag == ASSIGNMENT)
            return assignment()
    }
    
    let getStyleByFlag = (flag) => {
        if(flag == contentFlag)
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
                    <li class="cp-navigation-infomation" style={getStyleByFlag(INFO)}>
                        课程信息
                    </li>
                    <li class="cp-navigation-material" style={getStyleByFlag(MATERIAL)}>
                        课件
                    </li>
                    <li class="cp-navigation-notice" style={getStyleByFlag(NOTICE)}>
                        公告
                    </li>
                    <li class="cp-navigation-assignment" style={getStyleByFlag(ASSIGNMENT)}>
                        作业
                    </li>
                </div>
            </div>
            <div class="cp-content">
                <div class="cp-content-info">
                    <div class="cp-content-title">课程简介</div>
                    {checkFlag(contentFlag)}
                </div>
            </div>
        </div>
    )
};

export default CoursePage