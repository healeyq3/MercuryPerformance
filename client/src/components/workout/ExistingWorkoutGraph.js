import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries
  } from 'react-vis';
import { distanceToTime, totalMinutes } from '../../math/TimeConversions';

export class ExistingWorkoutGraph extends Component {
    render() {
      let time = 0;
      let start = 0;
      let DATA = [];
      let newTime = 0;
      let averagePace = this.props.team.hasOwnProperty('averageWPace') === true ? this.props.team.averageWPace : 6.5
      for(const rep in this.props.reps){
        let t = this.props.reps[rep];
        console.log(t)
        if(t.distanceUnit!==undefined){
          newTime = distanceToTime(t.distance, t.distanceUnit, averagePace /(t.percent/100))
          time += newTime
          DATA.push({x0:start, x:time, y:t.percent})
          DATA.map(el => ({x0: el.x0 , x: el.x, y: el.y}));
          start +=newTime
        }
        else{
          newTime = totalMinutes(t.hours, t.minutes, t.seconds)
          console.log(newTime)
          time +=newTime
          DATA.push({x0:start, x:time, y:t.percent})
          DATA.map(el => ({x0: el.x0 , x: el.x, y: el.y}));
          start +=newTime
        }
      }
        return (
          <XYPlot
            xDomain={[0, 50+time]}
            yDomain={[0, 150]}
            // xType="time"
            width={700}
            height={400}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title = "Minutes"/>
            <YAxis title = "V02 Max"/>
            <VerticalRectSeries data={DATA} style={{stroke: '#fff'}} />
          </XYPlot>
        )
    }
}

export default ExistingWorkoutGraph