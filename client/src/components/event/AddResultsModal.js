import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { newTime, selectRunner } from '../../actions/eventActions'
import { connect } from 'react-redux';
import {  getV02max, getWorkoutPace } from '../../math/V02max';
import PropTypes from 'prop-types';
import { stringToNumber } from '../../math/TimeConversions';

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

        this.baseState = this.state;
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
        this.props.newTime(timeData, this.props.selectedTeam, this.props.selectedEvent, this.props.selectedRunner);//needs to have selectedEventUID, and runnerUID
        this.props.setShow();
    }

    async incrementRunnerUp(){
        
        console.log("----");
        console.log(Object.keys(this.props.runners));
        let newRunnerIndex;
        if(this.state.runnerIndex === (Object.keys(this.props.events[this.props.selectedEvent].runners).length - 1)){
            newRunnerIndex = 0;
        } else {
            newRunnerIndex = this.state.runnerIndex + 1;
        }

        this.setState({
            runnerIndex: newRunnerIndex
        })

        await this.setCurrentRunner(newRunnerIndex);
        console.log(this.props.selectedRunner);
        this.reset();
    }

     async incrementRunnerDown(){
        let newRunnerIndex;
        if(this.state.runnerIndex === 0){
            newRunnerIndex = Object.keys(this.props.events[this.props.selectedEvent].runners).length - 1;
        } else {
            newRunnerIndex = this.state.runnerIndex - 1;
        }

        this.setState({
            runnerIndex: newRunnerIndex
        })
        
        await this.setCurrentRunner(newRunnerIndex);
         
        this.reset();
    }

    setCurrentRunner(newRunnerIndex){
        const runnerKey = Object.keys(this.props.events[this.props.selectedEvent].runners)[newRunnerIndex];
        this.props.selectRunner(runnerKey);
    }

    reset = () => {
        console.log("Current Runner" + this.state.runnerIndex);
        let initialReduxSplits = [];
        let initialHours = 0;
        let initialMinutes = 0;
        let initialSeconds = 0;
        if(this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].hasOwnProperty('times') && this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.hasOwnProperty('finalTime')){
            initialHours = this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.finalTime.hours;
            initialMinutes = this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.finalTime.minutes;
            initialSeconds = this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.finalTime.seconds;
        }
        this.setState({
            finalTimeHours : initialHours,
            finalTimeMinutes : initialMinutes,
            finalTimeSeconds : initialSeconds
        })
        if(this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].hasOwnProperty('times') && this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.hasOwnProperty('splits') && this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.splits.hasOwnProperty('0')){
            console.log('passed if');
            initialReduxSplits = this.state.splits.concat(this.props.events[this.props.selectedEvent].runners[this.props.selectedRunner].times.splits);
            console.log(initialReduxSplits);
        }
        this.setState({
            splits: initialReduxSplits
        })
        this.setState({
            vo2max: 0,
            workoutPace : '',
            splitUnit : '',
            splitDistance : ''

        })
    }

    render() {
        let kArr = [];
        let mArr = [];
        let meArr = [];

        for(const split in this.state.splits){
            if(this.state.splits[split].splitUnit==="Kilometers"){
            kArr.push(
            <h6>{this.state.splits[split].splitDistance} - {this.state.splits[split].splitTimeHours}:{this.state.splits[split].splitTimeMinutes}:{this.state.splits[split].splitTimeSeconds}</h6>
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

        const selectedRunnerName = this.props.runners[this.props.selectedRunner].name; //something is fucking up here

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
            {/* <Modal.Dialog> */} 
                <Modal.Header closeButton>{selectedRunnerName}</Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                        <Col>
                            <Row>
                                <Form.Label>Final Time</Form.Label>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeHours" type = "text" placeholder = 'Hours' value = {this.state.finalTimeHours}/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeMinutes" type = "text" placeholder = 'Minutes' value = {this.state.finalTimeMinutes}/>
                                </Col>
                                <Col>
                                    <Form.Control onChange = {this.handleChange} name = "finalTimeSeconds" type = "text" placeholder = 'Seconds' value = {this.state.finalTimeSeconds}/>
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
                                <Button variant = 'outline-primary' size = 'sm' onClick = {this.handleCalculate}>Calculate Runner Analysis</Button>
                                <Form.Group>
                                <br></br>
                                    <Row>
                                        <Form.Label>V02max: {this.state.v02max}</Form.Label>
                                        {this.state.v02max > this.props.runners[this.props.selectedRunner].v02 ? <React.Fragment><h4 style = {{color: 'green'}}>↑</h4><Button variant = 'outline-success' size = 'sm'>Update</Button></React.Fragment> : <React.Fragment><h4 style = {{color: 'red'}}>↓</h4><Button variant = 'outline-danger' size = 'sm'>Update</Button></React.Fragment>}
                                    </Row>
                                    <Row>
                                        <Form.Label>Workout Pace: {this.state.workoutPace}</Form.Label>
                                        {stringToNumber(this.state.workoutPace) < stringToNumber(this.props.runners[this.props.selectedRunner].wPace) ? <React.Fragment><h4 style = {{color: 'green'}}>↑</h4><Button variant = 'outline-success' size = 'sm'>Update</Button></React.Fragment> : <React.Fragment><h4 style = {{color: 'red'}}>↓</h4><Button variant = 'outline-danger' size = 'sm'>Update</Button></React.Fragment>}
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
                        <Row className = 'justify-content-md-center'>
                            <ButtonGroup className = 'mb-2'>
                                <Button variant = "outline-secondary" onClick = {this.incrementRunnerDown}>⇦</Button>
                                <Button variant = "outline-secondary" onClick = {this.handleAddResults}>Save Results</Button>
                                <Button variant = "outline-secondary" onClick = {this.incrementRunnerUp}>⇨</Button>
                            </ButtonGroup>
                            
                        </Row>
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
