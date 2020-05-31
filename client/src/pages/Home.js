import React, { Component } from 'react'
import { getRunners, newRunner } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import  AddRunner from '../components/AddRunner';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(Object.keys(this.props.runners));//returns array of keys of runners
    const runnerArr = Object.keys(this.props.runners);
    //const d = this.props.runners;
   // const listItems = this.props.runners.getRunners
    //map((d) => <li key={d.runnerName}>{d.runnerName}</li>);
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
