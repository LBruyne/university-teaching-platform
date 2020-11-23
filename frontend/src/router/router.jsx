import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../pages/App/App'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/App" component={App}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter