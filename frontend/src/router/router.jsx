import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/**
 * 引入各个页面组件
 */
import App from '../App'
import WebLoginPage from "../pages/Login/WebLogin";
import UserInfoPage from "../pages/UserInfo/UserInfoPage";
import UserIndexPage from "../pages/UserIndex/UserIndexPage";
import CoursePage from "../pages/Course/CoursePage";

/**
 * 网页路由组件
 * 规定全局路由，指定各个路由对应的组件
 *
 * @returns {JSX.Element}
 * @constructor
 *
 * 添加路由：
 * + import PAGE_COMPONENT from "COMPONENT_PATH";
 *
 * + <Route eaxt path="PATH" component={PAGE_COMPONENT}/>
 *
 * TODO：给“找不到此页面”添加一个组件
 */

const AppRouter = () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => <Redirect to="/login" />}/>
            <Route exact path="/app" component={App}/>
            <Route exact path="/login" component={WebLoginPage}/>
            <Route path="/user" exact render={() => <Redirect to="/user/index" />}/>
            <Route exact path="/user/index" component={UserIndexPage}/>
            <Route exact path="/user/setting" component={UserInfoPage}/>
            <Route exact path="/user/course" component={CoursePage}/>
            <Route render={() => <h1 className={''}>找不到此页面</h1>} />
        </Switch>
    </div>
);

export default AppRouter