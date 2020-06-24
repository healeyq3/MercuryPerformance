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
            restDistance: 0,
            restDistanceUnit: undefined,
            restHours:0,
            restMinutes:0,
            restSeconds:0,
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
            if(this.state.restDistance!==0){
                const restData = {
                    type: this.state.type,
                    percent:1,
                    distance:this.state.restDistance,
                    distanceUnit:this.state.restDistanceUnit
                }
                this.props.addArr(repData)
                this.props.addArr(restData)
            }
            else if(this.state.restDuration!==0){
                const restData = {
                    type:"rest",
                    percent: 1,
                    hours: this.state.restHours,
                    minutes: this.state.restMinutes,
                    seconds:this.state.restSeconds,
                }
                this.props.addArr(repData)
                this.props.addArr(restData)
            }
            else{
            this.props.addArr(repData)
            }
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
                                    <Form.Label>Rest</Form.Label>
                                    <Row>
                                        <Col>
                                    <Form.Control
                                    inline
                                    type = "text"
                                    placeholder = "Distance"
                                    name = "restDistance"
                                    onChange = {this.handleChange}
                                            />
                                            </Col>
                                            <Col>
                                    <Form.Control
                                    inline
                                    as = "select"
                                    placeholder = "Unit"
                                    name = "restDistanceUnit"
                                    onChange = {this.handleChange}
                                            ><option hidden>Units</option>
                                            <option>Miles</option>
                                            <option>Kilometers</option>
                                            <option>Meters</option></Form.Control>
                                            </Col>
                                            </Row>
                                            <p>or</p>
                                    <Row>
                                        <Col>
                                    <Form.Control
                                    type = "text"
                                    placeholder = "Hours"
                                    name = "restHours"
                                    onChange = {this.handleChange}
                                            />
                                            </Col>
                                            <Col>
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Minutes"
                                    name = "restMinutes"
                                    onChange = {this.handleChange}
                                            />
                                            </Col>
                                            <Col>
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Seconds"
                                    name = "restSeconds"
                                    onChange = {this.handleChange}
                                            />
                                            </Col>
                                            </Row>
                                            <p></p>
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
