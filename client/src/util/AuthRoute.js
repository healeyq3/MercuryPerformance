import React from 'react'
import { Route, Redirect} from 'react-router-dom';

const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        authenticated != null ? <Redirect to = '/'/> : <Component { ...props} />
    }
    />
);
   

export default AuthRoute