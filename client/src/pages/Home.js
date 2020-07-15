import React, { Component } from "react";
import { newRunner, getTeamRunners, setRunner } from "../actions/runnerActions";
import { setTeam, updateTeam } from "../actions/teamActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import ExistingRunnerCard from "../components/ExistingRunnerCard";
import AddRunner from "../components/AddRunner";
import PropTypes from "prop-types";
import { getMedianTeamPace, getMedianTeamV02 } from "../math/AnalysisAlgos";
import { Redirect } from "react-router-dom";
import "../css/home.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.setSelectedRunner = this.setSelectedRunner.bind(this);
    this.state = {
      medianPace: 0,
      gotoEvents: false,
      medianV02: 0
    };

    this.calculateTeamMedians = this.calculateTeamMedians.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.rehydrated === false) {
      this.props.getTeamRunners(this.props.selectedTeam);
    }
  }

  setSelectedRunner(runner) {
    this.props.setRunner(runner.key);
    // this.setState({
    //   gotoEvents: true
    // })
  }

  calculateTeamMedians = () => {
    const toUpdate1 = getMedianTeamPace(this.props.runners);
    const toUpdate2 = getMedianTeamV02(this.props.runners);
    this.setState({
      medianPace: toUpdate1,
      medianV02: toUpdate2
    });
    this.props.updateTeam(this.props.selectedTeam, "medianWPace", toUpdate);
    this.props.updateTeam(this.props.selectedTeam, "medianV02max", toUpdate);
  };

  render() {
    if (!this.props.selectedTeam) {
      return null;
    }

    if (this.state.gotoEvents) {
      return <Redirect to="/events" />;
    }

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
              <AddRunner teamUID={this.props.selectedTeam} onSelect={this.calculateTeamMedians}/>
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
};

const mapStateToProps = function (state) {
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    selectedRunner: state.runners.selectedRunner,
    rehydrated: state._persist.rehydrated,
  };
};
export default connect(mapStateToProps, {
  newRunner,
  getTeamRunners,
  setRunner,
  setTeam,
  updateTeam,
})(Home);
