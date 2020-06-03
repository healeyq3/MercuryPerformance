import React, { Component } from 'react'
import { newRunner } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';

class Home extends Component {
  render() {
    if(!this.props.rehydrated){
      return null;
    }

    let runnerArr = [];
   if(this.props.teams[this.props.selectedTeam].runners){
     runnerArr = Object.keys(this.props.teams[this.props.selectedTeam].runners);
    }
    return (
        <Container fluid>
            <h2 id = "teamNameHome">{this.props.selectedTeam.teamName}</h2>
            <ul>{runnerArr}</ul>
            <AddRunner teamUID = {this.props.selectedTeam.key}/>
        </Container>
    )
  }
}

Home.propTypes = {
    newRunner: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string.isRequired,
    runner: PropTypes.object,
  };
  
const mapStateToProps = function(state){
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    rehydrated: state._persist.rehydrated
  }
}
export default connect(mapStateToProps, { newRunner }) (Home);
