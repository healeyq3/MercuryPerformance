import React, { Component } from 'react'
import {Container, Nav, Card, Row, Col, Modal} from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getAllWorkoutBlueprints, getWorkoutBlueprints, setBlueprint} from '../actions/workoutActions';
import ImportWorkoutDropdown from "../components/workout/ImportWorkoutDropdown";

export class Workouts extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          showImport: false,
          reloaded: false
        }

        this.setSelectedBlueprint = this.setSelectedBlueprint.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.rehydrated === false){
            console.log("Workouts need - passing: " + this.props.selectedTeam);
            this.props.getWorkoutBlueprints(this.props.selectedTeam);
        }
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

    setSelectedBlueprint(blueprint){
      this.props.setBlueprint(blueprint.key);
      console.log("workout selected ");
      window.location.href='./workoutdetails'
    }
      
    render() {
        if(!this.props.selectedTeam){
            return null;
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

        console.log(this.props);

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
                <ImportWorkoutDropdown allBlueprints = {this.props.allBlueprints}/>
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
    setBlueprint: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        blueprints: state.workouts.blueprints,
        allBlueprints: state.workouts.allBlueprints,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        selectedBlueprint: state.workouts.selectedBlueprint
    }
}

export default connect(mapStateToProps, { getWorkoutBlueprints, getAllWorkoutBlueprints, setBlueprint }) (Workouts)
