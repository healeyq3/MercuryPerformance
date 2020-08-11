import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export class V02_DevGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "line",
          stacked: false,
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
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [4, 4],
        },
        title: {
          text: "V02max Progression vs Workout Deviation",
          alight: "left",
          offsetX: 110,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
              formatter: function (val) {
                return val.toFixed(2);
              },
            },
            title: {
              text: "V02max",
              style: {
                color: "#008FFB",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: "Deviation",
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: true,
              color: "#cf1717",
            },
            labels: {
              style: {
                colors: "#cf1717",
              },
              formatter: function (val) {
                return val.toFixed(2);
              },
            },
            title: {
              text: "Workout Deviation",
              style: {
                color: "#cf1717",
              },
            },
          },
        ],
        toolTip: {
          fixed: {
            enabled: true,
            position: "topLeft",
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
        colors: ["#008FFB", "#cf1717"],
        noData: {
          text: undefined,
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "14px",
            fontFamily: undefined,
          },
        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type="line"
        />
      </div>
    );
  }
}

export default V02_DevGraph;
