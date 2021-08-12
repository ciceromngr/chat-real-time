import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { isAuthenticated } from './auth';

import Login from '../pages/login';
import Home from '../pages/home';

const PrivateRouter = ({component: Component, ...rest}: any) => (
    <Route 
        {...rest}
        render={props => 
            isAuthenticated() ? (
                <Component {...props} />
            )
                : 
            (
                <Redirect to={{pathname:"/", state: {from:props.location}}}/>
            )
        }
    />
)

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login}/>

        {isAuthenticated() ? (<>
            <PrivateRouter exact path="/home" component={Home}/>
        </>) 
        :
        (<><Route path="/any*" component={() => <h1>Page Not Found</h1>}/></>)}
        
    </Switch>
</BrowserRouter>
)

export default Routes;

