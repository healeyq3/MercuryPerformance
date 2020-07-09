import React, { Component } from 'react'
import EventNavBar from '../components/event/EventNavBar'
import EventRunnerCard from '../components/event/EventRunnerCard'
import { Col, Row, Card } from 'react-bootstrap'
import EventDetailsCard from '../components/event/EventDetailsCard'
import EventAddRunnersModal from '../components/event/EventAddRunnersModal'
import AddResultsModal from '../components/event/AddResultsModal'
import PropTypes from 'prop-types';
import { newTime, addRunnersToEvent, selectRunner, resetRunnerAdded } from '../actions/eventActions';
import { connect } from 'react-redux';
import '../css/eventdetails.css';
import {Redirect} from 'react-router-dom'

export class EventDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          showRunner: false,
          reloaded:false,
          runnerCount: 0,
        }

        this.openResultsModal = this.openResultsModal.bind(this);
        this.closeResultsModal = this.closeResultsModal.bind(this);
    }

    componentDidUpdate(prevProps) {
      if(prevProps.rehydrated===false){
        console.log(this.props);
        if(!this.props.events[this.props.selectedEvent].runners){
          return;
        }
        this.setState({
          runnerCount: Object.keys(this.props.events[this.props.selectedEvent].runners).length
        })
      } else if(this.props.hasAddedRunner) {
        this.setState({
          runnerCount: Object.keys(this.props.events[this.props.selectedEvent].runners).length
        })
      }
    }

  setShowRunner = e => {
      this.setState({
          showRunner: !this.state.showRunner
      })
    }

    openResultsModal(runneruid){
      this.setState({
        showResults: true,
        resultsRunneruid: runneruid,
      })
    }

    closeResultsModal(){
      this.setState({
        showResults: false
      })
    }

    render() {
      if(!this.props.selectedEvent || !this.props.events || !this.props.runners){
          return null;
      }

      if(!this.props.events[this.props.selectedEvent]){
        return <Redirect to="/events"/>
      }

      let runnersInEvent = [];

      if(this.props.hasAddedRunner && this.state.runnerCount === Object.keys(this.props.events[this.props.selectedEvent].runners).length){
        this.props.resetRunnerAdded();
        // this.setState({});
      }

      if(this.props.events[this.props.selectedEvent].hasOwnProperty('runners') === true){
          for(const runner in this.props.events[this.props.selectedEvent].runners){
            if(this.props.events[this.props.selectedEvent].runners.hasOwnProperty(runner)){
              runnersInEvent.push(
                <React.Fragment key = {runner}>
                  <EventRunnerCard openResultsModal = {this.openResultsModal} runner = {this.props.runners[runner]} time = {this.props.events[this.props.selectedEvent].runners[runner].time} />
                </React.Fragment>
              )
            }
          }
      }


      return (
          <div>
              <EventNavBar setShowRunner = {this.setShowRunner}/>
              <Row>
                  <Col>
                      <Card className = "text-center">
                          <Card.Header>Runners</Card.Header>
                          {runnersInEvent}
                      </Card>
                  </Col>

                  <EventDetailsCard event = {this.props.events[this.props.selectedEvent]}/>
              </Row>

              <EventAddRunnersModal show = {this.state.showRunner} setShow = {this.setShowRunner} teamUID = {this.props.selectedTeam}/>
              <AddResultsModal show = {this.state.showResults} setShow = {this.closeResultsModal} runneruid={this.state.resultsRunneruid}/>
          </div>
      )
    }
}
EventDetails.propTypes = {
  addRunnersToEvent: PropTypes.func.isRequired,
  newTime: PropTypes.func.isRequired,
  selectRunner: PropTypes.func.isRequired,
  resetRunnerAdded: PropTypes.func.isRequired,
  selectedEvent: PropTypes.string.isRequired,
  times: PropTypes.object,
  events: PropTypes.object.isRequired,
  runners: PropTypes.object.isRequired,
  hasAddedRunner: PropTypes.bool.isRequired
};

const mapStateToProps = function(state){
  return {
    selectedEvent: state.events.selectedEvent,
    times: state.events.times,
    rehydrated: state._persist.rehydrated,
    events: state.events.events,
    runners: state.runners.runners,
    hasAddedRunner: state.events.hasAddedRunner
  }
}


export default connect(mapStateToProps, {newTime, addRunnersToEvent, selectRunner, resetRunnerAdded}) (EventDetails)
