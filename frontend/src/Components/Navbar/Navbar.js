import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Home from "../Home/Home";
import './navbar.css';

export default function Navbar() {
  return (
    <div id= "navBar">
      <div id="nav">
        <a href="/" className="restaurantTinderNav">
          <h1>Restaurant Tinder</h1>
        </a>
      </div>
      <div id="nav-buttons">
        <Nav>
          <NavItem>
            <NavLink href="Home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/homepage">Restuarant Options</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="Login">Log In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}
