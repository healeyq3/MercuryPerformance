import React, { Component } from 'react';
import cookie from 'react-cookies';
import {withRouter} from "react-router-dom";
import "../css/secondarybar.css"

class SecondaryBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }
    }

    render() {
        if(!cookie.load('idToken')){
            return null;
        }
        return (
            <div className="secondarybar"/>
        )
    }
}

export default withRouter(SecondaryBar);
