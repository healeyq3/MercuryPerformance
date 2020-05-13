import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import {Calendar, locale} from 'react-calendar'
import {withRouter} from 'react-router';
import moment from 'moment';
import NavBar from './NavBar';
import 'react-calendar/dist/Calendar.css';

export class CalendarHome extends Component {
        state = {
            date: new Date(),
        }
    render() {
        return (
            <Container fluid>
                <NavBar></NavBar>
                <Calendar>
                date={this.state.date}
                value={this.state.date}
                style={{locale : 'en-US', calendarType : 'US'}}
                </Calendar>
                

            </Container> 
            
        )
    }
}

export default withRouter(CalendarHome)
