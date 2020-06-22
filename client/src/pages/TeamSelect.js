import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams, newTeam, setTeam } from '../actions/teamActions';
import { getTeamRunners } from '../actions/runnerActions';
import ExistingTeamCard from '../components/ExistingTeamCard';
import NewTeamCard from '../components/NewTeamCard';
import CreateTeamModal from '../components/CreateTeamModal';
import {Row} from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from "react-router-dom";

import "../css/teamselect.css"

class TeamSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      reloaded: false,
      toTeamHome: false
    }

    this.setSelectedTeam = this.setSelectedTeam.bind(this);
  }

  componentDidMount() {
    this.props.getTeams();
  }

  setSelectedTeam(team){
    this.props.getTeamRunners(team.key);
    this.props.setTeam(team.key);
    cookie.save('selectedTeam', team.key, { path: '/'});
    this.setState({
      toTeamHome: true
    })
  }

  setShow = e => {
    this.setState({
        show: !this.state.show
    })
  }

  render() {
    if(this.state.toTeamHome){
      this.props.history.push('/teamselect')
      return <Redirect to='/' />
    }

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
      <div className = "teamselect-container">
        <Row className="teamselect-cardcontainer">
          {cardItems}
          <NewTeamCard className = "teamselect-teamcard" onClick = {this.setShow} />
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
    selectedTeam: state.teams.selectedTeam
  }
}

export default connect(mapStateToProps, { getTeams, newTeam, setTeam, getTeamRunners }) (TeamSelect);
  
