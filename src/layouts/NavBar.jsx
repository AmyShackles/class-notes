import React from 'react';
import { Link } from 'gatsby';
import Headroom from 'react-headroom';
import logo from '../../static/logo/header-logo.png';
import '../styles/navbar.css';

const NavBar = () => (
  <Headroom calcHeightOnResize disableInlineStyles>
    <Link className="navbar-styledLink" to="/">
      <img src={logo} alt="Gatsby Logo" />
    </Link>
    <nav className="navbar-nav">
      <Link to="/">Home</Link>
      <Link to="/blog">Tagged List</Link>
    </nav>
  </Headroom>
);

export default NavBar;
