import React, { Component } from "react";
import Chart from "react-apexcharts";

export class Team_Mileage_Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          width: "100%",
          height: 350,
          id: "line",
          toolbar: {
            show: true,
            tools: {
              zoom: false,
              zoomin: true,
              zoomout: true,
              reset: false,
              download: false,
              selection: false,
              pan: false,
            }
          }
        },
        dataLabels : {
          enabled: false
        },
        stroke : {
          width: [4]
        },
        xaxis: {
          type: "datetime",
        },
        title: {
          text: "Weekly Mileage",
          alight: "left",
          offsetX: 110
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              style: {
                colors: "#008FFB"
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ],
        toolTip: {
          fixed: {
            enabled: true,
            position: "topLeft",
            offsetY: 30,
            offsetX: 60
          }
        },
        legend : {
          horizontalAlign: "left",
          offsetX: 40
        }
      },
    };
  }
  render() {
    return (
      <div className="chart">
        <Chart
          options={this.state.options}
          series={this.props.series}
          type="line"
        />
      </div>
    );
  }
}

export default Team_Mileage_Graph;
