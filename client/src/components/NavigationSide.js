import React, { Component } from "react";
import cookie from "react-cookies";
import fire from "../Fire";
import { NavLink, withRouter } from "react-router-dom";
import "../css/navside.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWorkoutBlueprints } from "../actions/workoutActions";
import { getEventHolders } from "../actions/eventActions";
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faDumbbell,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

class NavigationSide extends Component {
  constructor(props) {
    super(props);

    this.updateHome = this.updateHome.bind(this);
    this.updateWorkouts = this.updateWorkouts.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.updateTeams = this.updateTeams.bind(this);
  }

  logout = () => {
    cookie.remove("mercury-fb-token", {
      path: "/",
      sameSite: "strict",
      SameSite: "strict",
    });
    this.props.rerenderCallback();
    fire.auth().signOut().then();
  };

  updateHome() {
    this.props.getTeamRunners(this.props.selectedTeam);
  }

  updateWorkouts() {
    this.props.getWorkoutBlueprints(this.props.selectedTeam);
  }

  updateEvents() {
    this.props.getEventHolders(this.props.selectedTeam);
  }

  updateTeams() {
    this.props.getTeams();
  }

  render() {
    if (
      !cookie.load("mercury-fb-token", {
        path: "/",
        sameSite: "strict",
        SameSite: "strict",
      })
    ) {
      return null;
    }
    return (
      <div className="navigation-side-container">
        <NavLink exact to="/" onClick={this.updateHome}>
          <FontAwesomeIcon className="icon-style-home" icon={faHome} />
        </NavLink>
        <NavLink exact to="/seasonevents" onClick={this.updateEvents}>
          <FontAwesomeIcon
            className="icon-style-events"
            icon={faFlagCheckered}
          />
        </NavLink>
        <NavLink exact to="/workouts" onClick={this.updateWorkouts}>
          <FontAwesomeIcon className="icon-style-workouts" icon={faDumbbell} />
        </NavLink>
        <NavLink exact to="/comingsoon" onClick={this.updateHome}>
          <FontAwesomeIcon
            className="icon-style-calendar"
            icon={faCalendarAlt}
          />
        </NavLink>
      </div>
    );
  }
}

NavigationSide.propTypes = {
  selectedTeam: PropTypes.string.isRequired,
  rehydrated: PropTypes.bool.isRequired,
  getWorkoutBlueprints: PropTypes.func.isRequired,
  getTeamRunners: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    selectedTeam: state.teams.selectedTeam,
    rehydrated: state._persist.rehydrated,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getWorkoutBlueprints,
    getEventHolders,
    getTeamRunners,
    getTeams,
  })(NavigationSide)
);
