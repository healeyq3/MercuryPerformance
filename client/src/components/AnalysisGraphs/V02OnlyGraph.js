import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export class V02OnlyGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            options : {
                chart : {
                    id: 'area'
                },
                xaxis: {
                    type: 'datetime'
                },
                title: {
                    text: 'Team V02max Over The Season'
                }
            }
        }
    }


    render() {
        
        return (
            <div className = "mixed-chart">
                <Chart 
                options = {this.state.options}
                series = {this.props.series}
                width = "500"
                type = 'area'
                />
            </div>
        )
    }
}


export default (V02OnlyGraph)
