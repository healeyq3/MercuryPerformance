import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { newTime } from '../../actions/eventActions'
import { connect } from 'react-redux';
import {  getV02max } from '../../math/V02max';
import PropTypes from 'prop-types';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            finalTimeHours: 0,
            finalTimeMinutes: 0,
            finalTimeSeconds: 0,
            splits:[],
            splitUnit: '',
            splitDistance: '',
            splitTimeHours:0,
            splitTimeMinutes:0,
            splitTimeSeconds:0,
            v02max: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFinal = this.handleChangeFinal.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleAddSplits = () => {
            const splitData = {
                splitDistance: this.state.splitDistance,
                splitUnit:this.state.splitUnit,
                splitTimeHours: this.state.splitTimeHours,
                splitTimeMinutes: this.state.splitTimeMinutes,
                splitTimeSeconds: this.state.splitTimeSeconds
            }
            var newStateArr = this.state.splits.slice();
            newStateArr.push(splitData);
            this.setState({splits:newStateArr});
    }

    handleChangeFinal(e){
        this.setState({ [e.target.name] : e.target.value});
        const data = {
            distance: this.props.events[this.props.selectedEvent].distance,
            units: this.props.events[this.props.selectedEvent].distanceUnit,
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        console.log(this.props.events[this.props.selectedEvent].distance);
        console.log(this.props.events[this.props.selectedEvent].distanceUnit);
        console.log(data);
        let data2 = getV02max(data);
        this.setState({
            v02max:data2
        });
    }

    handleAddResults = () => {
        const finalTimeData = {
            distance: this.props.events[this.props.selectedEvent].distance,
            units: this.props.events[this.props.selectedEvent].distanceUnit,
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        const timeData = {
            user: cookie.load('user'),
            finalTime: finalTimeData,
            splits: this.state.splits
        }
        this.props.newTime(timeData, this.props.selectedTeam, this.props.selectedTeam, this.props.selectedRunner);//needs to have selectedEventUID, and runnerUID
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            v02max: 0
        })
    }

    render() {
        let kArr = [];
        let mArr = [];
        let meArr = [];
        for(const split in this.state.splits){
            if(this.state.splits[split].splitUnit==="Kilometers"){
            kArr.push(
            <h6>{this.state.splits[split].splitDistance}- {this.state.splits[split].splitTimeHours}:{this.state.splits[split].splitTimeMinutes}:{this.state.splits[split].splitTimeSeconds}</h6>
            )
            }
            else if(this.state.splits[split].splitUnit==="Miles"){
                mArr.push(
                    <h6>{this.state.splits[split].splitDistance}- {this.state.splits[split].splitTimeHours}:{this.state.splits[split].splitTimeMinutes}:{this.state.splits[split].splitTimeSeconds}</h6>
                )
            }
            else{
                meArr.push(
                    <h6>{this.state.splits[split].splitDistance}- {this.state.splits[split].splitTimeHours}:{this.state.splits[split].splitTimeMinutes}:{this.state.splits[split].splitTimeSeconds}</h6>
                )
            }
        }
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
            {/* <Modal.Dialog> */} 
                <Modal.Header closeButton>Runner Name</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                        <Col>
                            <Row>
                                <Form.Label>Final Time</Form.Label>
                                <Col>
                                    <Form.Control onChange = {this.handleChangeFinal} name = "finalTimeHours" type = "text" placeholder = 'Hours'/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChangeFinal} name = "finalTimeMinutes" type = "text" placeholder = 'Minutes'/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChangeFinal} name = "finalTimeSeconds" type = "text" placeholder = 'Seconds'/>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
                                    <Form.Label>Splits (optional)</Form.Label>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitDistance" type = "text" placeholder = "Distance" />
                                    </Col>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitUnit" as = "select">
                                        <option hidden>Units</option>
                                        <option>Miles</option>
                                        <option>Kilometers</option>
                                        <option>Meters</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeHours" type = "text" placeholder = "Hours"></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeMinutes" type = "text" placeholder = "Minutes"></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeSeconds" type = "text" placeholder = "Seconds"></Form.Control>
                                    </Col>
                                </Row>
                                <Button variant = "primary" onClick = {this.handleAddSplits}>Add Split</Button> 
                                <Form.Group>
                                    <Form.Label>V02max: {this.state.v02max}</Form.Label>  
                                </Form.Group> 
                            </Form.Group>
                        </Col>
                        <Col>
                            <h5>Splits:</h5>
                            <Row>
                                <Col>
                                <h6>KM:</h6>
                                {kArr}
                                </Col>
                                <Col>
                                <h6>Miles:</h6>
                                {mArr}
                                </Col>
                                <Col>
                                <h6>Meters:</h6>
                                {meArr}
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        <Button variant = "primary" >⇦</Button>
                        <Button variant = "primary" onClick = {this.handleAddResults}>Save Results</Button>
                        <Button variant = "primary" >⇨</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}
AddResultsModal.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    selectedTeam: PropTypes.string,
    selectedRunner: PropTypes.string,
    runners: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    newTime: PropTypes.func.isRequired,
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        eventRunners: state.events.runners,
        selectedRunner:state.events.selectedRunner,
        selectedEvent: state.events.selectedEvent,
        events: state.events.events
    }
}

export default connect(mapStateToProps, { newTime }) (AddResultsModal);
