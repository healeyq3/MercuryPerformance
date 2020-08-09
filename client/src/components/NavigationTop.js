import React, { Component } from "react";
import cookie from "react-cookies";
import { withRouter, NavLink } from "react-router-dom";
import "../css/navtop.css";
import logo from "../resources/mLogoV2.svg";
// import triangle from '../resources/mTriangleSelector.svg';
import fire from "../Fire";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class NavigationTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gotoLogin: false,
      show: false,
    };
    this.updateTeams = this.updateTeams.bind(this);
  }

  // componentDidUpdate(prevProps){
  //     if(prevProps.rehydrated === false){
  //         this.forceUpdate();
  //     }
  // }

  logout = () => {
    cookie.remove("mercury-fb-token", {
      path: "/",
      sameSite: "strict",
      SameSite: "strict",
    });
    this.props.rerenderCallback();
    fire.auth().signOut().then();
  };

  updateTeams() {
    this.props.getTeams();
  }

  show = () => {
    this.setState((state) => ({
      show: !state.show,
    }));
  };

  unShow = () => {
    if (this.state.show === true) {
      this.setState({
        show: false,
      });
    }
  };

//   componentDidMount() {
//     document.addEventListener("mousedown", this.unShow);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("mousedown", this.unShow);
//   }

  render() {
    if (!cookie.load("mercury-fb-token")) {
      return null;
    }
    return (
      <div className="navigation-top-container">
        <div className="logo-container">
          <img src={logo} alt="logo" className="navbar-logo" />
        </div>
        <FontAwesomeIcon
          className="dropbtn"
          icon={faBars}
          onClick={this.show}
        />
        <div className={this.state.show === false ? "dropnotshow" : "dropshow"}>
          <NavLink
            exact
            to="/login"
            onClick={this.logout}
            className="navigation-link"
          >
            Log Out
          </NavLink>
          <NavLink
            exact
            to="/teamselect"
            onClick={this.updateTeams}
            className="navigation-link"
          >
            Select Team
          </NavLink>
        </div>
      </div>
    );
  }
}

NavigationTop.propTypes = {
  teams: PropTypes.object,
  getTeams: PropTypes.func.isRequired,
  getTeamRunners: PropTypes.func.isRequired,
  selectedTeam: PropTypes.string,
};

const mapStateToProps = function (state) {
  return {
    selectedTeam: state.teams.selectedTeam,
    rehydrated: state._persist.rehydrated,
    teams: state.teams.teams,
  };
};

export default withRouter(
  connect(mapStateToProps, { getTeamRunners, getTeams })(NavigationTop)
);
