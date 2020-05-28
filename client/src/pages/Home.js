import React, { Component } from 'react'
//import {withRouter} from 'react-router';
import { getRunners, newRunner } from '../actions/runnerActions';
import  { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
 import {AddRunner} from '../components/AddRunner';
 import PropTypes from 'prop-types';

class Home extends Component {
    constructor(props){
        super(props);
    
        this.props.getRunners();
    
        //this.setSelectedTeam = this.setSelectedTeam.bind(this);
      }
      componentDidMount(){
        this.props.getRunners();
      }
    render() {
        return (
            <Container fluid>
                <h2 id = "teamNameHome">{this.props.selectedTeam.teamName}</h2>
                <ul>{this.props.runners}</ul>
                <AddRunner addRunner = {this.addRunner}></AddRunner>
            </Container>
        )
    }
}
Home.propTypes = {
    getRunners: PropTypes.func.isRequired,
    runners: PropTypes.object.isRequired,
    runner: PropTypes.object,
    selectedTeam: PropTypes.object
  };
  const mapStateToProps = function(state){
    return {
      runners: state.teams.team.runners,
      //runner: state.teams.team.runners.runner,
      selectedTeam: state.teams.selectedTeam
    }
  }
export default connect(mapStateToProps, { getRunners, newRunner }) (Home);
