import React, { Component } from 'react'
import {withRouter} from 'react-router';
import  { Container, Button, Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types';

export class RunnerItem extends Component {
    render(){
        const {title, id} =  this.props.runner;

    return (
        <Container fluid>
            <p>
                {title}
                <button id = "removeRunner" style = {btnStyle} onClick = {this.props.delRunner.bind(this, id)}>X</button>
            </p>
        </Container>
    )
        
    
    }
    
}

RunnerItem.propTypes = {
    runner: PropTypes.object.isRequired
}
const btnStyle = {
    background : '#ff0000',
    color : "#fff",
    border : "none",
    padding : "5px 10p",
    borderRadius : "50%",
    cursor: "pointer",
    float: "right"



}

export default withRouter(RunnerItem);
