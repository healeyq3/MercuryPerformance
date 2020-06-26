import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import cookie from "react-cookies";

const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render = {function(props) {
        authenticated = cookie.load('idToken');
        return authenticated != null ? <Redirect to='/teamselect'/> : <Component {...props} />
    }
    }
    />
);
   

export default AuthRoute
