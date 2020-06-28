import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import {totalSeconds, timeGenerator, stringToNumber} from '../../math/TimeConversions';

export class WorkoutRepDataCard extends Component {
    render() {
        let timeData = {}
        let wPaceSeconds = stringToNumber(this.props.runner.wPace); //this is a #
        // let predictedTime = ''
        let predictedDistance = 0
        if(this.props.rep.distanceUnit === undefined){
            timeData = {
                hours: this.props.rep.hours,
                minutes: this.props.rep.minutes,
                seconds: this.props.rep.seconds
            }
            let amountOfTime = totalSeconds(timeData);
            let pd = amountOfTime / (wPaceSeconds / (this.props.rep.percent / 100));
            predictedDistance = Math.round((pd) * 100) / 100;
        } else {
            
        }
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                            {this.props.rep.distanceUnit !== undefined ? <Card.Title>{this.props.rep.distance} {this.props.rep.distanceUnit} {this.props.rep.type}</Card.Title> : <Card.Title>{timeGenerator(timeData)} {this.props.rep.type}</Card.Title>}
                        </Col>   
                        <Col>
        {this.props.rep.distanceUnit !== undefined ? <p>Predicted Time: </p> : <p>Predicted Distance: {predictedDistance}</p>}
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutRepDataCard
