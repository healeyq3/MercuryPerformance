import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
           aTimesLocal: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMileageChange = this.handleMileageChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
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
    }

    handleHourChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].hours = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleMinuteChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].minutes = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
    }

    handleSecondChange(e){
        let toChange = this.state.aTimesLocal
        toChange[e.target.name].seconds = e.target.value
        this.setState({
            aTimesLocal : toChange
        })
    }

    reset = () => {
        console.log("Reset called");

        /*if(this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].hasOwnProperty('time')){
            initialHours = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.hours;
            initialMinutes = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.minutes;
            initialSeconds = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.seconds;
        }
        */
        this.setState({
            aTimesLocal: this.props.workouts[this.props.selectedWorkout].runners[this.props.runner].aTimes
        });
        console.log("reset finished");
        console.log(this.state.aTimesLocal)
    }

    render() {
        if(!this.props.workouts[this.props.selectedWorkout]){
            return null;
        }
        let repResults = []
       // Object.keys(this.props.runners).length > 0 ? selectedRunnerName = this.props.runners[this.props.selectedRunner].name : selectedRunnerName = null;
        this.state.aTimesLocal.map((rep, i) => {
            if(rep.mileage !== undefined){
                repResults.push(
                    <React.Fragment key = {i}>
                        <Form.Control name = {i} value = {this.state.aTimesLocal[i].mileage} onChange = {this.handleMileageChange} type = "text"/>
                    </React.Fragment>
                    
                )
            } else{
                repResults.push(
                    <Row>
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
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
                <Modal.Header closeButton>{this.props.runner}</Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                        <Col>
                            {repResults}
                        </Col>
                        </Row>
                        <Row className = 'justify-content-md-center'>
                            <Button variant = "outline-secondary" onClick = {this.handleSave}>Save Results</Button>
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
    updateRunner : PropTypes.func
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

export default connect(mapStateToProps, { selectRunner, updateRunner }) (AddResultsModal);
