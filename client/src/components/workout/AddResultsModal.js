import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { sendActualTimes } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decomposedTimeGenerator } from '../../math/TimeConversions';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
           aTimesLocal: []
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
        this.props.sendActualTimes(this.state.aTimesLocal, this.props.selectedWorkout, this.props.runner);
        console.log("Sent aTimesLocal");
        this.props.setShow();
    }

    reset = () => {
        console.log("Reset called");
        this.setState({
            aTimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aTimes
        });
        console.log("reset finished");
        console.log(this.state.aTimesLocal)
    }


    render() {
        if(!this.props.workouts[this.props.selectedWorkout] || !this.props.runners[this.props.runner]){
            return null;
        }
        let repResults = []
       // Object.keys(this.props.runners).length > 0 ? selectedRunnerName = this.props.runners[this.props.selectedRunner].name : selectedRunnerName = null;
        this.state.aTimesLocal.map((rep, i) => {
            if(rep.mileage !== undefined){
                repResults.push(
                    <Row key = {i}>
                        <Col>
                            <Form.Label>{decomposedTimeGenerator(this.props.workouts[this.props.selectedWorkout].reps[i].hours, this.props.workouts[this.props.selectedWorkout].reps[i].minutes, this.props.workouts[this.props.selectedWorkout].reps[i].seconds)} Rep</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name = {i} value = {this.state.aTimesLocal[i].mileage} onChange = {this.handleMileageChange} type = "text"/>
                        </Col>
                        <Col>
                            <Form.Label>Mile(s)</Form.Label>
                        </Col>
                    </Row>
                    
                )
            } else{
                repResults.push(
                    <Row key = {i}>
                        <Col>
                            <Form.Label>{this.props.workouts[this.props.selectedWorkout].reps[i].distance} {this.props.workouts[this.props.selectedWorkout].reps[i].distanceUnit} Rep:</Form.Label>
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
                    </Row>
                )
            }
        })
        console.log("List of runners on the next line");
        console.log(this.props.runners)
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runners[this.props.runner].name}</Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                        <Col>
                            {repResults}
                        </Col>
                        </Row>
                        <Row className = 'justify-content-md-center'>
                            <Button variant = "outline-secondary" onClick = {this.handleSendingATimes}>Save Results</Button>
                        </Row>
                    </Form>
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
