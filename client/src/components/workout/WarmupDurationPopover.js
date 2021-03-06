import React, { Component } from 'react'
import {Popover, Overlay, Button, Form, Row, Col, Container} from 'react-bootstrap'
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

export class WarmupDurationPopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            type:"duration warmup",
            percent: 0,
            hours: 0,
            minutes:0,
            seconds:0,
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    handleCreateWarmup = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds
        }
        let toAddArr = []
        toAddArr.push(repData)
        this.props.addArr(toAddArr);
        this.setState({show: !this.state.show});
    }

    reset = () => {
        this.setState({
            type:"duration warmup",
            percent: 0,
            hours: 0,
            minutes:0,
            seconds:0
        })
    }

    render() {
        return (
            <Container fluid>
            <Button onClick={() => this.setState({show: !this.state.show})} ref={(button) => { this.target = button; }}>Duration</Button>
            <Overlay show={this.state.show} onEnter = {this.reset} target={ReactDOM.findDOMNode(this.target)} placement="right">
                <Popover id="popover-basic" className = "text-center">
                <Popover.Title as="h3">Add Warmup</Popover.Title>
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
                                <Button variant = "outline-secondary"  onClick={() => this.setState({show: !this.state.show})}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleCreateWarmup}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                </Popover.Content>
                </Popover>
        </Overlay>
        </Container>
        )
    }
}

export default connect(null, {  }) (WarmupDurationPopover);
