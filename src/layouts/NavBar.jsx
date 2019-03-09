import React from 'react';
import { Link } from 'gatsby';
import Headroom from 'react-headroom';
import logo from '../../static/logo/header-logo.png';
import { Nav, StyledLink } from '../styles/NavBar.js';

const NavBar = () => (
  <Headroom calcHeightOnResize disableInlineStyles>
    <StyledLink to="/">
      <img src={logo} alt="Gatsby Logo" />
    </StyledLink>
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/blog">Tagged List</Link>
    </Nav>
  </Headroom>
);

export default NavBar;
