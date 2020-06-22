import React, { Component } from 'react'
import {Container, Nav, Card, Row, Col, Modal} from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addWorkoutToTeam, getAllWorkoutBlueprints, getWorkoutBlueprints, setBlueprint} from '../actions/workoutActions';
import ImportWorkoutDropdown from "../components/workout/ImportWorkoutDropdown";
import { getWorkoutBlueprints, setBlueprint } from '../actions/workoutActions';
import { Redirect } from "react-router-dom";

export class Workouts extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          showImport: false,
          reloaded: false,
          toWorkoutCreator: false
        }

        this.setSelectedBlueprint = this.setSelectedBlueprint.bind(this);
        this.importWorkoutBlueprint = this.importWorkoutBlueprint.bind(this);
    }

    componentDidUpdate(prevProps, prevState, ss){
        if(prevProps.rehydrated === false){
            console.log("Workouts need - passing: " + this.props.selectedTeam);
            this.props.getWorkoutBlueprints(this.props.selectedTeam);
        }
    }

    setShow = e => {
        this.setState({
            toWorkoutCreator: true
          })
      }
    setShowCreateWorkout = e => {
      window.location.href="./workoutcreator"
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
        console.log("executing here");
        this.props.addWorkoutToTeam(blueprintuid, this.props.selectedTeam);
    }

    setSelectedBlueprint(blueprint){
      this.props.setBlueprint(blueprint.key);
      console.log("workout selected ");
      window.location.href='./workoutdetails'
    }
      
    render() {
        if(!this.props.selectedTeam){
            return null;
        }
        if(this.state.toWorkoutCreator){
            this.props.history.push('/workouts')
            return <Redirect to='/workoutcreator' />
          }

        let cardItems = [];
        for(const blueprint in this.props.blueprints){
            if(this.props.blueprints.hasOwnProperty(blueprint)){
                cardItems.push(
                    <React.Fragment key = {blueprint}>
                        <ExistingWorkoutCard onSelect = {this.setSelectedBlueprint} blueprint = {this.props.blueprints[blueprint]} />
                    </React.Fragment>
                )
            }
        }
        return (
            <Container>
            <Container fluid>
                <Nav fill variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href = "./">Team Name</Nav.Link>
                </Nav.Item>
                </Nav>
            </Container>
            <Row>
                <Col>
                <Card className = "text-center">
                    <Card.Header>Team Workouts</Card.Header>
                    {cardItems}
                </Card>
                </Col>
                <Col>
                <Card className = "text-center" tag="a" onClick = {this.setShowCreateWorkout} style = {{cursor:"pointer"}}>
                    <p/>
                    <Card.Title>New Workout</Card.Title>
                    
                    <p/>
                </Card>
                <Card className = "text-center" tag="a" onClick={e => {this.setShowImportWorkout();}} style = {{cursor:"pointer"}}>
                    <p/>
                    <Card.Title>Import Workout</Card.Title>
                    <p/>
                </Card>
                </Col>
            </Row>
              <Modal show = {this.state.showImport} onHide = {this.showImportModal}>
                <ImportWorkoutDropdown importWorkoutBlueprint = {this.importWorkoutBlueprint} allBlueprints = {this.props.allBlueprints} blueprints = {this.props.blueprints}/>
              </Modal>
            </Container>
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
    addWorkoutToTeam: PropTypes.func.isRequired
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

export default connect(mapStateToProps, { getWorkoutBlueprints, getAllWorkoutBlueprints, setBlueprint, addWorkoutToTeam }) (Workouts)
