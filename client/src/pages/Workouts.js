import React, { Component } from 'react'
import { Container, Nav, Card, Row, Col } from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'
import CreateWorkoutModal from '../components/workout/CreateWorkoutModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkoutBlueprints, setBlueprint } from '../actions/workoutActions';

export class Workouts extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          reloaded:false
        }

        this.setSelectedBlueprint = this.setSelectedBlueprint.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.rehydrated === false){
            console.log("Workouts need - passing: " + this.props.selectedTeam);
            this.props.getWorkoutBlueprints(this.props.selectedTeam);
        }
    }

    setShow = e => {
        window.location.href="./workoutcreator"
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
                    <Card.Header>All Workouts</Card.Header>
                    {cardItems}
                </Card>
                </Col>
                <Col>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p></p>
                    <Card.Title>New Workout</Card.Title>
                    <p></p>
                </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}


Workouts.propTypes = {
    blueprints: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    getWorkoutBlueprints: PropTypes.func.isRequired,
    setBlueprint: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        blueprints: state.workouts.blueprints,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        selectedBlueprint: state.workouts.selectedBlueprint
    }
}

export default connect(mapStateToProps, { getWorkoutBlueprints, setBlueprint }) (Workouts)
