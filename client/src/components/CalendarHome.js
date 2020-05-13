import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import {withRouter} from 'react-router';
import NavBar from './NavBar';
// eslint-disable-next-line
import TestCalendar from './TestCalendar'
import 'react-calendar/dist/Calendar.css';

export class CalendarHome extends Component {
        state = {
            date: new Date(),
        }
    render() {
        return (
            <Container fluid>
                <NavBar></NavBar>
                <TestCalendar></TestCalendar>
            </Container> 
            
        )
    }
}

export default withRouter(CalendarHome)
