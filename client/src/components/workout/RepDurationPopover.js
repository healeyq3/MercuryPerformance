import React, { Component } from 'react'
import {Popover, Overlay, Button, Form, Row, Col, Container} from 'react-bootstrap'
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

export class RepDurationPopover extends Component {
    constructor(props){
        super(props);

        this.state = {
            type:"rep",
            percent: 0,
            hours: 0,
            minutes:0,
            seconds:0,
            reps:1,
            show: false
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
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds,
        }
        for(var i= 0; i<this.state.reps; i++){
            this.props.addArr(repData)
        }
    }
    render() {
        return (
            <Container fluid>
                <Button onClick={() => this.setState({show: !this.state.show})} ref={(button) => { this.target = button; }}>Duration</Button>
            <Overlay placement="right" show={this.state.show}  target={ReactDOM.findDOMNode(this.target)} >
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
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Reps"
                                    name = "reps"
                                    onChange = {this.handleChange}
                                            />
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary" onClick={() => this.setState({show: !this.state.show})}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleCreateRep}>Add</Button>
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

export default connect(null, {  }) (RepDurationPopover);
