import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


export class RunnerHome extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

RunnerHome.propTypes = {
    runner: PropTypes.string.isRequired
}

const mapStateToProps = function(state){
    return {
        
    }
}

export default connect(mapStateToProps, {

})(RunnerHome)
