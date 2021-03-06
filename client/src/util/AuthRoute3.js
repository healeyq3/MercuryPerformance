import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import cookie from 'react-cookies'

const AuthRoute3 = ({component: Component, team, ...rest}) => (
    <Route
    {...rest}
    render = {function(props){
        const authenticated = cookie.load('mercury-fb-token', {path:"/", sameSite: "strict", SameSite:"strict"})
        const team = cookie.load('mercury-selectedTeam', {path:"/", sameSite: "strict", SameSite:"strict"})
        return authenticated == null  ? <Redirect to = '/login'/> : team == null ? <Redirect to = '/teamselect' /> : <Component { ...props} />
    }
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