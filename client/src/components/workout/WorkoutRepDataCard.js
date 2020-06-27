import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import {timeGenerator} from '../../math/TimeConversions';

export class WorkoutRepDataCard extends Component {
    render() {
        let timeData = {}
        if(this.props.rep.distanceUnit === undefined){
            timeData = {
                hours: this.props.rep.hours,
                minutes: this.props.rep.minutes,
                seconds: this.props.rep.seconds
            }
            console.log(timeGenerator(timeData));
        } else {
            console.log(this.props.rep.distanceUnit);
        }
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                            {this.props.rep.distanceUnit !== undefined ? <Card.Title>{this.props.rep.distance} {this.props.rep.distanceUnit} {this.props.rep.type}</Card.Title> : <Card.Title>{timeGenerator(timeData)} {this.props.rep.type}</Card.Title>}
                        </Col>
                            <p>{this.props.rep.percent}</p>
                        <Col>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutRepDataCard
