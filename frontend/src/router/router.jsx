import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../pages/App/App'
import WebLogin from "../pages/Login/Login";

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

    <BrowserRouter>
        <Switch>
            <Route path="/" exact render={() => <Redirect to="/login" />}/>
            <Route exact path="/app" component={App}/>
            <Route exact path="/login" component={WebLogin}/>
            <Route render={() => <h1 className={''}>找不到此页面</h1>} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter