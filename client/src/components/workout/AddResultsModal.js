import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col} from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { sendActualTimes } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { secondsToAnswer, totalSeconds } from '../../math/TimeConversions';
import { residualStandardDeviation } from '../../math/AnalysisAlgos';

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
            resSD : 0,
            vE : [],
            repsAdded: 0,
            workoutStatus : ''
        }
        let v1 = [];
        let rA = 0;
        for(const rep in this.state.aTimesLocal){
            if(this.state.aTimesLocal[rep].mileage !== undefined){
                if(this.state.aTimesLocal[rep].mileage !== 0){
                    let e = (this.state.aTimesLocal[rep].mileage - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedMileage) / this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedMileage;
                    v1.push(e * 100);
                    rA++;
                }
            } else {
                if(this.state.aTimesLocal[rep].hours !== 0 || this.state.aTimesLocal[rep].minutes !== 0 || this.state.aTimesLocal[rep].seconds !== 0){
                    let timeData = {
                        hours: this.state.aTimesLocal[rep].hours,
                        minutes: this.state.aTimesLocal[rep].minutes,
                        seconds: this.state.aTimesLocal[rep].seconds
                    }
                    let aSeconds = totalSeconds(timeData);
                    let e = (aSeconds - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedSeconds) / this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedSeconds
                    v1.push(e * 100);
                    rA++
                }
            }
        }
        if(rA !== 0){
            workoutStats.resSD = residualStandardDeviation(v1);
            workoutStats.repsAdded = rA;
        }

        this.props.sendActualTimes(this.state.aTimesLocal, this.props.selectedWorkout, this.props.runner);
        console.log("Sent aTimesLocal");
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            aTimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aTimes
        });
    }


    render() {
        if(!this.props.workouts[this.props.selectedWorkout] || !this.props.runners[this.props.runner]){
            return null;
        }
        let repResults = []

        this.state.aTimesLocal.map((rep, i) => {
            if(rep.mileage !== undefined){
                repResults.push(
                    <Row key = {i}>
                        <Col>
                            <Form.Label>{secondsToAnswer(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].totalSeconds)} Rep</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].mileage} onChange = {this.handleMileageChange} type = "text"/>
                        </Col>
                        <Col>
                            <Form.Label>Mile(s)</Form.Label>
                        </Col>
                        {/* { i === 0 ? <React.Fragment></React.Fragment> : 
                        <Col>
                        <Button>Enter Total</Button>
                        </Col>
                        } */}
                    </Row>
                )
            } else{
                repResults.push(
                    <Row key = {i}>
                        <Col>
                            <Form.Label>{this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].repDist} {this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[i].repUnit} Rep:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].hours} onChange = {this.handleHourChange} type = "text"/>
                        </Col>
                        <Col>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].minutes} onChange = {this.handleMinuteChange} type = "text"/>
                        </Col>
                        <Col>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].seconds} onChange = {this.handleSecondChange} type = "text"/>
                        </Col>
                        {/* { i === 0 ? <React.Fragment></React.Fragment> : 
                        <Col>
                        <Button>Enter Total</Button>
                        </Col>
                        } */}
                        
                    </Row>
                )
                
            }
            return true; //wrote this so the error that said "Expected to return a value in arrow function" would go away
        })

        this.state.aTimesLocal.map((rep, i) => {

        })

        

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runners[this.props.runner].name} | {this.state.addTotal === false ? "Individual Splits" : "Total Results"}</Modal.Header>
                <Modal.Body>
                    {this.state.addTotal === false ? 
                        <React.Fragment>
                            <Button onClick = {() => {this.setState({addTotal : true})}}>Enter Total</Button>
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
