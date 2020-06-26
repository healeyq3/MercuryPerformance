import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import {NavLink, withRouter} from "react-router-dom";
import "../css/navside.css"
import house from "../resources/mHouse.svg"
import calendar from "../resources/mCalendar.svg"
import heartbeat from "../resources/mHeartbeat.svg"
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getWorkoutBlueprints } from '../actions/workoutActions';
import { getTeamEvents } from '../actions/eventActions';
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";

class NavigationSide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }

        this.updateHome = this.updateHome.bind(this);
        this.updateWorkouts = this.updateWorkouts.bind(this);
        this.updateEvents = this.updateEvents.bind(this);
        this.updateTeams = this.updateTeams.bind(this);
    }

    logout = () => {
        cookie.remove('idToken', { path: "/" });
        cookie.remove('user', { path: "/" });
        fire.auth().signOut().then(() => {
        });
    }

    updateHome(){
        this.props.getTeamRunners(this.props.selectedTeam);
    }

    updateWorkouts(){
        this.props.getWorkoutBlueprints(this.props.selectedTeam);
    }

    updateEvents(){
        this.props.getTeamEvents(this.props.selectedTeam);
    }

    updateTeams(){
        this.props.getTeams();
    }

    render() {
        if(!cookie.load('idToken')){
            return null;
        }
        return (
            <div className="navigation-side-container">
                <div className="navigation-side-link-container">
                    <div className="navigation-link-container">
                        <img src={house} className="navigation-side-house-img" alt="home"/>
                        <NavLink exact to="/" className="navigation-link" onClick={this.updateHome}>Home</NavLink>
                    </div>
                    <div className="navigation-link-container">
                        <img src={calendar} className="navigation-side-calendar-img" alt="home"/>
                        <NavLink exact to="/comingsoon" className="navigation-link">Calendar</NavLink>
                    </div>
                    <div className="navigation-link-container">
                        <img src={heartbeat} className="navigation-side-heartbeat-img" alt="home"/>
                        <NavLink exact to="/workouts" className="navigation-link" onClick={this.updateWorkouts}>Workouts</NavLink>
                    </div>
                    <div className="navigation-link-container">
                        <img src={house} className="navigation-side-house-img" alt="home"/>
                        <NavLink exact to="/events" className="navigation-link" onClick={this.updateEvents}>Events</NavLink>
                    </div>
                    <div className="navigation-link-container" id="navigation-link-select-team">
                        <img src={house} className="navigation-side-house-img" alt="home"/>
                        <NavLink exact to="/teamselect" className="navigation-link" onClick={this.updateTeams}>Select Team</NavLink>
                    </div>

                    <div className="navigation-link-container" id="navigation-link-logout">
                        <NavLink exact to="/login" className="navigation-link" onClick={this.logout}>Log Out</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

NavigationSide.propTypes = {
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    getWorkoutBlueprints: PropTypes.func.isRequired,
    getTeamEvents: PropTypes.func.isRequired,
    getTeamRunners: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
    }
}

export default withRouter(connect(mapStateToProps, { getWorkoutBlueprints, getTeamEvents, getTeamRunners, getTeams })(NavigationSide));
