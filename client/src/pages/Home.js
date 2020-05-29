import React, { Component } from 'react'
import { getRunners, newRunner } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';
import ExistingTeamCard from "../components/ExistingTeamCard";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.runners);
    return (
        <Container fluid>
            <h2 id = "teamNameHome">{this.props.selectedTeam.teamName}</h2>
            {/*<ul>{this.props.runners}</ul>*/}
            <AddRunner teamUID = {this.props.selectedTeam.key}/>
        </Container>
    )
  }
}

Home.propTypes = {
    getRunners: PropTypes.func.isRequired,
    newRunner: PropTypes.func.isRequired,
    runners: PropTypes.object.isRequired,
    runner: PropTypes.object,
    selectedTeam: PropTypes.object.isRequired,
  };
  
const mapStateToProps = function(state){
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam
  }
}
export default connect(mapStateToProps, { getRunners, newRunner }) (Home);
