import React, { Component } from 'react'
import EventNavBar from '../components/event/EventNavBar'
import EventRunnerCard from '../components/event/EventRunnerCard'
import { Container } from 'react-bootstrap'
import EventDetailsCard from '../components/event/EventDetailsCard'
import EventAddRunnersModal from '../components/event/EventAddRunnersModal'
import AddResultsModal from '../components/event/AddResultsModal'
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

export class EventDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          showRunner: false,
          showResults:false,
          reloaded:false
        }
        // this.props.getTeamEvents();
    }
    setShowRunner = e => {
        this.setState({
            showRunner: !this.state.showRunner
        })
      }
      setShowResults = e => {
        this.setState({
            showResults: !this.state.showResults
        })
      }

    render() {

        if(!this.props.selectedEvent || !this.props.events){
            return null;
          }

        let runnersInEvent = [];

        if(this.props.events[this.props.selectedEvent].hasOwnProperty('runners') === true){
            for(const runner in this.props.events[this.props.selectedEvent].runners){
                if(this.props.events[this.props.selectedEvent].runners.hasOwnProperty(runner)){
                    runnersInEvent.push(
                        <React.Fragment key = {runner}>
                            <EventRunnerCard runner = {this.props.events[this.props.selectedEvent].runners[runner]} />
                        </React.Fragment>
                    )
                }
            }
        }
        

        return (
            <Container>
                <EventNavBar setShowRunner = {this.setShowRunner} setShowResults = {this.setShowResults}></EventNavBar>
                <div className="card-deck">
                {runnersInEvent}
                <EventDetailsCard event = {this.props.events[this.props.selectedEvent]}></EventDetailsCard>
                </div>
                <EventAddRunnersModal show = {this.state.showRunner} setShow = {this.setShowRunner} teamUID = {this.props.selectedTeam}/>
                <AddResultsModal show = {this.state.showResults} setShow = {this.setShowResults}></AddResultsModal>
            </Container>
        )
    }
}

EventDetails.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    events: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        selectedEvent: state.events.selectedEvent,
        events: state.events.events,
        rehydrated: state._persist.rehydrated,
    }
}

export default connect(mapStateToProps, {}) (EventDetails)
