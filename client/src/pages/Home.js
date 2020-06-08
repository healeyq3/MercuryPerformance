import React, { Component } from 'react'
import { newRunner, getTeamRunners, setRunner } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import ExistingRunnerCard from '../components/ExistingRunnerCard';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props){
    super(props);
    this.setSelectedRunner = this.setSelectedRunner.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.rehydrated === false){
      console.log('CDU reached and teamUID is: ' + this.props.selectedTeam);
      this.props.getTeamRunners(this.props.selectedTeam);
    }
  }

  setSelectedRunner(runner){
    this.props.setRunner(runner.key)
  }

  render() {
    if(!this.props.selectedTeam){
      return null;
    }

    let runnerArr = [];

    for (const runneruid in this.props.runners) {
      if(this.props.runners.hasOwnProperty(runneruid)){
        runnerArr.push(
          <React.Fragment key = {runneruid}>
            <ExistingRunnerCard runner = {this.props.runners[runneruid]} onSelect = {this.setSelectedRunner} />
          </React.Fragment>
        )
      }
    }

    return (
        <Container fluid>
            <h2 id = "teamNameHome">{this.props.selectedTeam.teamName}</h2>
            <AddRunner teamUID = {this.props.selectedTeam}/>
            {runnerArr}
        </Container>
    )
  }
}

Home.propTypes = {
  getTeamRunners: PropTypes.func.isRequired,
  newRunner: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string.isRequired,
  runners: PropTypes.object.isRequired,
  selectedRunner: PropTypes.string
};
  
const mapStateToProps = function(state){
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    selectedRunner: state.runners.selectedRunner,
    rehydrated: state._persist.rehydrated,
  }
}
export default connect(mapStateToProps, { newRunner, getTeamRunners, setRunner }) (Home);
