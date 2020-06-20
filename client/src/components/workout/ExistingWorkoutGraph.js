import React, { Component } from 'react'
import  { Card } from 'react-bootstrap'
import { VictoryArea, VictoryChart } from 'victory';

export class ExistingWorkoutGraph extends Component {
    render() {
        const data = [
            {x: 0, y: 30, fill:'#c43b55'},
            {x: 2, y: 30, fill:'#c43b55'},
            {x: 2, y: 80, fill:'#c43b55'},
            {x: 4, y: 100, fill:'#c43b55'}
          ];
        return (
            <Card>
                <Card.Header className = "text-center">Graph</Card.Header>
                <Card.Body>
                <VictoryChart domainPadding={20}> 
                <VictoryArea
                    style={{ data: { fill: data[0].fill} }}
                    data={data}
                />
                </VictoryChart>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingWorkoutGraph
