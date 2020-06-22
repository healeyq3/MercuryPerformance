import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import cookie from "react-cookies";

const AuthRoute2 = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render = {function(props){
        const authenticated = cookie.load('idToken');
        return authenticated == null ? <Redirect to = '/login'/> : <Component { ...props} />
    }}
    />
);

export default (AuthRoute2)
