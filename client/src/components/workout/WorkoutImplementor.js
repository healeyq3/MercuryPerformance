import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { newActualWorkout } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import { getCleanDate, fixDateSelector } from '../../math/DateAlgos';

export class WorkoutImplementor extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        if(e.target.name === 'date'){
            let part1 = fixDateSelector(e.target.value)
            let part2 = getCleanDate(part1)
            this.setState({
                date: part2
            })
        } else {
            this.setState({[e.target.name] : e.target.value})
        }

    }

    handleCreate = () => {
        const workoutData = {
            date: this.state.date,
            reps: this.props.reps,
            blueprint: this.props.blueprint
        }
        this.props.newActualWorkout(workoutData, this.props.teamUID);
        this.props.setShow();
    }

    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
                <Modal.Header closeButton>Implement New Workout Day</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control 
                            name = "date"
                            type = 'date'
                            onChange = {this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                    <Button onClick = {this.handleCreate}>Implement</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, { newActualWorkout }) (WorkoutImplementor)
