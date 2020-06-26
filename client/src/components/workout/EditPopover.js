import React, { Component } from 'react'
import { Popover, Overlay, Form, Button, Row, Col } from 'react-bootstrap'

export class EditPopover extends Component {
    constructor(props){
        super(props);
        this.state ={
            type: '',
            percent: 0,
            distance: 0,
            distanceUnit: '',
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }

    handleEditTimeRep = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds
        }
        this.props.onSelect(repData, this.props.index);
        this.props.setShow()
    }

    handleDistanceRep = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            distance:this.state.distance,
            distanceUnit:this.state.distanceUnit
        }
        this.props.onSelect(repData, this.props.index);
        this.props.setShow();
    }
    
    
    render() {
        return (
            <Overlay show = {this.props.show} placement = "left">  
                <Popover id = "popover-basic" className = "text-center">
                <Popover.Title as = 'h3'>{this.props.rep.type}</Popover.Title>
                    {this.props.rep.distanceUnit === undefined ? 
                <Popover.Content>
                    <Form>
                         <Form.Control
                                    type = "text"
                                    placeholder = "% of V02 Max"
                                    name = "percent"
                                    onChange = {this.handleChange}
                                            />
                                <Form.Control
                                    type = "text"
                                    placeholder = "Hours"
                                    name = "hours"
                                    onChange = {this.handleChange}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Minutes"
                                    name = "minutes"
                                    onChange = {this.handleChange}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Seconds"
                                    name = "seconds"
                                    onChange = {this.handleChange}
                                            />
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary"  onClick={() => this.props.setShow}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleEditTimeRep}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                    </Popover.Content> : <Popover.Content>
                    <Form>
                         <Form.Control
                                    type = "text"
                                    placeholder = "% of V02 Max"
                                    name = "percent"
                                    onChange = {this.handleChange}
                                            />
                                <Form.Control
                                    type = "text"
                                    placeholder = "Distance"
                                    name = "distance"
                                    onChange = {this.handleChange}
                                            />
                                    
                                <Form.Control onChange = {this.handleChange} name = "distanceUnit" as = "select">
                                    <option hidden>Units</option>
                                    <option>Miles</option>
                                    <option>Kilometers</option>
                                    <option>Meters</option>
                                </Form.Control>
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary" onClick={() => this.props.setShow}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleDistanceRep}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                </Popover.Content>}
                </Popover>
            </Overlay>
        )
    }
}

export default EditPopover
