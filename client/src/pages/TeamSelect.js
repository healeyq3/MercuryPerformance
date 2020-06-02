import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams, newTeam, setTeam } from '../actions/teamActions';
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
  teams: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string
};

const mapStateToProps = function(state){
  return {
    teams: state.teams.teams,
    selectedTeam: state.teams.selectedTeam
  }
}

export default connect(mapStateToProps, { getTeams, newTeam, setTeam }) (TeamSelect);
  
