import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { newTime, selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { connect } from 'react-redux';
import {  getV02max, getWorkoutPace } from '../../math/V02max';
import PropTypes from 'prop-types';
import { stringToNumber } from '../../math/TimeConversions';
import {Row, Form, Col, Button} from "react-bootstrap";
import "../../css/eventdetails.css"

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
            workoutPace: '',
            canEdit: false,
            updateV02: false,
            updateWPace : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    updateFinalTime = () => {
        console.log("Called")
        this.handleCalculate();
        this.changeEdit();
    }

    changeEdit = () => {
        this.setState((state) => ({
            canEdit : !state.canEdit
        }))
    }

    sortSplits = () => {
        if(this.state.splits.length > 0){
            for(let i = 0; i < this.state.splits.length - 1 ; i++){
                if(this.state.splits[i].splitDistance > this.state.splits[i + 1].splitDistance){
                    const first = this.state.splits[i];
                    const second = this.state.splits[i+1];
                    const newStateArr = this.state.splits.slice();
                    newStateArr[i] = second;
                    newStateArr[i+1] = first;
                    this.setState({
                        splits: newStateArr
                    });
                }
            }
        }
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

    handleUpdateV02 = () => {
        this.setState({
            updateV02 : true
        })
    }

    handleUpdateWPace = () => {
        this.setState({
            updateWPace : true
        })
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
    };

    handleSave = () => {
        this.handleAddResults();
        this.props.setShow();
    }

    handleAddResults = () => {
        const timeData = {
            distance: this.props.events[this.props.selectedEvent].distance,
            units: this.props.events[this.props.selectedEvent].distanceUnit,
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        const splitsData = {
            splits: this.state.splits
        }

        const analysisData = {
            v02: this.state.v02max,
            wPace: this.state.workoutPace
        }

        this.props.newTime(timeData, splitsData, analysisData, this.props.selectedTeam, this.props.selectedEvent, this.props.runneruid);//needs to have selectedEventUID, and runnerUID
        
        if(this.state.updateV02 === true){
            const newV02 = this.state.v02max;
            const runner = this.props.runneruid;
            const toUpdate = 'v02'
            this.props.updateRunner(runner, toUpdate, newV02);
        }
        if(this.state.updateWPace === true){
            const newWPace = this.state.workoutPace;
            const runner = this.props.runneruid;
            const toUpdate = 'wPace';
            this.props.updateRunner(runner, toUpdate, newWPace);
        }
    }

    reset = () => {
        console.log("Reset called");
        let initialReduxSplits = [];
        let initialHours = 0;
        let initialMinutes = 0;
        let initialSeconds = 0;
        if(this.props.events[this.props.selectedEvent].runners[this.props.runneruid].hasOwnProperty('time')){
            initialHours = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].time.hours;
            initialMinutes = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].time.minutes;
            initialSeconds = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].time.seconds;
        }
        this.setState({
            finalTimeHours : initialHours,
            finalTimeMinutes : initialMinutes,
            finalTimeSeconds : initialSeconds
        });
        if(initialHours !== 0 || initialMinutes !== 0 || initialSeconds !== 0){
            this.setState({canEdit : false})
        } else {
            this.setState({canEdit: true})
        }
        if(this.props.events[this.props.selectedEvent].runners[this.props.runneruid].hasOwnProperty('splits')){
            initialReduxSplits = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].splits;
        };
        this.setState({
            splits: initialReduxSplits
        })
        let initialV02 = 0
        if(this.props.events[this.props.selectedEvent].runners[this.props.runneruid].hasOwnProperty('raceV02')){
            initialV02 = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].raceV02
        }
        let initialWPace = ''
        if(this.props.events[this.props.selectedEvent].runners[this.props.runneruid].hasOwnProperty('raceWPace')){
            initialWPace = this.props.events[this.props.selectedEvent].runners[this.props.runneruid].raceWPace
        }
        this.setState({
            v02max: initialV02,
            workoutPace: initialWPace
        })
        this.setState({
            splitUnit : '',
            splitDistance : '',
            splitTimeHours:0,
            splitTimeMinutes:0,
            splitTimeSeconds:0,
            updateV02: false,
            updateWPace: false

        })
        console.log("reset finished");
    }

    render() {
        let kArr = [];
        let mArr = [];
        let meArr = [];

        this.sortSplits();
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

        if(!this.props.runners[this.props.runneruid]){
            return null;
        }

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runners[this.props.runneruid].name}</Modal.Header>
                <Modal.Body>
                    <Form >
                        {this.state.canEdit === false ?
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group as = {Row}>
                                        <Form.Label>Final Time: {this.state.finalTimeHours !== 0 ? this.state.finalTimeHours + ":" + this.state.finalTimeMinutes + ":" + this.state.finalTimeSeconds : this.state.finalTimeMinutes + ":" + this.state.finalTimeSeconds}</Form.Label>
                                        <Col>
                                            <Button className = "normal-button" onClick = {() => this.changeEdit()}>✎</Button>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Form.Label>Splits</Form.Label>
                                            <Col>
                                                <Form.Control onChange = {this.handleChange} name = "splitDistance" type = "text" placeholder = "Distance" value = {this.state.splitDistance}/>
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
                                                <Form.Control onChange = {this.handleChange} name = "splitTimeHours" type = "text" placeholder = "Hours" value = {this.state.splitTimeHours}/>
                                            </Col>
                                            <Col>
                                                <Form.Control onChange = {this.handleChange} name = "splitTimeMinutes" type = "text" placeholder = "Minutes" value = {this.state.splitTimeMinutes}/>
                                            </Col>
                                            <Col>
                                                <Form.Control onChange = {this.handleChange} name = "splitTimeSeconds" type = "text" placeholder = "Seconds" value = {this.state.splitTimeSeconds}/>
                                            </Col>
                                        </Row>
                                        <Button className = "normal-button" onClick = {this.handleAddSplits}>+</Button>
                                        <Form.Group>
                                        <br/>
                                            <Row>
                                                <Form.Label>V02max: {this.state.v02max}</Form.Label>
                                                {this.state.updateV02 === true ? <React.Fragment><h4>   Updated!</h4></React.Fragment> : this.state.v02max === this.props.runners[this.props.runneruid].v02 ? <React.Fragment><h4 style = {{color: 'orange'}}>=</h4></React.Fragment> : this.state.v02max > this.props.runners[this.props.runneruid].v02 ? <React.Fragment><h4 style = {{color: 'green'}}>↑</h4><Button className = "good-button" size = 'sm' onClick = {this.handleUpdateV02}>Update</Button></React.Fragment> : <React.Fragment><h4 style = {{color: 'red'}}>↓</h4><Button className = "bad-button" size = 'sm' onClick = {this.handleUpdateV02}>Update</Button></React.Fragment>}
                                            </Row>
                                            <Row>
                                                <Form.Label>Workout Pace: {this.state.workoutPace}</Form.Label>
                                                {this.state.updateWPace === true ? <React.Fragment><h4>   Updated!</h4></React.Fragment> : stringToNumber(this.state.workoutPace) === stringToNumber(this.props.runners[this.props.runneruid].wPace) ? <React.Fragment><h4 style = {{color: 'orange'}}>=</h4></React.Fragment> : stringToNumber(this.state.workoutPace) < stringToNumber(this.props.runners[this.props.runneruid].wPace) ? <React.Fragment><h4 style = {{color: 'green'}}>↑</h4><Button className = "good-button" size = 'sm' onClick = {this.handleUpdateWPace}>Update</Button></React.Fragment> : <React.Fragment><h4 style = {{color: 'red'}}>↓</h4><Button className = "bad-button" size = 'sm' onClick = {this.handleUpdateWPace}>Update</Button></React.Fragment>}
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
                                <Button className = "normal-button" onClick = {this.handleSave}>Save Results</Button>
                            </Row>
                        </Form>
                        :
                        <Form>
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
                                <Col>
                                <Button className = "normal-button" onClick = {() => this.updateFinalTime()}>Update</Button>
                                </Col>
                            </Row>
                        </Form>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
AddResultsModal.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    selectedTeam: PropTypes.string,
    runners: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    newTime: PropTypes.func.isRequired,
    selectRunner: PropTypes.func.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    updateRunner : PropTypes.func.isRequired
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        eventRunners: state.events.runners,
        selectedTeam: state.teams.selectedTeam,
        selectedEvent: state.events.selectedEvent,
        events: state.events.events,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { newTime, selectRunner, updateRunner }) (AddResultsModal);
