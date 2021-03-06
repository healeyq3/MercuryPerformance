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
import { connect } from "react-redux";
import ExistingRunnerCard from "../components/ExistingRunnerCard";
import AddRunner from "../components/AddRunner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { V02_DevGraph } from "../components/AnalysisGraphs/V02_DevGraph";
import { Team_Mileage_Graph } from "../components/AnalysisGraphs/Team_Mileage_Graph";
import { PracticeColumnChart } from "../components/AnalysisGraphs/PracticeColumnChart";
import {
  fixDateSelector,
  getCleanDate,
  getWeeklyMileage,
} from "../math/DateAlgos";
import "../css/home.css";
import MainCalendar from "../components/Calendar Components/MainCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
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
    if (
      !this.props.selectedTeam ||
      !this.props.workoutDates ||
      !this.props.eventDates
    ) {
      return null;
    }

    if (this.state.gotoEvents) {
      return <Redirect to="/events" />;
    }

    let dates2 = [];
    let data2 = [];
    let data3 = [];
    if (this.props.teams[this.props.selectedTeam].mileage !== undefined) {
      for (const date in this.props.teams[this.props.selectedTeam].mileage) {
        dates2.push(new Date(fixDateSelector(date)).getTime());
      }
      dates2.sort(function (a, b) {
        return a - b;
      });
      for (const date in dates2) {
        let toAdd = {
          x: dates2[date],
          y: this.props.teams[this.props.selectedTeam].mileage[
            getCleanDate(new Date(dates2[date]))
          ].medDev,
        };
        data2.push(toAdd);
      }
      let mileageObject = getWeeklyMileage(
        this.props.teams[this.props.selectedTeam].mileage,
        dates2
      );
      for (const date in mileageObject) {
        let toAdd = {
          x: Number(date),
          y: mileageObject[date].mileage,
        };
        console.log(new Date(Number(date)));
        data3.push(toAdd);
      }
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
      let today = {
        x: new Date().getTime(),
        y: this.props.teams[this.props.selectedTeam].v02History[
          getCleanDate(new Date(dates[dates.length - 1]))
        ].medianV02,
      };
      data.push(today);
    }

    const series = [
      {
        name: "V02 History",
        data: data,
        type: "line",
      },
      {
        name: "Dev History",
        type: "line",
        data: data2,
      },
    ];
    console.log("D# ntea");
    console.log(data3);
    console.log(data2);
    console.log(data);
    const series2 = [
      {
        name: "Mileage",
        data: data3,
        type: "line",
      },
    ];

    let runnerArr = [];
    let counter = 1;
    for (const runneruid in this.props.runners) {
      if (this.props.runners.hasOwnProperty(runneruid)) {
        let color = "";
        if (counter % 2 === 0) {
          color = "grey";
        } else {
          color = "white";
        }
        runnerArr.push(
            <ExistingRunnerCard
              runner={this.props.runners[runneruid]}
              onSelect={this.setSelectedRunner}
              color={color}
            />
        );
        counter++;
      }
    }
    runnerArr.push();

    return (
      <div className="home-container">
        <section className="calendar-holder">
          <MainCalendar
            workouts={this.props.workoutDates}
            events={this.props.eventDates}
          />
        </section>
        <section className="remaining-page">
          <div className = "roster-holder">
            <div className="roster-container">
              <div className="roster-header">
                <text>Roster</text>
                <AddRunner teamUID={this.props.selectedTeam} />
              </div>
              {runnerArr}
            </div>
          </div>
          <div className = "graphs">
            <div className = "chart">
              <V02_DevGraph series={series} />
            </div>
            <div className = "chart">
              <Team_Mileage_Graph series = {series2} />
            </div>
          </div>
        </section>
      </div>
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
  eventDates: PropTypes.object.isRequired,
  workoutDates: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
  return {
    runners: state.runners.runners,
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    selectedRunner: state.runners.selectedRunner,
    hasAddedRunner: state.runners.hasAddedRunner,
    rehydrated: state._persist.rehydrated,
    eventDates: state.calendar.teamEventDates,
    workoutDates: state.calendar.teamWorkoutDates,
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
