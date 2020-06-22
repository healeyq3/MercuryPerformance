import React, { Component } from 'react'
import {Popover, OverlayTrigger, Button, Form} from 'react-bootstrap'
import cookie from 'react-cookies';
import { connect } from 'react-redux';

export class WarmupDurationPopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            percent: '',
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
    handleCreateWarmup = () => {
        const repData = {
            user: cookie.load('user'),
            percent: this.state.percent,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds
        }
        //this.props.newTeam(teamData);
    }
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

export default connect(null, {  }) (WarmupDurationPopover);
