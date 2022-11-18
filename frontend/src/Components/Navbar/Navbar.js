import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Register from "../Register/Register";
import './navbar.css';

export default function Navbar(props) {
  return (
    <div id= "navBar">
      <div id="nav">
        <a href="/" className="restaurantTinderNav">
          <h1>Restaurant Tinder</h1>
        </a>
      <div id="nav-buttons">
        <Nav>
          <NavItem>
            <NavLink to="/home" >Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/homepage">Restaurant Options</NavLink>
          </NavItem>
          <NavItem>
            {
              props.token !== undefined ?
                <NavLink to="/login" >Log Out</NavLink>
              :
                <NavLink href="Login">Log In</NavLink>
            }
          </NavItem>
        </Nav>
      </div>
    </div>
    </div>
  );
}
