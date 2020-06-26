import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import {Link, withRouter} from "react-router-dom";
import "../css/navside.css"
import house from "../resources/mHouse.svg"
import calendar from "../resources/mCalendar.svg"
import heartbeat from "../resources/mHeartbeat.svg"

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
                <div className="navigation-side-link-container">
                    <div className="navigation-link-image-container">
                        <img src={house} className="navigation-side-house-img" alt="home"/>
                        <Link to="/" className="navigation-link">Home</Link>
                    </div>
                    <div className="navigation-link-image-container">
                        <img src={calendar} className="navigation-side-calendar-img" alt="home"/>
                        <Link to="/comingsoon" className="navigation-link">Calendar</Link>
                    </div>
                    <div className="navigation-link-image-container">
                        <img src={heartbeat} className="navigation-side-dumbbell-img" alt="home"/>
                        <Link to="/workouts" className="navigation-link">Workouts</Link>
                    </div>
                    <div className="navigation-link-image-container">
                        <img src={house} className="navigation-side-house-img" alt="home"/>
                        <Link to="/events" className="navigation-link">Events</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NavigationSide);
