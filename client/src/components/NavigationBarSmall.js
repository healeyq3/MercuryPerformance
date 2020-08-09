import React, { Component } from "react";
import cookie from "react-cookies";
import { withRouter, NavLink } from "react-router-dom";
import fire from "../Fire";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";
import { getWorkoutBlueprints } from "../actions/workoutActions";
import { getEventHolders } from "../actions/eventActions";
import logo from "../resources/mLogoV2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/navtopsmall.css";

export class NavigationBarSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.updateHome = this.updateHome.bind(this);
    this.updateWorkouts = this.updateWorkouts.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.updateTeams = this.updateTeams.bind(this);
  }

  show = () => {
    console.log("show in small");
    console.log(this.state.show);
    this.setState((state) => ({
      show: !state.show,
    }));
  };

  logout = () => {
    this.props.setState({
      show: false,
    });
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
    this.setState({
      show: false,
    });
  }

  updateWorkouts() {
    this.props.getWorkoutBlueprints(this.props.selectedTeam);
    this.setState({
      show: false,
    });
  }

  updateEvents() {
    this.props.getEventHolders(this.props.selectedTeam);
    this.setState({
      show: false,
    });
  }

  updateTeams() {
    this.props.getTeams();
    this.setState({
      show: false,
    });
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
      <React.Fragment>
        <div className="nagivation-container">
          <div className="logo-container">
            <img src={logo} alt="logo" className="navbar-logo" />
          </div>
          <FontAwesomeIcon
            className="dropbtn"
            icon={faBars}
            onClick={this.show}
          />
        </div>
        <div className={this.state.show === true ? "overlay" : "show"}>
          <div className="overlay-content">
            <div className="close">
              <h1 className = "close-btn" onClick={() => this.setState({ show: false })}>X</h1>
            </div>

            <NavLink
              className="nav-link"
              exact
              to="/"
              onClick={this.updateHome}
            >
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              to="/seasonevents"
              onClick={this.updateEvents}
            >
              Events
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              to="/workouts"
              onClick={this.updateWorkouts}
            >
              Workouts
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              to="/comingsoon"
              onClick={this.updateHome}
            >
              Calendar
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              to="/login"
              onClick={this.logout}
            >
              Log Out
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              to="/teamselect"
              onClick={this.updateTeams}
            >
              Select Team
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NavigationBarSmall.propTypes = {
  teams: PropTypes.object,
  getTeams: PropTypes.func.isRequired,
  getTeamRunners: PropTypes.func.isRequired,
  selectedTeam: PropTypes.string,
  getWorkoutBlueprints: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    selectedTeam: state.teams.selectedTeam,
    rehydrated: state._persist.rehydrated,
    teams: state.teams.teams,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getWorkoutBlueprints,
    getEventHolders,
    getTeamRunners,
    getTeams,
  })(NavigationBarSmall)
);
