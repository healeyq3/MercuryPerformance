import React, { Component } from 'react'
import {withRouter} from 'react-router';
import RunnerItem from './RunnerItem'
import PropTypes from 'prop-types';

export class Runners extends Component {
    render(){
    return this.props.runners.map((runner) =>(<RunnerItem key = {runner.id} runner = {runner} delRunner = {this.props.delRunner}></RunnerItem>));
    }
    
}
Runners.propTypes = {
    Runners: PropTypes.array.isRequired
}

export default withRouter(Runners);
