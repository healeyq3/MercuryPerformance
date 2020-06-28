import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import {NavLink, withRouter} from "react-router-dom";
import "../css/navtop.css"
import logo from '../resources/mLogoV2.svg'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getWorkoutBlueprints } from '../actions/workoutActions';
import { getTeamEvents } from '../actions/eventActions';
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";

class NavigationTop extends Component {
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
      this.props.getTeamEvents(this.props.selectedTeam);
    }

    updateTeams(){
      this.props.getTeams();
    }
    
    render() {
        if(!cookie.load('mercury-fb-token')){
            return null;
        }
        return (
            <div className="navigation-top-container">
                <h1 id="navigation-top-header">Mercury</h1>
                <div id="navigation-top-button-container">
                    <NavLink to="/" className="navigation-top-button" onClick={this.updateHome}>Home</NavLink>
                    <NavLink to="/comingsoon" className="navigation-top-button">Calendar</NavLink>
                    <NavLink to="/workouts" className="navigation-top-button" onClick={this.updateWorkouts}>Workouts</NavLink>
                    <NavLink to="/events" className="navigation-top-button" onClick={this.updateEvents}>Events</NavLink>
                </div>
                <div id="navigation-top-userinfo-container">
                    <img src={logo} id="navigation-top-userinfo-photo" alt=""/>
                    <h2 id="navigation-top-userinfo-teamname">Pace Boys</h2>
                </div>
            </div>
        )
    }
}

NavigationTop.propTypes = {
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

export default withRouter(connect(mapStateToProps, { getWorkoutBlueprints, getTeamEvents, getTeamRunners, getTeams })(NavigationTop));
