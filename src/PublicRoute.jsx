import React from "react";
import { Route, Redirect } from 'react-router-dom'
import {isLogin} from './helpers'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to='/stopper' /> : //zamiast stopper landing page :))
                <Component {...props} />
        )} />
    );
};

export default PublicRoute