import React, { Component } from 'react';
import {Row, Col, Card, Button} from 'react-bootstrap'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries
  } from 'react-vis';

export class ExistingWorkoutGraph extends Component {
    render() {
        const timestamp = new Date('May 23 2017').getTime();
        const ONE_DAY = 86400000;
        
        const DATA = [
          {x0: 0, x: 10, y: 67},
          {x0: 10, x: 20, y: 96},
          {x0: 20, x: 27, y: 99},
          {x0: 27, x: 77, y: 50},
        ].map(el => ({x0: el.x0 , x: el.x, y: el.y}));
        return (
            <Card>
                <Card.Header className = "text-center">Graph</Card.Header>
                <Card.Body>
                <XYPlot
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        // xType="time"
        width={300}
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalRectSeries data={DATA} style={{stroke: '#fff'}} />
      </XYPlot>
                </Card.Body>
            </Card>
        )
    }
}


  



export default ExistingWorkoutGraph
