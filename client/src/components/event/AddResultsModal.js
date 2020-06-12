import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { newTime, selectRunner } from '../../actions/eventActions'
import { connect } from 'react-redux';
import {  getV02max, getWorkoutPace } from '../../math/V02max';
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
            v02max: 0,
            runnerIndex: 0,
            workoutPace: ''
        }

        const newRunnerKey = Object.keys(this.props.runners)[0]
        this.props.selectRunner(newRunnerKey);

        this.handleChange = this.handleChange.bind(this);
        this.incrementRunnerDown = this.incrementRunnerDown.bind(this);
        this.incrementRunnerUp = this.incrementRunnerUp.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
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
        const newStateArr = this.state.splits.slice();
        newStateArr.push(splitData);
        this.setState({splits:newStateArr});
    }

    handleCalculate = () => {
        const data = {
            distance: this.props.events[this.props.selectedEvent].distance,
            units: this.props.events[this.props.selectedEvent].distanceUnit,
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        console.log(data);
        let data1 = getWorkoutPace(data)
        let data2 = getV02max(data);
        this.setState({
            v02max: data2,
            workoutPace: data1
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
            finalTime: finalTimeData,
            splits: this.state.splits
        }
        this.props.newTime(timeData, this.props.selectedTeam, this.props.selectedTeam, this.props.selectedRunner);//needs to have selectedEventUID, and runnerUID
        this.props.setShow();
    }

    incrementRunnerUp(){
        let newRunnerIndex;
        if(this.state.runnerIndex === (Object.keys(this.props.events[this.props.selectedEvent].runners).length - 1)){
            newRunnerIndex = 0;
        } else {
            newRunnerIndex = this.state.runnerIndex + 1;
        }

        this.setState({
            runnerIndex: newRunnerIndex
        })

        this.setCurrentRunner(newRunnerIndex);
    }

    incrementRunnerDown(){
        let newRunnerIndex;
        if(this.state.runnerIndex === 0){
            newRunnerIndex = Object.keys(this.props.events[this.props.selectedEvent].runners).length - 1;
        } else {
            newRunnerIndex = this.state.runnerIndex - 1;
        }

        this.setState({
            runnerIndex: newRunnerIndex
        })
        this.setCurrentRunner(newRunnerIndex);
    }

    setCurrentRunner(newRunnerIndex){
        const runnerKey = Object.keys(this.props.events[this.props.selectedEvent].runners)[newRunnerIndex];
        this.props.selectRunner(runnerKey);
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

        const selectedRunnerName = this.props.runners[this.props.selectedRunner].name;

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
            {/* <Modal.Dialog> */} 
                <Modal.Header closeButton>{selectedRunnerName}</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                        <Col>
                            <Row>
                                <Form.Label>Final Time</Form.Label>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeHours" type = "text" placeholder = 'Hours'/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeMinutes" type = "text" placeholder = 'Minutes'/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeSeconds" type = "text" placeholder = 'Seconds'/>
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
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeHours" type = "text" placeholder = "Hours"/>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeMinutes" type = "text" placeholder = "Minutes"/>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange = {this.handleChange} name = "splitTimeSeconds" type = "text" placeholder = "Seconds"/>
                                    </Col>
                                </Row>
                                <Button variant = "primary" onClick = {this.handleAddSplits} size = 'sm'>Add Split</Button>
                                <Form.Group>
                                <Button variant = 'outline-primary' size = 'sm' onClick = {this.handleCalculate}>Calculate</Button>
                                    <Row>
                                        {/* <Button variant = 'outline-primary' size = 'sm' onClick = {this.handleCalculate}>V02max</Button>
                                        <Form.Label>{this.state.v02max}</Form.Label> */}
                                        <Form.Label>V02max: {this.state.v02max}</Form.Label>
                                        <Form.Label>↑</Form.Label>
                                    </Row>
                                    <Row>
                                        {/* <Button variant = 'outline-primary' size = 'sm' onClick = {this.handleCalculate}>Workout Pace</Button>
                                        <Form.Label>{this.state.workoutPace}</Form.Label> */}
                                        <Form.Label>Workout Pace: {this.state.workoutPace}</Form.Label>
                                    </Row>
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
                        <Button variant = "primary" onClick = {this.incrementRunnerDown}>⇦</Button>
                        <Button variant = "primary" onClick = {this.handleAddResults}>Save Results</Button>
                        <Button variant = "primary" onClick = {this.incrementRunnerUp}>⇨</Button>
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
    selectRunner: PropTypes.func.isRequired,
    rehydrated: PropTypes.bool.isRequired,
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        eventRunners: state.events.runners,
        selectedRunner: state.events.selectedRunner,
        selectedTeam: state.teams.selectedTeam,
        selectedEvent: state.events.selectedEvent,
        events: state.events.events,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { newTime, selectRunner }) (AddResultsModal);
