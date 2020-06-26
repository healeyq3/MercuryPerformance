import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { selectRunner } from '../../actions/eventActions';
import { updateRunner } from '../../actions/runnerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRepResultForm from './AddRepResultForm';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            finalTimeHours: 0,
            finalTimeMinutes: 0,
            finalTimeSeconds: 0,
            runnerIndex: 0,
            reps:[]
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

    handleCalculate = () => {
        const data = {
            distance: this.props.workouts[this.props.selectedBlueprint].distance,
            units: this.props.workouts[this.props.selectedBlueprint].distanceUnit,
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        console.log(data);
    };

    handleSave = () => {
        this.handleAddResults();
        this.props.setShow();
    }

    handleAddResults = () => {
        // eslint-disable-next-line
        const timeData = {
            hours: this.state.finalTimeHours,
            minutes: this.state.finalTimeMinutes,
            seconds: this.state.finalTimeSeconds
        }
        let arr = this.state.reps
        arr.push(timeData)
        this.setState({reps:arr})
        
    }

    async incrementRunnerUp(){
        this.handleAddResults();
        console.log("----");
        console.log(Object.keys(this.props.runners));
        let newRunnerIndex;
        if(this.state.runnerIndex === (Object.keys(this.props.workouts[this.props.selectedBlueprint].runners).length - 1)){
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
        this.handleAddResults();
        let newRunnerIndex;
        if(this.state.runnerIndex === 0){
            newRunnerIndex = Object.keys(this.props.workouts[this.props.selectedBlueprint].runners).length - 1;
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
        const runnerKey = Object.keys(this.props.workouts[this.props.selectedBlueprint].runners)[newRunnerIndex];
        this.props.selectRunner(runnerKey);
    }

    reset = () => {
        console.log("Reset called");
        let initialHours = 0;
        let initialMinutes = 0;
        let initialSeconds = 0;
        /*if(this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].hasOwnProperty('time')){
            initialHours = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.hours;
            initialMinutes = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.minutes;
            initialSeconds = this.props.workouts[this.props.selectedBlueprint].runners[this.props.selectedBlueprint].time.seconds;
        }
        */
        this.setState({
            finalTimeHours : initialHours,
            finalTimeMinutes : initialMinutes,
            finalTimeSeconds : initialSeconds
        });
    console.log("reset finished");
    }

    render() {
        let selectedRunnerName;
       // Object.keys(this.props.runners).length > 0 ? selectedRunnerName = this.props.runners[this.props.selectedRunner].name : selectedRunnerName = null;

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset} size = 'lg'>
            {/* <Modal.Dialog> */} 
                <Modal.Header closeButton>{selectedRunnerName}</Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                        <Col>
                            <AddRepResultForm></AddRepResultForm>
                            <AddRepResultForm></AddRepResultForm>
                        </Col>
                        </Row>
                        <Row className = 'justify-content-md-center'>
                            <ButtonGroup className = 'mb-2'>
                                <Button variant = "outline-secondary" onClick = {this.incrementRunnerDown}>⇦</Button>
                                <Button variant = "outline-secondary" onClick = {this.handleSave}>Save Results</Button>
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
    selectedBlueprint: PropTypes.string,
    selectedTeam: PropTypes.string,
    selectedRunner: PropTypes.string,
    runners: PropTypes.object,
    workouts: PropTypes.object,
    //newTime: PropTypes.func.isRequired,
    selectRunner: PropTypes.func,
    rehydrated: PropTypes.bool,
    updateRunner : PropTypes.func
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        workoutRunners: state.workouts.runners,
        selectedRunner: state.workouts.selectedRunner,
        selectedTeam: state.workouts.selectedTeam,
        selectedBlueprint: state.workouts.selectedEvent,
        workouts: state.events.workouts,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { selectRunner, updateRunner }) (AddResultsModal);
