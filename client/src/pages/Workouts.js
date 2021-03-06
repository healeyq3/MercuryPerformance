import React, { Component } from 'react'
import { Nav, Card, Col, Modal} from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addWorkoutToTeam, getAllWorkoutBlueprints, getWorkoutBlueprints, setBlueprint, getActualWorkouts} from '../actions/workoutActions';
import ImportWorkoutDropdown from "../components/workout/ImportWorkoutDropdown";
import { Redirect } from "react-router-dom";
import '../css/workouts.css'

export class Workouts extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showImport: false,
            toWorkout: false,
            gotoCreateWorkout: false
        }

        this.setSelectedBlueprint = this.setSelectedBlueprint.bind(this);
        this.importWorkoutBlueprint = this.importWorkoutBlueprint.bind(this);
    }

    componentDidUpdate(prevProps, prevState, ss){
        if(prevProps.rehydrated === false){
            this.props.getWorkoutBlueprints(this.props.selectedTeam);
        }
    }

    setShow = e => {
        this.setState({
            gotoCreateWorkout: true
        })
    }

    setShowCreateWorkout = e => {
      this.setState({
          gotoCreateWorkout: true
      })
    }

    setShowImportWorkout = e => {
      this.props.getAllWorkoutBlueprints();
      this.setState({
        showImport: true
      })
    }

    showImportModal = e => {
      this.setState({
        showImport: !this.state.showImport
      });
    };

    importWorkoutBlueprint(blueprintuid){
        this.props.addWorkoutToTeam(blueprintuid, this.props.selectedTeam);
        this.setState({
            showImport: false
        })
    }

    setSelectedBlueprint(blueprint){
      this.props.setBlueprint(blueprint.key);
      this.props.getActualWorkouts(this.props.selectedTeam, blueprint.key);

      this.setState({
          toWorkout: true
      })
    }
      
    render() {
        if(!this.props.selectedTeam){
            return null;
        }
        if(this.state.toWorkout){
            this.props.history.push('/workouts')
            return <Redirect to='/workoutdetails' />
        }
        if(this.state.gotoCreateWorkout){
            this.props.history.push('/workouts')
            return <Redirect to='/workoutcreator' />
        }

        let cardItems = [];
        for(const blueprint in this.props.blueprints){
            if(this.props.blueprints.hasOwnProperty(blueprint)){
                cardItems.push(
                    <React.Fragment key = {blueprint}>
                        <ExistingWorkoutCard onHit = {this.setGoToEditor} onSelect = {this.setSelectedBlueprint} blueprint = {this.props.blueprints[blueprint]} />
                    </React.Fragment> 
                )
            }
        }
        return (
            <div className="workouts-container">
                <Col className="team-workouts-card-container">
                    <Nav fill variant="tabs" className="justify-content-center">
                        <Nav.Item>
                            <Nav.Link href = "./">Team Name</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Card className = "text-center">
                        <Card.Header>Team Workouts</Card.Header>
                        {cardItems}
                    </Card>
                </Col>

                <Col className="workout-options-container">
                    <Card className = "text-center" tag="a" onClick = {this.setShowCreateWorkout} style = {{cursor:"pointer"}}>
                        <p/>
                        <Card.Title>New Workout</Card.Title>

                        <p/>
                    </Card>
                    <br />
                    <Card className = "text-center" tag="a" onClick={e => {this.setShowImportWorkout();}} style = {{cursor:"pointer"}}>
                        <p/>
                        <Card.Title>Import Workout</Card.Title>
                        <p/>
                    </Card>
                </Col>
              <Modal show = {this.state.showImport} onHide = {this.showImportModal}>
                <ImportWorkoutDropdown importWorkoutBlueprint = {this.importWorkoutBlueprint} allBlueprints = {this.props.allBlueprints} blueprints = {this.props.blueprints}/>
              </Modal>
            </div>
        )
    }
}

Workouts.propTypes = {
    blueprints: PropTypes.object.isRequired,
    allBlueprints: PropTypes.object,
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    getWorkoutBlueprints: PropTypes.func.isRequired,
    getAllWorkoutBlueprints: PropTypes.func.isRequired,
    setBlueprint: PropTypes.func.isRequired,
    addWorkoutToTeam: PropTypes.func.isRequired,
    getActualWorkouts: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        teams: state.teams.teams,
        blueprints: state.workouts.blueprints,
        allBlueprints: state.workouts.allBlueprints,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        selectedBlueprint: state.workouts.selectedBlueprint
    }
}

export default connect(mapStateToProps, { getWorkoutBlueprints, getAllWorkoutBlueprints, setBlueprint, addWorkoutToTeam, getActualWorkouts }) (Workouts);
