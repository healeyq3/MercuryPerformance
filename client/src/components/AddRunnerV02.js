import React, { Component } from 'react'
import { FormGroup, Form } from 'react-bootstrap'

export class AddRunnerV02 extends Component {
    render() {
        return (
            <FormGroup>
                <Form.Label>Initial Runner Data</Form.Label>
                <Form.Control
                                type = "text"
                                placeholder = "Distance"
                                name = "initialDistance"
                                onChange = {this.props.handleChange}
                            />
                 <Form.Control onChange = {this.props.handleChange} name = "distanceUnit" as = "select">
                                <option hidden>Units</option>
                                <option>Miles</option>
                                <option>Kilometers</option>
                                <option>Meters</option>
                 </Form.Control>
                 <Form.Control
                                type = "text"
                                placeholder = "Hours"
                                name = "initialHours"
                                onChange = {this.props.handleChange}
                            />
                <Form.Control
                                type = "text"
                                placeholder = "Minutes"
                                name = "initialMinutes"
                                onChange = {this.props.handleChange}
                            />
                <Form.Control
                                type = "text"
                                placeholder = "Seconds"
                                name = "initialSeconds"
                                onChange = {this.props.handleChange}
                            />
            </FormGroup>
        )
    }
}

export default AddRunnerV02
