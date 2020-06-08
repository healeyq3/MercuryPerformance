import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const AuthRoute3 = ({component: Component, authenticated, team, ...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        authenticated == null  ? <Redirect to = '/login'/> : team == null ? <Redirect to = '/teamselect' /> : <Component { ...props} />
    }
    />
);


AuthRoute3.propTypes = {
    selectedTeam: PropTypes.string.isRequired
}

const mapStateToProps = function(state) {
    return {
        selectedTeam: state.teams.selectedTeam
    }
}

export default connect(mapStateToProps, {}) (AuthRoute3)