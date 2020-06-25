import React, { Component } from 'react';
// eslint-disable-next-line
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
        let c = 0;
        if(t.percent < 75){
          c = 0
        } else if(t.percent < 85){
          c = 1
        } else if(t.percent < 95){
          c = 2
        } else if(t.percent >= 95){
          c = 3
        }
        console.log(t)
        if(t.distanceUnit!==undefined){
          newTime = distanceToTime(t.distance, t.distanceUnit, averagePace /(t.percent/100))
          time += newTime
          DATA.push({x0:start, x:time, y:t.percent, color: c})
          
          start +=newTime
        }
        else{
          newTime = totalMinutes(t.hours, t.minutes, t.seconds)
          console.log(newTime)
          time +=newTime
          DATA.push({x0:start, x:time, y:t.percent, color: 0})
          // DATA.map(el => ({x0: el.x0 , x: el.x, y: el.y}));
          start +=newTime
        }
      }
      // const dataWithColor = DATA.map((d, i) => ({
      //   ...d, color: 0
      //   }))
        return (
          
          <XYPlot
            xDomain={[0, 50+time]}
            yDomain={[0, 150]}
            // xType="time"
            width={700}
            height={400}
            // colorType = "linear"
            colorDomain = {[0, 1, 2, 3]}
            colorRange = {['green','yellow', 'orange', 'red']}
            
            
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