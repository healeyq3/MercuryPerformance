import React, { Component } from 'react'
import { Popover, Overlay, Form, Button, Row, Col, Container } from 'react-bootstrap'
import ReactDOM from 'react-dom';

export class EditPopover extends Component {
    constructor(props){
        super(props);
        this.state ={
            type: this.props.rep.type,
            percent: this.props.rep.percent,
            distance: this.props.rep.distance !== undefined ? this.props.rep.distance : 0,
            distanceUnit: this.props.rep.distanceUnit !== undefined ? this.props.rep.distanceUnit : '',
            hours: this.props.rep.hours !== undefined ? this.props.rep.hours : 0,
            minutes: this.props.rep.minutes !== undefined ? this.props.rep.minutes : 0,
            seconds: this.props.rep.seconds !== undefined ? this.props.rep.seconds : 0,
            show: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }

    handleEditTimeRep = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds:this.state.seconds
        }
        this.props.onSelect(repData, this.props.index);
        this.props.setShow()
    }

    handleDistanceRep = () => {
        const repData = {
            type:this.state.type,
            percent: this.state.percent,
            distance:this.state.distance,
            distanceUnit:this.state.distanceUnit
        }
        this.props.onSelect(repData, this.props.index);
        this.props.setShow();
    }
    
    
    render() {
        return (
            <Container fluid>
            <Button variant = "outline-primary" onClick={() => this.setState({show: !this.state.show})} ref={(button) => { this.target = button; }}>Edit</Button>
            <Overlay show = {this.state.show} placement = "left" target={ReactDOM.findDOMNode(this.target)}>  
                <Popover id = "popover-basic" className = "text-center">
                <Popover.Title as = 'h3'>{this.props.rep.type}</Popover.Title>
                    {this.props.rep.distanceUnit === undefined ? 
                <Popover.Content>
                    <Form>
                         <Form.Control
                                    type = "text"
                                    placeholder = "% of V02 Max"
                                    name = "percent"
                                    onChange = {this.handleChange}
                                    value = {this.state.percent}
                                            />
                                <Form.Control
                                    type = "text"
                                    placeholder = "Hours"
                                    name = "hours"
                                    onChange = {this.handleChange}
                                    value = {this.state.hours}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Minutes"
                                    name = "minutes"
                                    onChange = {this.handleChange}
                                    value = {this.state.minutes}
                                            />
                                            <Form.Control
                                    type = "text"
                                    placeholder = "Seconds"
                                    name = "seconds"
                                    onChange = {this.handleChange}
                                    value = {this.state.seconds}
                                            />
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary"  onClick={() => this.setState({show: !this.state.show})}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleEditTimeRep}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                    </Popover.Content> : <Popover.Content>
                    <Form>
                         <Form.Control
                                    type = "text"
                                    placeholder = "% of V02 Max"
                                    name = "percent"
                                    onChange = {this.handleChange}
                                    value = {this.state.percent}
                                            />
                                <Form.Control
                                    type = "text"
                                    placeholder = "Distance"
                                    name = "distance"
                                    onChange = {this.handleChange}
                                    value = {this.state.distance}
                                            />
                                    
                                <Form.Control onChange = {this.handleChange} name = "distanceUnit" as = "select" value = {this.state.distanceUnit}>
                                    <option hidden>Units</option>
                                    <option>Miles</option>
                                    <option>Kilometers</option>
                                    <option>Meters</option>
                                </Form.Control>
                                <Row>
                                <Col>
                                <Button variant = "outline-secondary" onClick={() => this.setState({show: !this.state.show})}>Cancel</Button>
                                </Col>
                                <Col>
                                <Button variant = "primary" onClick = {this.handleDistanceRep}>Add</Button>
                                </Col>
                                </Row>
                                </Form>
                </Popover.Content>}
                </Popover>
            </Overlay>
            </Container>
        )
    }
}

export default EditPopover
