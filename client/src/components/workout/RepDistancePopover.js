import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';

export class RepDistancePopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            type:"rep",
            percent: 0,
            distance: 0,
            distanceUnit:'',
            reps:1
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }
    handleCreateRep = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            distance:this.state.distance,
            distanceUnit:this.state.distanceUnit
        }
        for(var i= 0; i<this.state.reps; i++){
            this.props.addArr(repData)
        }
    }
    render() {
        return (
            <OverlayTrigger closeButton trigger="click" placement="right" overlay={
                <Popover id="popover-basic" className = "text-center">
                <Popover.Title as="h3">Add Rep</Popover.Title>
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
                                <Form.Control
                                    type = "text"
                                    placeholder = "Reps"
                                    name = "reps"
                                    onChange = {this.handleChange}
                                            />
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary">Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleCreateRep}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                </Popover.Content>
                </Popover>}>
          <Button>Distance</Button>
        </OverlayTrigger>
        )
    }
}

export default connect(null, {  }) (RepDistancePopover);
