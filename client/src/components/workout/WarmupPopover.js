import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form} from 'react-bootstrap'

export class WarmupPopover extends Component {
    render() {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={
                <Popover id="popover-basic" className = "text-center">
                <Popover.Title as="h3">Add Warmup</Popover.Title>
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
                                    placeholder = "Value"
                                    name = "value"
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
          <Button >Add</Button>
        </OverlayTrigger>
        )
    }
}

export default WarmupPopover
