import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries, ChartLabel
  } from 'react-vis';
import { distanceToTime, totalMinutes } from '../../math/TimeConversions';

export class ExistingWorkoutGraph extends Component {
    render() {
      let time = 0;
      let start = 0;
      let DATA = [];
      let newTime = 0;
      for(const rep in this.props.reps){
        let t = this.props.reps[rep];
        console.log(t)
        if(t.distanceUnit!==undefined){
          newTime = distanceToTime(t.distance, t.distanceUnit, 6.5 /(t.percent/100))
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
     // console.log(time)

        return (
            <Card>
                <Card.Header className = "text-center">Graph</Card.Header>
                <Card.Body>
                <XYPlot
        xDomain={[0, 50+time]}
        yDomain={[0, 150]}
        // xType="time"
        width={400}
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis/>
        <ChartLabel
    text="Estimated Minutes"
    className="alt-x-label"
    includeMargin={false}
    xPercent={0.31}
    yPercent={1.201}
    />
    <ChartLabel
    text="V02 Max"
    className="alt-y-label"
    includeMargin={true}
    xPercent={.15}
    yPercent={-.09}
    style={{
      textAnchor: 'end'
    }}
    />
        <YAxis />
        <VerticalRectSeries data={DATA} style={{stroke: '#fff'}} />
      </XYPlot>
                </Card.Body>
            </Card>
        )
    }
}


  



export default ExistingWorkoutGraph
