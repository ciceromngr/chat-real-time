import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Auth from '../pages/authentication';
import Chats from '../pages/chat';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Auth} exact/>
            <Route path="/chat" component={Chats} exact/>
        </Switch>
    </BrowserRouter>
);