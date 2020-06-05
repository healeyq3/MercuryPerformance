import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams, newTeam, setTeam } from '../actions/teamActions';
import { getTeamRunners } from '../actions/runnerActions';
import ExistingTeamCard from '../components/ExistingTeamCard';
import NewTeamCard from '../components/NewTeamCard';
import CreateTeamModal from '../components/CreateTeamModal';
import {Row} from 'react-bootstrap';

class TeamSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      reloaded:false
    }

    this.props.getTeams();

    this.setSelectedTeam = this.setSelectedTeam.bind(this);
  }

  componentDidMount(){
    this.props.getTeams();
  }

  setSelectedTeam(team){
    this.props.setTeam(team.key);
  }

  setShow = e => {
    this.setState({
        show: !this.state.show
    })
  }

  render() {
    console.log("Render");
    let cardItems = [];
    for (const teamuid in this.props.teams) {
      if (this.props.teams.hasOwnProperty(teamuid)) {
        cardItems.push(
        <React.Fragment key = {teamuid}>
          <ExistingTeamCard team = {this.props.teams[teamuid]} onSelect = {this.setSelectedTeam}/>
        </React.Fragment>
        )
      }
    }
    console.log(this.props.createdTeam.hasOwnProperty("teamName"));
    if(this.props.createdTeam.hasOwnProperty("teamName") && !this.props.teams.hasOwnProperty(this.props.createdTeam.key)){
      cardItems.push(
        <React.Fragment key = {this.props.createdTeam.key}>
          <ExistingTeamCard team = {this.props.createdTeam} onSelect = {this.setSelectedTeam}/>
        </React.Fragment>
      )
    }
    return (
      <div>
        <h1>Teams</h1>
        <Row > 
          {cardItems}
          <NewTeamCard onClick = {this.setShow} />
        </Row>
        <CreateTeamModal setShow = {this.setShow} show = {this.state.show} />
      </div>
    );
  }
}

TeamSelect.propTypes = {
  getTeams: PropTypes.func.isRequired,
  setTeam: PropTypes.func.isRequired,
  getTeamRunners: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string
};

const mapStateToProps = function(state){
  return {
    teams: state.teams.teams,
    createdTeam: state.teams.createdTeam,
    selectedTeam: state.teams.selectedTeam
  }
}

export default connect(mapStateToProps, { getTeams, newTeam, setTeam, getTeamRunners }) (TeamSelect);
  
