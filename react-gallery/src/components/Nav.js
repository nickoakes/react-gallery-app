/*
  React Gallery App.
  Nav.js
*/


import React from 'react';
import {NavLink} from 'react-router-dom';
const Nav = () => 
    <nav className="main-nav">
        <ul>
          <li><NavLink to="/south-korea">South Korea</NavLink></li>
          <li><NavLink to="/diving">Scuba</NavLink></li>
          <li><NavLink to="/travel">Travel</NavLink></li>
          <li><NavLink to ="/search">Search =></NavLink></li>
        </ul>
    </nav>

export default Nav;