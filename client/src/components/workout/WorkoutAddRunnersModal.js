import React, { Component } from '../../../node_modules/react'
import { Modal, Form, Button } from '../../../node_modules/react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addRunnersToWorkout } from "../../actions/workoutActions";
import { secondsToAnswer, totalSeconds, stringToNumber, distanceToTime } from '../../math/TimeConversions';
import { getDistance2 } from '../../math/V02max';

export class WorkoutAddRunnersModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            runnersToAddToFire: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        if(e.target.checked === true){
            let runnerUID = e.target.value;
            let wPaceSeconds = stringToNumber(this.props.runners[runnerUID].wPace);
            let pTimes = [];
            let predictedTime = '';
            let predictedDistance = 0;
            let secondsForRep = 0;
            let total = {
                totalTime: 0,
                totalDistance: 0,
                averagePace: ''
            }
            for(const repNumber in this.props.workouts[this.props.selectedWorkout].reps){
                let rep = this.props.workouts[this.props.selectedWorkout].reps[repNumber];
                let toAdd = {}
                if(rep.distanceUnit === undefined){ // time rep
                    let timeData = {
                        hours: rep.hours,
                        minutes: rep.minutes,
                        seconds: rep.seconds
                    }
                    let amountOfTime = totalSeconds(timeData);
                    let pd = amountOfTime / (wPaceSeconds / (rep.percent / 100));
                    predictedDistance = Math.round((pd) * 100) / 100;
                    toAdd = {
                        type: rep.type,
                        totalSeconds: amountOfTime,
                        predictedDistance: predictedDistance,
                        averagePace: secondsToAnswer(wPaceSeconds / (rep.percent / 100)),
                        percentEffort : rep.percent
                    }
                    let updatedDistance = total.totalDistance + predictedDistance;
                    let updatedTime = total.totalTime + amountOfTime;
                    let updatedAveragePace = secondsToAnswer(updatedTime / updatedDistance);
                    total = {
                        totalTime: updatedTime,
                        totalDistance: updatedDistance,
                        averagePace: updatedAveragePace
                    }
                } else { // distance rep
                    secondsForRep = distanceToTime(rep.distance, rep.distanceUnit, (wPaceSeconds / (rep.percent / 100)));
                    predictedTime = secondsToAnswer(secondsForRep)
                    toAdd = {
                        type: rep.type,
                        predictedSeconds: secondsForRep,
                        predictedTime: predictedTime,
                        repDist: rep.distance,
                        repUnit: rep.distanceUnit,
                        averagePace: secondsToAnswer(wPaceSeconds / (rep.percent / 100)),
                        percentEffort : rep.percent
                    }
                    let updatedDistance = total.totalDistance + getDistance2(rep.distance, rep.distanceUnit);
                    let updatedTime = total.totalTime + secondsForRep;
                    let updatedAveragePace = secondsToAnswer(updatedTime / updatedDistance);
                    total = {
                        totalTime: updatedTime,
                        totalDistance: updatedDistance,
                        averagePace: updatedAveragePace
                    }
                }
                pTimes.push(toAdd)
            }
            const information = {
                pTimes: pTimes,
                pTotal: total,
                wPace: this.props.runners[runnerUID].wPace,
                wV02: this.props.runners[runnerUID].v02
            }
            if( this.state.runnersToAddToFire.length === 0){
                this.setState((state) => ({
                    runnersToAddToFire: {...state.runnersToAddToFire, [runnerUID]: information}
                }));
            } else {
                this.setState((state) => ({
                    runnersToAddToFire: {...state.runnersToAddToFire, [runnerUID]: information}
                }));
            }
        } else {
            if(this.state.runnersToAddToFire.hasOwnProperty(e.target.value)){
                let toReplace = this.state.runnersToAddToFire
                delete toReplace[e.target.value]
                this.setState({
                    runnersToAddToFire: toReplace
                })
            }
        }
    }
    handleAddRunners = () => {
        this.props.addRunnersToWorkout(this.state.runnersToAddToFire, this.props.selectedWorkout);
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            runnersToAddToFire: []
        })
    }

    render() {
        
        let runnerToAddArr = [];

        

       for(const runner in this.props.runners){
            if(this.props.runners.hasOwnProperty(runner)){
                if(this.props.workouts[this.props.selectedWorkout].hasOwnProperty('runners') === false){
                    runnerToAddArr.push(
                        <Form.Group key = {this.props.runners[runner].key}>
                         <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} >
                             <Form.Check.Input id = {this.props.runners[runner].key} type = 'checkbox' value = {this.props.runners[runner].key} onChange = {this.handleChange}/>
                             <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>
                    );
                } else if(this.props.workouts[this.props.selectedWorkout].runners[this.props.runners[runner].key] !== undefined){} else {
                    runnerToAddArr.push(
                        <Form.Group key = {this.props.runners[runner].key}>
                         <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} >
                             <Form.Check.Input id = {this.props.runners[runner].key} type = 'checkbox' value = {this.props.runners[runner].key} onChange = {this.handleChange}/>
                             <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>
                    )
                }
            }
        }

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} className = "text-center">
            {/* <Modal.Dialog> */}
                <Modal.Header closeButton>Add Runners</Modal.Header>
                <Modal.Body>
                    <Form>
                        {runnerToAddArr}
                        <Button variant = 'primary' onClick = {this.handleAddRunners}>Save Runners</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}

WorkoutAddRunnersModal.propTypes = {
    selectedWorkout: PropTypes.string.isRequired,
    runners: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired,
    addRunnersToWorkout: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        selectedWorkout: state.workouts.selectedWorkout,
        workouts: state.workouts.actualWorkouts,
    }
}

export default connect(mapStateToProps, { addRunnersToWorkout }) (WorkoutAddRunnersModal)