import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';

export class CooldownDurationPopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            type:"cooldown",
            percent: 0,
            hours: 0,
            minutes:0,
            seconds:0,
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
            type:this.state.type,
            percent: this.state.percent,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds
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
                                <Button variant = "outline-secondary">Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleCreateCooldown}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                </Popover.Content>
                </Popover>}>
          <Button>Duration</Button>
        </OverlayTrigger>
        )
    }
}

export default connect(null, {  }) (CooldownDurationPopover);
