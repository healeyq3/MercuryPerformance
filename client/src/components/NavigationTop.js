import React, { Component } from 'react';
import cookie from 'react-cookies'
import {withRouter} from "react-router-dom";
import "../css/navtop.css"
// import logo from '../resources/mLogoV2-White.svg'
import triangle from '../resources/mTriangleSelector.svg';

class NavigationTop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }
    }
    
    render() {
        if(!cookie.load('mercury-fb-token')){
            return null;
        }
        return (
            <div className="navigation-top-container">
                <div className="top-bar-user-information-container">
                    {/*<img src={logo} className="top-bar-profile-photo" alt="profile-photo"/>*/}
                    <h5 id="top-bar-user-name">John O'Brien</h5>
                    <img src={triangle} className="top-bar-triangle-selector" alt="triangle-selector"/>
                </div>
            </div>
        )
    }
}

export default withRouter(NavigationTop);
