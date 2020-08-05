import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import {NavLink, withRouter} from "react-router-dom";
import "../css/navside.css"
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getWorkoutBlueprints } from '../actions/workoutActions';
import { getEventHolders } from '../actions/eventActions';
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";

class NavigationSide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false,
            gotoEvents: false,
            gotoWorkouts:false,
            gotoHome:false,
        }

        this.updateHome = this.updateHome.bind(this);
        this.updateWorkouts = this.updateWorkouts.bind(this);
        this.updateEvents = this.updateEvents.bind(this);
        this.updateTeams = this.updateTeams.bind(this);
    }

    logout = () => {
        cookie.remove('mercury-fb-token', {path:"/", sameSite: "strict", SameSite:"strict"});
        this.props.rerenderCallback();
        fire.auth().signOut().then();
    }

    updateHome(){
        this.props.getTeamRunners(this.props.selectedTeam);
    }

    updateWorkouts(){
        this.props.getWorkoutBlueprints(this.props.selectedTeam);
    }

    updateEvents(){
        this.props.getEventHolders(this.props.selectedTeam);
    }

    updateTeams(){
        this.props.getTeams();
    }

    render() {
        if(!cookie.load('mercury-fb-token', {path:"/", sameSite: "strict", SameSite:"strict"})){
            return null;
        } 
        return (
            <div className="navigation-side-container">
                <div className="navigation-side-link-container">
                    <div className="navigation-link-container">
                        <NavLink exact to="/" className="navigation-link-home" onClick={this.updateHome}><span className="text-hide">Home</span></NavLink>
                    </div>
                    <div className="navigation-link-container">
                        <NavLink exact to="/workouts" className="navigation-link-workouts" onClick={this.updateWorkouts}><span className="text-hide">Events</span></NavLink>
                    </div>
                    <div className="navigation-link-container">
                        <NavLink exact to="/seasonevents" className="navigation-link-events" onClick={this.updateEvents}><span className="text-hide">Workouts</span></NavLink>
                    </div>
                    <div className = "navigation-link-container">
                        <NavLink exact to = "/comingsoon" className = "navigation-link-calendar" onClick = {this.updateHome}><span className = "text-hide">Calendar</span></NavLink>
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
    getTeamRunners: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
    }
}

export default withRouter(connect(mapStateToProps, { getWorkoutBlueprints, getEventHolders, getTeamRunners, getTeams })(NavigationSide));
