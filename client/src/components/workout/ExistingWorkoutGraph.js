import React, { Component } from 'react'
import  { Card } from 'react-bootstrap'
import { VictoryBar, VictoryChart } from 'victory';

export class ExistingWorkoutGraph extends Component {
    render() {
        const data = [
            {quarter: 1, earnings: 13000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
          ];
        return (
            <Card>
                <Card.Header className = "text-center">Graph</Card.Header>
                <Card.Body>
                <VictoryChart domainPadding={20}>
                    <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                    />
                </VictoryChart>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingWorkoutGraph
