import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import { fixDateSelector } from '../../math/DateAlgos';
import PropTypes from "prop-types";
import { getTeams } from '../../actions/teamActions';

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
                }
            }
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.rehydrated === false){
            this.props.getTeams();
        }
    }

    render() {
        
        // if(!this.props.teams || !this.props.selectedTeam || !this.props.teams[this.props.selectedTeam].v02History){
        //     return null
        // }

        // let dates = [];
        // let data = [];
        // for(const date in this.props.teams[this.props.selectedTeam].v02History){
        //     dates.push(new Date(fixDateSelector(date)).getTime());
        // }
        // dates.sort(function(a,b){return a - b});
        // for(const date in dates){
        //     let toAdd = {
        //         x: date,
        //         y: this.props.teams[this.props.selectedTeam].v02History[date].medianV02
        //     }
        //     data.push(toAdd)
        // }

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

V02OnlyGraph.propTypes = {
    selectedTeam: PropTypes.string.isRequired,
    teams: PropTypes.object.isRequired
}

const mapStateToProps = function (state) {
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { })(V02OnlyGraph)
