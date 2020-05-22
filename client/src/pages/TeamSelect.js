import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams, newTeam } from '../actions/teamActions';
import ExistingTeamCard from '../components/ExistingTeamCard';
import NewTeamCard from '../components/NewTeamCard';
import CreateTeamModal from '../components/CreateTeamModal';

class TeamSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }

    this.props.getTeams();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
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
        //to get the team object, do this.props.teams[teamuid]
        cardItems.push(
        <div key = {teamuid}>
          <ExistingTeamCard team = {this.props.teams[teamuid]} />
        </div>
        )
      }
    }
    return (
      <div>
        <h1>Teams</h1>
        {cardItems}
        <NewTeamCard onClick = {this.setShow} />
        <CreateTeamModal setShow = {this.setShow} show = {this.state.show} />
      </div>
    );
  }
}

TeamSelect.propTypes = {
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  team: PropTypes.object
};

const mapStateToProps = function(state){
  return {
    teams: state.teams.teams,
    team: state.teams.team
  }
}

export default connect(mapStateToProps, { getTeams, newTeam }) (TeamSelect);
  
