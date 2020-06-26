import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import cookie from "react-cookies";

const AuthRoute = ({component: Component, rerenderCallback, ...rest}) => (
    <Route
    {...rest}
    render = {function(props) {
        const authenticated = cookie.load('idToken');
        return authenticated != null ? <Redirect to='/teamselect'/> : <Component {...props} rerenderCallback={rerenderCallback} />
    }
    }
    />
);
   

export default AuthRoute
