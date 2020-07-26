import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col} from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { sendActualTimes } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { secondsToAnswer, totalSeconds, stringToNumber } from '../../math/TimeConversions';
import { residualStandardDeviation, repActualEffortD, repActualEffortT } from '../../math/AnalysisAlgos';
import { getDistance2 } from '../../math/V02max';
import '../../css/workoutresultsmodal.css'

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
           aTimesLocal: [],
           addTotal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMileageChange = this.handleMileageChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.handleSecondChange = this.handleSecondChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleMileageChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].mileage = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
        console.log(this.state.aTimesLocal)
    }

    handleHourChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].hours = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
        console.log(this.state.aTimesLocal)
    }

    handleMinuteChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].minutes = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
        console.log(this.state.aTimesLocal)
    }

    handleSecondChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].seconds = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
        console.log(this.state.aTimesLocal)
    }

    handleSendingATimes = () => {
        let workoutStats = {
            resSD : 0, //residual standard deviation
            vE : [], // vector of actual percentages
            repsAdded: 0,
            workoutStatus : ''
        }
        let v1 = [];
        let rA = 0; // reps added
        for(const rep in this.state.aTimesLocal){
            if(this.state.aTimesLocal[rep].mileage !== undefined){ // time rep
                if(this.state.aTimesLocal[rep].mileage !== 0){
                    let specifiedTime = totalSeconds(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].totalSeconds);
                    let workoutPace = stringToNumber(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].wPace);
                    let distance = this.state.aTimesLocal[rep].mileage;
                    let actualEffort = repActualEffortT(specifiedTime, distance, workoutPace);
                    let e = actualEffort - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].percentEffort
                    let toChange = this.state.aTimesLocal;
                    toChange[rep].percentEffort = actualEffort
                    toChange[rep].percentOff = e;
                    this.setState({
                        aTimesLocal : toChange
                    })
                    v1.push(e);
                    rA++;
                }
            } else { // distance rep
                if(this.state.aTimesLocal[rep].hours !== 0 || this.state.aTimesLocal[rep].minutes !== 0 || this.state.aTimesLocal[rep].seconds !== 0){
                    let timeData = {
                        hours: this.state.aTimesLocal[rep].hours,
                        minutes: this.state.aTimesLocal[rep].minutes,
                        seconds: this.state.aTimesLocal[rep].seconds
                    }
                    let aSeconds = totalSeconds(timeData);
                    let workoutPace = stringToNumber(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].wPace);
                    let distance = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].repDist;
                    let distanceUnit = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].repUnit;
                    let d = getDistance2(distance, distanceUnit);
                    let actualEffort = repActualEffortD(d, aSeconds, workoutPace);
                    let e = actualEffort - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].percentEffort;
                    let toChange = this.state.aTimesLocal;
                    toChange[rep].percentEffort = actualEffort;
                    toChange[rep].percentOff = e;
                    this.setState({
                        aTimesLocal: toChange
                    })
                    v1.push(e);
                    rA++
                }
            }
        }
        if(rA !== 0){
            workoutStats.resSD = residualStandardDeviation(v1);
            workoutStats.vE = v1;
            workoutStats.repsAdded = rA;
        }
        console.log(workoutStats);

        this.props.sendActualTimes(this.state.aTimesLocal, this.props.selectedWorkout, this.props.runner);
        console.log("Sent aTimesLocal");
        this.props.calculateTeamAverage(this.props.runner, workoutStats.resSD);
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            aTimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aTimes
        });
    }


    render() {
        if(!this.props.workouts[this.props.selectedWorkout] || !this.props.runners[this.props.runner] || !this.props.workouts[this.props.selectedWorkout].runners[this.props.runner]){
            return null;
        }
        let repResults = []

        this.state.aTimesLocal.map((rep, i) => {
            if(rep.mileage !== undefined){
                repResults.push(
                    <div className = 'time-row-container' key = {i}>
                        <div>
                            <Form.Label className = "time-row-label">{secondsToAnswer(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].totalSeconds)} Rep</Form.Label>
                        </div>
                        <div>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].mileage} onChange = {this.handleMileageChange} type = "text"/>
                        </div>
                        <div>
                            <Form.Label>Mile(s)</Form.Label>
                        </div>
                        {/* { i === 0 ? <React.Fragment></React.Fragment> : 
                        <Col>
                        <Button>Enter Total</Button>
                        </Col>
                        } */}
                    </div>
                )
            } else{
                repResults.push(
                    <div className = "time-row-container" key = {i}>
                        <div>
                            <Form.Label className = "time-row-label">{this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].repDist} {this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].repUnit} Rep:</Form.Label>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aTimesLocal[i].hours} onChange = {this.handleHourChange} type = "text"/>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aTimesLocal[i].minutes} onChange = {this.handleMinuteChange} type = "text"/>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aTimesLocal[i].seconds} onChange = {this.handleSecondChange} type = "text"/>
                        </div>
                        {/* { i === 0 ? <React.Fragment></React.Fragment> : 
                        <Col>
                        <Button>Enter Total</Button>
                        </Col>
                        } */}
                        
                    </div>
                )
                
            }
            return true; //wrote this so the error that said "Expected to return a value in arrow function" would go away
        })

        this.state.aTimesLocal.map((rep, i) => {

        })


        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runners[this.props.runner].name} | {this.state.addTotal === false ? <div>Workout Splits</div> : <div>Rest Splits</div>}</Modal.Header>
                <Modal.Body>
                    {this.state.addTotal === false ? 
                        <React.Fragment>
                            <Button onClick = {() => {this.setState({addTotal : true})}}>Enter Rest</Button>
                            <Form>
                                <Row>
                                <Col>
                                    {repResults}
                                </Col>
                                </Row>
                                <Row className = 'justify-content-md-center'>
                                    <Button variant = "outline-secondary" onClick = {this.handleSendingATimes}>Save Results</Button>
                                </Row>
                            </Form>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button onClick = {() => {this.setState({addTotal : false})}}>Enter Splits</Button>
                        </React.Fragment>

                    }
                    
                </Modal.Body>
            </Modal>
        )
    }
}
AddResultsModal.propTypes = {
    runners: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired,
    selectedWorkout: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool,
    updateRunner : PropTypes.func,
    runner : PropTypes.string.isRequired
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        selectedTeam: state.workouts.selectedTeam,
        workouts: state.workouts.actualWorkouts,
        selectedWorkout: state.workouts.selectedWorkout,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { sendActualTimes, selectRunner, updateRunner }) (AddResultsModal);
