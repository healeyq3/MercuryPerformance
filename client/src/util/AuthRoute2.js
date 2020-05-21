import React from 'react'
import { Route, Redirect} from 'react-router-dom';

const AuthRoute2 = ({component: Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        authenticated != null ? <Redirect to = '/login'/> : <Component { ...props} />
    }
    />
);
   

export default AuthRoute2
