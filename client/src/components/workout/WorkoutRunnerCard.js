import React, { Component } from 'react'
import { Card, Button, Row, Col, Accordion } from 'react-bootstrap';
import WorkoutRepDataCard from './WorkoutRepDataCard';
// import {timeGenerator} from '../../math/TimeConversions'

export class WorkoutRunnerCard extends Component {
    
    render() {
        let repItems = [];
        for(const rep in this.props.reps){
           
            repItems.push(
                
                <React.Fragment>
                    <WorkoutRepDataCard runner = {this.props.runner} rep = {this.props.reps[rep]} />
                </React.Fragment>
            )  
        }
        console.log(this.props.reps);
        return (
            <Accordion>
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                    <Row>
                        <Col>
                        {<Card.Title>{this.props.runner.name}</Card.Title>}
                        </Col>
                        
                        
                        <Col>
                        <Button variant = "outline-primary" onClick = {this.props.setShow}>Edit</Button>
                        <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                        </Col>
                    </Row>
                    </Accordion.Toggle>  
                <Accordion.Collapse eventKey="0">
                <Card.Body sm = {4}>
                    {repItems}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        )
    }
}

export default WorkoutRunnerCard
