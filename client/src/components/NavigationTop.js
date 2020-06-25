import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import {withRouter} from "react-router-dom";
import "../css/navtop.css"
import logo from '../resources/mLogoV2.svg'

class NavigationTop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }
    }

    logout = () => {
        cookie.remove('idToken', { path: "/" });
        cookie.remove('user', { path: "/" });
        fire.auth().signOut().then(() => {
            window.location.reload();
        });

    }
    
    render() {
        if(!cookie.load('idToken')){
            return null;
        }
        return (
            <div className="navigation-top-container">
                <div className="logo-container">
                    <img src={logo} alt="logo" className="navbar-logo"/>
                </div>
                <div className="main-top-bar-container">

                </div>
            </div>
        )
    }
}

export default withRouter(NavigationTop);
