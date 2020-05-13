import { Calendar, momentLocalizer } from 'react-big-calendar'
import React from 'react'
import moment from 'moment'
import './scss/styles.scss'
import { Container } from 'react-bootstrap';
const localizer = momentLocalizer(moment)

const TestCalendar = props => (
  <Container fluid>
      
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </Container>
);export default TestCalendar;