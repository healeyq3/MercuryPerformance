import React, { Component } from 'react';
import cookie from 'react-cookies'
import {withRouter} from "react-router-dom";
import "../css/navtop.css"
import logo from '../resources/mLogoV2-White.svg'
import triangle from '../resources/mTriangleSelector.svg'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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
                <div className="logo-container">
                    <img src={logo} alt="logo" className="navbar-logo"/>
                </div>
                <div className="main-top-bar-container">
                    {/* <EventsTopBar/> */}
                    <div className="top-bar-widgets-container">

                    </div>
                    <div className="top-bar-user-information-container">
                        {/*<img src={logo} className="top-bar-profile-photo" alt="profile-photo"/>*/}
                        <h5 id="top-bar-user-name">User</h5>
                        <img src={triangle} className="top-bar-triangle-selector" alt="triangle-selector"/>
                    </div>
                </div>
            </div>
        )
    }
}

NavigationTop.propTypes = {

}

export default withRouter(NavigationTop);
