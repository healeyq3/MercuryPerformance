import React from 'react'
import './Navbar.css'
import {Navbar, Nav, NavBrand, NavLink} from 'react-navbar';
import { Container } from 'react-bootstrap';
const navbar = props => (
    <Container fluid>
    <header className = "navBar">
    <nav className = "navBarNav">
        <div className = "navBarItems">
            <div className = "navBarHome">
                <a href = "/">Home</a>
            </div>
            <div className = "navBarCal">
                <a href = "https://www.google.com/">Calendar</a>
            </div>
            <div className = "navBarWorkOut">
                <a href ="https://www.google.com/" >Build Workout</a>
            </div>
            <div className = "navBarSettings">
                <a href ="https://www.google.com/" >Settings</a>
            </div>
        </div>
    </nav> 
    
        </header>
    <Container/>
);
export default navbar;