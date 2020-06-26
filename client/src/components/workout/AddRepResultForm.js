import React, { Component } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap';

export class AddRepResultForm extends Component {
    render() {
        return (
            <Container fluid>
            <Row>
                                <Form.Label>Reps</Form.Label>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeHours" type = "text" placeholder = 'Hours' value = {this.props.finalTimeHours}/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeMinutes" type = "text" placeholder = 'Minutes' value = {this.props.finalTimeMinutes}/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeSeconds" type = "text" placeholder = 'Seconds' value = {this.props.finalTimeSeconds}/>
                                </Col>
                            </Row>
                            <p></p>
                            </Container>
        )
    }
}

export default AddRepResultForm
