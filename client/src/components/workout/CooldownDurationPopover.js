import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form} from 'react-bootstrap'

export class CooldownDurationPopover extends Component {
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
                                    placeholder = "Hours"
                                    name = "hours"
                                    onChange = {this.props.handleChange}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Minutes"
                                    name = "Minutes"
                                    onChange = {this.props.handleChange}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Seconds"
                                    name = "Seconds"
                                    onChange = {this.props.handleChange}
                                            />
                                <Button>Add</Button>
                                </Form>
                </Popover.Content>
                </Popover>}>
          <Button>Duration</Button>
        </OverlayTrigger>
        )
    }
}

export default CooldownDurationPopover
