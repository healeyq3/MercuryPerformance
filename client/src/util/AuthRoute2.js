import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const AuthRoute2 = ({component: Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        authenticated == null || this.props.selectedTeam == null ? <Redirect to = '/login'/> : <Component { ...props} />
    }
    />
);


AuthRoute2.propTypes = {
    selectedTeam: PropTypes.string
}

const mapStateToProps = function(state) {
    return {
        selectedTeam: state.teams.selectedTeam
    }
}

export default connect(mapStateToProps, {}) (AuthRoute2)
