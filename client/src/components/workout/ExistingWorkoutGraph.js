import React, { Component } from 'react';
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
      let medianPace = this.props.team.hasOwnProperty('medianWPace') === true ? this.props.team.medianWPace : 6.5
      for(const rep in this.props.reps){
        let t = this.props.reps[rep];
        let c = 0;
        if(t.percent < 75){
          c = .7
        } else if(t.percent < 85){
          c = 2
        } else if(t.percent < 95){
          c = 3
        } else if(t.percent >= 95){
          c = 4
        }
        // console.log(t)
        if(t.distanceUnit!==undefined){
          // console.log("Got to the first one")
          newTime = distanceToTime(t.distance, t.distanceUnit, medianPace /(t.percent/100))
          time += newTime
          DATA.push({x0:start, x:time, y:t.percent, color: c})
          
          start +=newTime
        }
        else{
          
          newTime = totalMinutes(t.hours, t.minutes, t.seconds)
          // console.log(`newTime: ${newTime}`)
          if(newTime !== 0) {
            time +=newTime
            DATA.push({x0:start, x:time, y:t.percent, color: c})
            // DATA.map(el => ({x0: el.x0 , x: el.x, y: el.y}));
            start +=newTime
          }
        }
      }
        return (
          
          <XYPlot
            xDomain={[0, 30+time]}
            yDomain={[0, 120]}
            // xType="time"
            width={600}
            height={360}
            // colorType = "linear"
            colorDomain = {[0, 1, 2, 3, 4]}
            colorRange = {['#ffffff','cyan','yellow', 'orange', 'red']}
            
            
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