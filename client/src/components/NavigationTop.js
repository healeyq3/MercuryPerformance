import React, { Component } from 'react';
import cookie from 'react-cookies'
import {NavLink, withRouter} from "react-router-dom";
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
                <h1 id="navigation-top-header">Mercury</h1>
                <div id="navigation-top-button-container">
                    <NavLink to="/" className="navigation-top-button">Home</NavLink>
                    <NavLink to="/comingsoon" className="navigation-top-button">Calendar</NavLink>
                    <NavLink to="/workouts" className="navigation-top-button">Workouts</NavLink>
                    <NavLink to="/events" className="navigation-top-button">Events</NavLink>
                </div>
                <div id="navigation-top-userinfo-container">
                    user info!
                </div>
            </div>
        )
    }
}

export default withRouter(NavigationTop);
