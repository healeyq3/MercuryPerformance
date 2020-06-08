import React, { Component } from 'react'
import { newRunner, getTeamRunners } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import ExistingRunnerCard from '../components/ExistingRunnerCard';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.rehydrated === false){
      console.log('CDU reached and teamUID is: ' + this.props.selectedTeam);
      this.props.getTeamRunners(this.props.selectedTeam);
    }
  }

  render() {
    if(!this.props.selectedTeam){
      return null;
    }

    let runnerArr = [];
    
    // if(this.props.runners){
    //   runnerArr = Object.keys(this.props.runners);
    // }

    // if(this.props.createdRunner.name && !this.props.runners.hasOwnProperty(this.props.createdRunner.key)){
    //   runnerArr.push(this.props.createdRunner.key);

    //   this.props.runners[this.props.createdRunner.key] = this.props.createdRunner;
    // }

    for (const runneruid in this.props.runners) {
      if(this.props.runners.hasOwnProperty(runneruid)){
        runnerArr.push(
          <React.Fragment key = {runneruid}>
            <ExistingRunnerCard runner = {this.props.runners[runneruid]} />
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
  runners: PropTypes.object.isRequired
};
  
const mapStateToProps = function(state){
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    rehydrated: state._persist.rehydrated,
  }
}
export default connect(mapStateToProps, { newRunner, getTeamRunners }) (Home);
