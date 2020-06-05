import React, { Component } from 'react'
import { newRunner, getTeamRunners } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.rehydrated === false){
      this.props.getTeamRunners(this.props.selectedTeam);
    }
  }

  render() {
    if(!this.props.selectedTeam){
      return null;
    }

    let runnerArr = [];
    if(this.props.runners){
      runnerArr = Object.keys(this.props.runners);
    }
    return (
        <Container fluid>
            <h2 id = "teamNameHome">{this.props.selectedTeam.teamName}</h2>
            <AddRunner teamUID = {this.props.selectedTeam}/>
            <ul>{runnerArr}</ul>
        </Container>
    )
  }
}

Home.propTypes = {
    getTeamRunners: PropTypes.func.isRequired,
    newRunner: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    runner: PropTypes.object,
    runners: PropTypes.object,
  };
  
const mapStateToProps = function(state){
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    rehydrated: state._persist.rehydrated
  }
}
export default connect(mapStateToProps, { newRunner, getTeamRunners }) (Home);
