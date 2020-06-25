import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import "../css/navside.css"

class NavigationSide extends Component {
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
            <div className="navigation-side-container">
                content
            </div>
        )
    }
}

export default withRouter(NavigationSide);
