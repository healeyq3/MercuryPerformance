import React, { Component } from "react";
import Chart from "react-apexcharts";

export class Team_Mileage_Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "line",
        },
        xaxis: {
          type: "datetime",
        },
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
          width="500"
        />
      </div>
    );
  }
}

export default Team_Mileage_Graph;
