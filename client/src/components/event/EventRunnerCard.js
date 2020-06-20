import React, { Component } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';

export class EventRunnerCard extends Component {
    render() {
        let hour;
        let min;
        let seconds;
        let time;
        if(this.props.time!==undefined){
         hour = this.props.time.hours;
         min = this.props.time.minutes;
         seconds = this.props.time.seconds;
        if(hour===""){
            hour = '00'
        }
        if(min===""){
            min='00'
        }
        if(seconds===""){
            seconds='00'
        }
        time = hour + ":" + min + ":" +seconds
    }
    else{
        time = ''
    }
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>{this.props.runner.name}</Card.Title>
                        </Col>
                        <p>{time}</p>
                        <Col></Col>
                        <Col>
                        <Button variant = "outline-primary" onClick = {this.props.setShow}>Edit</Button>
                        <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default EventRunnerCard
