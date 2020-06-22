import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form} from 'react-bootstrap'

export class CooldownDistancePopover extends Component {
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
                                    onChange = {this.props.handleChange}
                                            />
                                <Form.Control
                                    type = "text"
                                    placeholder = "Distance"
                                    name = "distance"
                                    onChange = {this.props.handleChange}
                                            />
                                    
                                <Form.Control onChange = {this.props.handleChange} name = "distanceUnit" as = "select">
                                    <option hidden>Units</option>
                                    <option>Miles</option>
                                    <option>Kilometers</option>
                                    <option>Meters</option>
                                </Form.Control>
                                <Button>Add</Button>
                                </Form>
                </Popover.Content>
                </Popover>}>
          <Button>Distance</Button>
        </OverlayTrigger>
        )
    }
}

export default CooldownDistancePopover
