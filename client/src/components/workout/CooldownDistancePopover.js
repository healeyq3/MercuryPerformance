import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form} from 'react-bootstrap'
import cookie from 'react-cookies';
import { connect } from 'react-redux';

export class CooldownDistancePopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            type:"cooldown",
            percent: '',
            distance: '',
            distanceUnit:'',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }
    handleCreateCooldown = () => {
        const repData = {
            user: cookie.load('user'),
            percent: this.state.percent,
            distance:this.state.distance,
            distanceUnit:this.state.distanceUnit
        }
        this.props.addArr(repData)
    }
    render() {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={
                <Popover id="popover-basic" className = "text-center">
                <Popover.Title as="h3">Add Cooldown</Popover.Title>
                <Popover.Content>
                    <Form>
                         <Form.Control
                                    type = "text"
                                    placeholder = "% of V02 Max"
                                    name = "v02"
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
                                <Button variant = "primary" onClick = {this.handleCreateCooldown}>Add</Button>
                                </Form>
                </Popover.Content>
                </Popover>}>
          <Button>Distance</Button>
        </OverlayTrigger>
        )
    }
}

export default connect(null, {  }) (CooldownDistancePopover);
