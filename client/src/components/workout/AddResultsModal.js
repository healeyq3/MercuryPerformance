import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col} from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { sendActualTimes } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { secondsToAnswer, totalSeconds, stringToNumber, secondsToTimeObject } from '../../math/TimeConversions';
import { residualStandardDeviation, repActualEffortD, repActualEffortT } from '../../math/AnalysisAlgos';
import { getDistance2 } from '../../math/V02max';
import '../../css/workoutresultsmodal.css'

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
           aTimesLocal: [],
           aETimesLocal : [],
           addTotal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMileageChange = this.handleMileageChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.handleSecondChange = this.handleSecondChange.bind(this);
        this.handleEMileageChange = this.handleEMileageChange.bind(this);
        this.handleEHourChange = this.handleEHourChange.bind(this);
        this.handleEMinuteChange = this.handleEMinuteChange.bind(this);
        this.handleESecondChange = this.handleESecondChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleMileageChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].mileage = e.target.value
        toChange[e.target.name].autoGeneratedRep = false;
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleHourChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].hours = e.target.value
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleMinuteChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].minutes = e.target.value
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleSecondChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].seconds = Number(e.target.value)
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleEMileageChange(e){
        let toChange = this.state.aETimesLocal
        toChange[e.target.name].mileage = e.target.value
        toChange[e.target.name].autoGeneratedRep = false;
        this.setState({
            aETimesLocal : toChange
        })
    }

    handleEHourChange(e){
        let toChange = this.state.aETimesLocal
        toChange[e.target.name].hours = e.target.value
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aETimesLocal : toChange
        })
    }

    handleEMinuteChange(e){
        let toChange = this.state.aETimesLocal
        toChange[e.target.name].minutes = e.target.value
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aETimesLocal : toChange
        })
    }

    handleESecondChange(e){
        let toChange = this.state.aETimesLocal
        toChange[e.target.name].seconds = e.target.value
        toChange[e.target.name].autoGeneratedRep = false
        this.setState({
            aETimesLocal : toChange
        })
    }

    handleSendingATimes = () => {
        console.log("hit send")
        let workoutStats = {
            resSD : 0, //residual standard deviation
            vE : [], // vector of percentages off effort
        }
        let tD = 0; //total distance in mileage
        let tT = 0; // total time in seconds
        /*
        Effort Levels
        Level 1 < 75%
        75 <= Level 2 < 85
        85 <= Level 3 < 95
        Level 4 >= 95
        */
        let effortLevelsDist = { // dist spent at each
            level1 : 0,
            level2 : 0,
            level3 : 0,
            level4 : 0
        }
        let effortLevelsPer = {
            level1 : 0,
            level2 : 0,
            level3 : 0,
            level4 : 0
        }
        let v1 = [];
        for(const rep in this.state.aTimesLocal){
            if(this.state.aTimesLocal[rep].mileage !== undefined){ // time rep
                if(this.state.aTimesLocal[rep].mileage === 0){
                    alert("Please Fill in All Reps");
                    return;
                } else if (this.state.aTimesLocal[rep].autoGeneratedRep === true){ // was the rep answers generated by the program <= this ensures that there are no rounding errors and the percent off remains 0
                    v1.push(0);
                    tD += Number(this.state.aTimesLocal[rep].mileage);
                    tT += Number(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].totalSeconds)
                    console.log("tD line 144 " + tD)
                    if(this.state.aTimesLocal[rep].percentEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(this.state.aTimesLocal[rep].mileage);
                    } else if(this.state.aTimesLocal[rep].percentEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                    else if(this.state.aTimesLocal[rep].percentEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                    else if(this.state.aTimesLocal[rep].percentEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                } else {
                    let specifiedTime = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].totalSeconds;
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
                    tD += Number(distance);
                    console.log("tD line 171 " + tD)
                    tT += Number(specifiedTime)
                    if(actualEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(this.state.aTimesLocal[rep].mileage);
                    } else if(actualEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                    else if(actualEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                    else if(actualEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(this.state.aTimesLocal[rep].mileage);
                    }
                }
            } else { // distance rep
                if(this.state.aTimesLocal[rep].hours === 0 && this.state.aTimesLocal[rep].minutes === 0 && this.state.aTimesLocal[rep].seconds === 0){
                    alert("Please Fill in All Reps");
                    return;
                } else if(this.state.aTimesLocal[rep].autoGeneratedRep === true){
                    v1.push(0);
                    let distance = getDistance2(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].repDist, this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].repUnit)
                    tD += Number(distance);
                    console.log("tD line 193 " + tD)
                    tT += Number(totalSeconds({
                        hours: this.state.aTimesLocal[rep].hours,
                        minutes: this.state.aTimesLocal[rep].minutes,
                        seconds: this.state.aTimesLocal[rep].seconds
                    }))
                    if(this.state.aTimesLocal[rep].percentEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(distance);
                    } else if(this.state.aTimesLocal[rep].percentEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(distance);
                    }
                    else if(this.state.aTimesLocal[rep].percentEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(distance);
                    }
                    else if(this.state.aTimesLocal[rep].percentEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(distance);
                    }
                } else {
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
                    tD += Number(d);
                    console.log("tD line 231 " + tD)
                    tT += Number(aSeconds);
                    if(actualEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(d);
                    } else if(actualEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(d);
                    }
                    else if(actualEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(d);
                    }
                    else if(actualEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(d);
                    }
                }
            }
        }

        for(const rep in this.state.aETimesLocal){
            if(this.state.aETimesLocal[rep].mileage !== undefined){ // time rep
                if(this.state.aETimesLocal[rep].mileage === 0){
                    alert("Please Fill in All Reps");
                    return;
                } else if(this.state.aETimesLocal[rep].autoGeneratedRep === false){
                    let specifiedTime = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].totalSeconds;
                    let workoutPace = stringToNumber(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].wPace);
                    let distance = this.state.aETimesLocal[rep].mileage;
                    let actualEffort = repActualEffortT(specifiedTime, distance, workoutPace);
                    let e = actualEffort - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].percentEffort
                    let toChange = this.state.aETimesLocal;
                    toChange[rep].percentEffort = actualEffort
                    toChange[rep].percentOff = e;
                    this.setState({
                        aETimesLocal : toChange
                    })
                    tD += Number(distance);
                    console.log("tD line 266 " + tD)
                    tT += Number(specifiedTime);
                    if(actualEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(distance);
                    } else if(actualEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(distance);
                    }
                    else if(actualEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(distance);
                    }
                    else if(actualEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(distance);
                    }
                } else {
                    tD += Number(this.state.aETimesLocal[rep].mileage);
                    console.log("tD line 281 " + tD)
                    tT += Number(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].totalSeconds)
                    let toChange = 0;
                    if(this.state.aETimesLocal[rep].percentEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(this.state.aETimesLocal[rep].mileage);
                    } else if(this.state.aETimesLocal[rep].percentEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(this.state.aETimesLocal[rep].mileage);
                    }
                    else if(this.state.aETimesLocal[rep].percentEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(this.state.aETimesLocal[rep].mileage);
                    }
                    else if(this.state.aETimesLocal[rep].percentEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(this.state.aETimesLocal[rep].mileage);
                    }
                }
            } else { // distance rep
                if(this.state.aETimesLocal[rep].hours === 0 && this.state.aETimesLocal[rep].minutes === 0 && this.state.aETimesLocal[rep].seconds === 0){
                    alert("Please Fill in All Reps");
                    return;
                } else if(this.state.aETimesLocal[rep].autoGeneratedRep === false){
                    let timeData = {
                        hours: this.state.aETimesLocal[rep].hours,
                        minutes: this.state.aETimesLocal[rep].minutes,
                        seconds: this.state.aETimesLocal[rep].seconds
                    }
                    let aSeconds = totalSeconds(timeData);
                    let workoutPace = stringToNumber(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].wPace);
                    let distance = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].repDist;
                    let distanceUnit = this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].repUnit;
                    let d = getDistance2(distance, distanceUnit);
                    let actualEffort = repActualEffortD(d, aSeconds, workoutPace);
                    let e = actualEffort - this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].percentEffort;
                    let toChange = this.state.aETimesLocal;
                    toChange[rep].percentEffort = actualEffort;
                    toChange[rep].percentOff = e;
                    tD += Number(d);
                    console.log("tD line 317 " + tD)
                    tT += Number(aSeconds);
                    if(actualEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(d); 
                    } else if(actualEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(d);
                    }
                    else if(actualEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(d);
                    }
                    else if(actualEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(d);
                    }
                    this.setState({
                        aETimesLocal: toChange
                    })
                } else {
                    let distance = getDistance2(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].repDist, this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].repUnit)
                    tD += Number(distance);
                    console.log("tD line 336 " + tD)
                    tT += Number(totalSeconds({
                        hours: this.state.aETimesLocal[rep].hours,
                        minutes: this.state.aETimesLocal[rep].minutes,
                        seconds: this.state.aETimesLocal[rep].seconds
                    }))
                    if(this.state.aETimesLocal[rep].percentEffort < 75){
                        effortLevelsDist.level1 = effortLevelsDist.level1 + Number(distance);
                    } else if(this.state.aETimesLocal[rep].percentEffort < 85){
                        effortLevelsDist.level2 = effortLevelsDist.level2 + Number(distance);
                    }
                    else if(this.state.aETimesLocal[rep].percentEffort < 95){
                        effortLevelsDist.level3 = effortLevelsDist.level3 + Number(distance);
                    }
                    else if(this.state.aETimesLocal[rep].percentEffort >= 95){
                        effortLevelsDist.level4 = effortLevelsDist.level4 + Number(distance);
                    }
                }
            }
        }

        workoutStats.resSD = residualStandardDeviation(v1);
        workoutStats.vE = v1;

        console.log(workoutStats);

        console.log(this.state.aTimesLocal);
        console.log(this.state.aETimesLocal);
        console.log(effortLevelsDist);
        console.log(tD);
        console.log(tT);
        console.log(effortLevelsDist);

        // this.props.sendActualTimes(this.state.aTimesLocal, this.props.selectedWorkout, this.props.runner);
        // console.log("Sent aTimesLocal");
        // this.props.calculateTeamAverage(this.props.runner, workoutStats.resSD);
        this.props.setShow();
    }

    autoFillWorkoutReps = () => {
        let toChange = [];
        for(const rep in this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare){
            if(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedSeconds !== undefined){ // distance rep => entering time (hours, minutes, seconds)
                console.log(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedSeconds)
                let toReturn = secondsToTimeObject(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedSeconds);
                console.log(toReturn)
                let tR = {
                    hours: toReturn.hours,
                    minutes: toReturn.minutes,
                    seconds: toReturn.seconds,
                    percentOff: 0,
                    percentEffort: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].percentEffort,
                    autoGeneratedRep : true
                }
                toChange.push(tR)
            } else {
                console.log("Else reached")
                let tR = {
                    mileage: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].predictedMileage,
                    percentEffort : this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pTimesToCompare[rep].percentEffort,
                    percentOff : 0,
                    autoGeneratedRep: true
                }
                toChange.push(tR)
            }
        }
        this.setState({
            aTimesLocal: toChange
        })
    }

    autoFillRestReps = () => {
        let toChange = [];
        for(const rep in this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare){
            if(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].predictedSeconds !== undefined){ // distance rep => entering time (hours, minutes, seconds)
                console.log(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].predictedSeconds)
                let toReturn = secondsToTimeObject(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].predictedSeconds);
                console.log(toReturn)
                let tR = {
                    hours: toReturn.hours,
                    minutes: toReturn.minutes,
                    seconds: toReturn.seconds,
                    percentOff: 0,
                    percentEffort: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].percentEffort,
                    autoGeneratedRep : true
                }
                toChange.push(tR)
            } else {
                console.log("Else statement")
                let tR = {
                    mileage: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].predictedMileage,
                    percentEffort : this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[rep].percentEffort,
                    percentOff : 0,
                    autoGeneratedRep: true
                }
                toChange.push(tR)
            }
        }
        this.setState({
            aETimesLocal: toChange
        })
    }

    reset = () => {
        this.setState({
            aTimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aTimes,
            aETimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aETimes
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
                    </div>
                )
                
            }
            return true; //wrote this so the error that said "Expected to return a value in arrow function" would go away
        })

        let repEResults = [];
        this.state.aETimesLocal.map((rep, i) => {
            if(rep.mileage !== undefined){
                repEResults.push(
                    <div className = 'time-row-container' key = {i}>
                        <div>
                            <Form.Label className = "time-row-label">{secondsToAnswer(this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[i].totalSeconds)} Rep</Form.Label>
                        </div>
                        <div>
                            <Form.Control name = {i} value = {this.state.aETimesLocal[i].mileage} onChange = {this.handleEMileageChange} type = "text"/>
                        </div>
                        <div>
                            <Form.Label>Mile(s)</Form.Label>
                        </div>
                    </div>
                )
            } else {
                repEResults.push(
                    <div className = "time-row-container" key = {i}>
                        <div>
                            <Form.Label className = "time-row-label">{this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[i].repDist} {this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].pETimesToCompare[i].repUnit} Rep:</Form.Label>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aETimesLocal[i].hours} onChange = {this.handleEHourChange} type = "text"/>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aETimesLocal[i].minutes} onChange = {this.handleEMinuteChange} type = "text"/>
                        </div>
                        <div className = "time-holder">
                            <Form.Control className = "time-entry" name = {i} value = {this.state.aETimesLocal[i].seconds} onChange = {this.handleESecondChange} type = "text"/>
                        </div>
                    </div>
                )
            }
            return true;
        })


        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runners[this.props.runner].name} | {this.state.addTotal === false ? <div>Workout Splits</div> : <div>Rest Splits</div>}</Modal.Header>
                <Modal.Body>
                    {this.state.addTotal === false ? 
                        <React.Fragment>
                            <Button onClick = {() => {this.setState({addTotal : true})}}>Enter Rest</Button>
                            <Button onClick = {this.autoFillWorkoutReps}>AutoFill Reps</Button>
                            <Form>
                                <Row>
                                <Col>
                                    {repResults}
                                </Col>
                                </Row>
                                <Row className = 'justify-content-md-center'>
                                    {<Button variant = "outline-secondary" onClick = {this.handleSendingATimes}>Save Results</Button>}
                                </Row>
                            </Form>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button onClick = {() => {this.setState({addTotal : false})}}>Enter Splits</Button>
                            <Button onClick = {this.autoFillRestReps}>AutoFill Reps</Button>
                            <div>
                                {repEResults}
                            </div>
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
