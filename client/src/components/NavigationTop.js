import React, { Component } from 'react';
import cookie from 'react-cookies'
import {withRouter, NavLink} from "react-router-dom";
import "../css/navtop.css"
import logo from '../resources/mLogoV2-White.svg'
// import triangle from '../resources/mTriangleSelector.svg';
import fire from '../Fire'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown} from 'react-bootstrap'
import { getTeamRunners } from "../actions/runnerActions";
import { getTeams } from "../actions/teamActions";



class NavigationTop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }
        this.updateTeams = this.updateTeams.bind(this);
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.rehydrated === false){
    //         this.forceUpdate();
    //     }
    // }

    logout = () => {
        cookie.remove('mercury-fb-token', {path:"/", sameSite: "strict", SameSite:"strict"});
        this.props.rerenderCallback();
        fire.auth().signOut().then();
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
                <div className="logo-container">
                    <img src={logo} alt="logo" className="navbar-logo"/>
                </div>
                <div className="main-top-bar-container">
                    {/* <EventsTopBar/> */}
                    <div className="top-bar-widgets-container">

                    </div>
                    <div className="top-bar-user-information-container">
                        {/*<img src={logo} className="top-bar-profile-photo" alt="profile-photo"/>*/}
                        <Dropdown>
                            <Dropdown.Toggle className = "dropbtn"></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item><NavLink exact to="/login" className="navigation-link" onClick={this.logout}>Log Out</NavLink></Dropdown.Item>
                                <Dropdown.Item><NavLink className = "navigation-link" exact to = '/teamselect' onClick = {this.updateTeams}>Select Team</NavLink></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}

NavigationTop.propTypes = {
    teams: PropTypes.object,
    getTeams: PropTypes.func.isRequired,
    getTeamRunners: PropTypes.func.isRequired,
    selectedTeam: PropTypes.string
}

const mapStateToProps = function(state){
    return {
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        teams: state.teams.teams
    }
}



export default withRouter(connect(mapStateToProps, { getTeamRunners, getTeams})(NavigationTop));
