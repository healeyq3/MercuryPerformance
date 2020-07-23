import React, { Component } from "react";
import {
  newRunner,
  getTeamRunners,
  setRunner,
  resetRunnerAdded,
} from "../actions/runnerActions";
import {
  setTeam,
  updateTeam,
  updateV02,
  refreshTeam,
} from "../actions/teamActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import ExistingRunnerCard from "../components/ExistingRunnerCard";
import AddRunner from "../components/AddRunner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { V02OnlyGraph } from "../components/AnalysisGraphs/V02OnlyGraph";
import { fixDateSelector, getCleanDate } from "../math/DateAlgos";
import { repActualEffortD, residualStandardDeviation } from '../math/AnalysisAlgos';
import { distanceToTime } from '../math/TimeConversions';
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
      runnerCount: 0,
      series: {},
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

    let data = [];
    let dates = [];
    if (this.props.teams[this.props.selectedTeam].v02History !== undefined) {
      for (const date in this.props.teams[this.props.selectedTeam].v02History) {
        dates.push(new Date(fixDateSelector(date)).getTime());
      }
      dates.sort(function (a, b) {
        return a - b;
      });
      for (const date in dates) {
        let toAdd = {
          x: dates[date],
          y: this.props.teams[this.props.selectedTeam].v02History[
            getCleanDate(new Date(dates[date]))
          ].medianV02,
        };
        data.push(toAdd);
      }
    }

    const series = [
      {
        name: "V02 History",
        data: data,
      },
    ];

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
        <Row>
          <Col sm={6}>
            <Card>
              <Card.Header className="home-card-header">
                <Row>
                  <Col>Roster</Col>
                  <Col className="home-cardheader-col">
                    <AddRunner teamUID={this.props.selectedTeam} />
                  </Col>
                </Row>
              </Card.Header>
              {runnerArr}
            </Card>
          </Col>
          <Col>
            <V02OnlyGraph series={series} />
          </Col>
        </Row>
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
  hasAddedRunner: PropTypes.bool.isRequired,
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
  resetRunnerAdded,
})(Home);
