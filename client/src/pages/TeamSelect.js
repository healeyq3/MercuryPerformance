import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams } from '../actions/teamActions';
import ExistingTeamCard from '../components/ExistingTeamCard';

class TeamSelect extends Component {
 
  componentWillMount() {
        this.props.getTeams();
    }

    componentWillReceiveProps(nextProps, _) {
        if (nextProps.newTeam) {
          this.props.teams.unshift(nextProps.newTeam);
        }
    }

    render() {
      const teamItems = [];
      let cardItems = [];
      for (const teamuid in this.props.teams) {
        if (this.props.teams.hasOwnProperty(teamuid)) {
          //to get the team object, do this.props.teams[teamuid]
          cardItems.push(
          <div key = {teamuid}>
          <ExistingTeamCard team = {this.props.teams[teamuid]} />
          </div>
          )
          teamItems.push(this.props.teams[teamuid].teamName + "\n | ");
        }
      }
      console.log(this.teamItems);
      return (
        <div>
          <h1>Teams</h1>
          {this.teamItems}
          {cardItems}
        </div>
      );
    }
}

TeamSelect.propTypes = {
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  newTeam: PropTypes.object
};

const mapStateToProps = function(state){
  return {
    teams: state.teams.teams,
    newTeam: state.teams.team,
  }
}

export default connect(mapStateToProps, { getTeams })(TeamSelect);
  
