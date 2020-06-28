import React, { Component } from 'react'
import {Switch} from "react-router-dom";
import AuthRoute from "../util/AuthRoute";
import Login from "./Login";
import AuthRoute3 from "../util/AuthRoute3";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import AuthRoute2 from "../util/AuthRoute2";
import TeamSelect from "./TeamSelect";
import ComingSoon from "./ComingSoon";
import Events from "./Events";
import EventDetails from "./EventDetails";
import Workouts from "./Workouts";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutDateDetails from "./WorkoutDateDetails";
import WorkoutCreator from "./WorkoutCreator";
import cookie from "react-cookies";

export class MainPage extends Component {
    constructor(props) {
        super(props);

        this.rerenderCallback = this.rerenderCallback.bind(this);
    }

    rerenderCallback(){
        this.forceUpdate();
    }

    render(){
        let mainPageClasses = ["main-page"];
        if(!cookie.load('mercury-fb-token')){
            mainPageClasses.push('login')
        }

        return (
            <div className="main-page-container">
                <Switch>
                    <React.Fragment>
                        <div className={mainPageClasses.join(' ')}>
                            <AuthRoute exact path = '/login' component = {Login} rerenderCallback={this.rerenderCallback}/>
                            <AuthRoute3 exact path = '/' component = {Home}/>
                            <AuthRoute3 exact path = '/home' component = {Home}/>
                            <AuthRoute exact path = '/signup' component = {CreateAccount} rerenderCallback={this.rerenderCallback}/>
                            <AuthRoute2 exact path = '/teamselect' component = {TeamSelect}/>
                            <AuthRoute2 exact path = '/comingsoon' component = {ComingSoon} />
                            <AuthRoute3 exact path = '/events' component = {Events}/>
                            <AuthRoute3 exact path = '/eventdetails' component = {EventDetails}/>
                            <AuthRoute3 exact path = '/workouts' component = {Workouts} />
                            <AuthRoute3 exact path = '/workoutdetails' component = {WorkoutDetails} />
                            <AuthRoute3 exact path = '/workoutdatedetails' component = {WorkoutDateDetails} />
                            <AuthRoute3 exact path = '/workoutcreator' component = {WorkoutCreator} />
                        </div>
                    </React.Fragment>
                </Switch>
            </div>
        )
    }
}

export default MainPage;
