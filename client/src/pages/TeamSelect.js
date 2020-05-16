import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams } from '../actions/teamActions';

class TeamSelect extends Component {
    componentWillMount() {
        this.props.getTeams();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newTeam) {
            this.props.teams.unshift(nextProps.newTeam);
        }
    }

    render() {
        const teamItems = this.props.teams.map(team => (
            <p>{team.teamName}</p>
          ));
          return (
            <div>
              <h1>Teams</h1>
              {teamItems}
            </div>
          );
    }
}

TeamSelect.propTypes = {
    getTeams: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    newTeam: PropTypes.object
  };
  
  const mapStateToProps = (state) => ({
    teams: state.teams.items,
    newTeam: state.teams.item,
  });
  
  export default connect(mapStateToProps, { getTeams })(TeamSelect);
  
