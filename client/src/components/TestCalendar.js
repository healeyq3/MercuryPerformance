import { Calendar, momentLocalizer } from 'react-big-calendar'
import React from 'react'
import moment from 'moment'

import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
const localizer = momentLocalizer(moment)

const TestCalendar = props => (
  <Container fluid>
      <NavBar></NavBar>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </Container>
);export default TestCalendar;