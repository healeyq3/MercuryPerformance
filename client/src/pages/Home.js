import React, { Component } from "react";
import { newRunner, getTeamRunners, setRunner, resetRunnerAdded } from "../actions/runnerActions";
import { setTeam, updateTeam, updateV02, refreshTeam } from "../actions/teamActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import ExistingRunnerCard from "../components/ExistingRunnerCard";
import AddRunner from "../components/AddRunner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import "../css/home.css";
// import moment from 'moment';


class Home extends Component {
  constructor(props) {
    super(props);
    this.setSelectedRunner = this.setSelectedRunner.bind(this);
    this.state = {
      medianPace: 0,
      gotoEvents: false,
      medianV02: 0,
      runnerCount: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rehydrated === false) {
      this.props.getTeamRunners(this.props.selectedTeam);
     } 
  }

  setSelectedRunner(runner) {
    this.props.setRunner(runner.key);
  }

  render() {
    if (!this.props.selectedTeam) {
      return null;
    }

    if (this.state.gotoEvents) {
      return <Redirect to="/events" />;
    }

    // if(this.props.hasAddedRunner && this.state.runnerCount !== Object.keys(this.props.teams[this.props.selectedTeam].runners.length)){
    //   this.props.refreshTeam(this.props.selectedTeam)
    // } else if(this.props.hasAddedRunner && this.state.runnerCount === Object.keys(this.props.teams[this.props.selectedTeam].runners.length)){
    //   this.props.resetRunnerAdded();
    // }
    
    let runnerArr = [];

    for (const runneruid in this.props.runners) {
      if (this.props.runners.hasOwnProperty(runneruid)) {
        runnerArr.push(
          <React.Fragment key={runneruid}>
            <ExistingRunnerCard
              runner={this.props.runners[runneruid]}
              onSelect={this.setSelectedRunner}
            />
          </React.Fragment>
        );
      }
    }

    return (
      <Container fluid className="home-container">
        {/*<h2 id = "teamNameHome">{this.props.teams[this.props.selectedTeam].teamName}</h2>*/}
        
        <Col sm = {6}>
        <Card>
          <Card.Header>
            <Row>
              <Col>
              Roster
              </Col>
              <Col className = "home-cardheader-col">
              <AddRunner teamUID={this.props.selectedTeam}/>
              </Col>
             
            </Row>
        </Card.Header>
        {runnerArr}
        </Card> 
        </Col>
        
      </Container>
    );
  }
}

Home.propTypes = {
  getTeamRunners: PropTypes.func.isRequired,
  newRunner: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string.isRequired,
  runners: PropTypes.object.isRequired,
  selectedRunner: PropTypes.string,
  updateTeam: PropTypes.func.isRequired,
  hasAddedRunner: PropTypes.bool.isRequired
};

const mapStateToProps = function (state) {
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    selectedRunner: state.runners.selectedRunner,
    hasAddedRunner: state.runners.hasAddedRunner,
    rehydrated: state._persist.rehydrated,
  };
};
export default connect(mapStateToProps, {
  newRunner,
  getTeamRunners,
  setRunner,
  setTeam,
  updateTeam,
  updateV02,
  refreshTeam,
  resetRunnerAdded
})(Home);
