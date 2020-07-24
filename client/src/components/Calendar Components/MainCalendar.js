import React, { Component } from 'react'
import { sevenDaySnapshot, dayDate, getDay, getDate } from '../../math/DateAlgos';
import '../../css/maincalendar.css';
import { isEmptyObject } from 'jquery';

export class MainCalendar extends Component {
    render() { // takes in two props from Home.js : EventDates and WorkoutDates, both objects

        const dates = sevenDaySnapshot(this.props.workouts, this.props.events)
        console.log(dates)

        const inCalendar = [];
        for(const date in dates){
            const events = [];
            if(dates[date].events.length > 0){
                for(const event in dates[date].events){
                    if(dates[date].events[event].type === "event"){
                        events.push(
                            <div className = "race-text">
                                <span class="race-dot"></span>
                                <text>{dates[date].events[event].name}</text>
                            </div>
                        )
                    } else {
                        events.push(
                            <div className = "workout-text">
                                <span class="workout-dot"></span>
                                <text>{dates[date].events[event].name}</text>
                            </div>
                        )
                    }
                }
            } else {
                events.push(
                    <div className = "empty-day">
                        <text>No Upcoming Events</text>
                    </div>
                )
            }

            inCalendar.push(
            <div className = 'date-card'>
                <h5 className = 'date-text'>{getDay(dates[date].date)}</h5>
                <h5 className = 'date-number-text'>{getDate(dates[date].date)}</h5>
                <div className = "date-holder">
                    {events}
                </div>
            </div>
            )
        }
        return (
            <div className = 'main-container'>
                {inCalendar}
            </div>
        )
    }
}

export default MainCalendar
