import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'typeface-open-sans';
import 'typeface-candal';
import { NavBar, Footer } from 'layouts';
<<<<<<< HEAD
import theme from '../../config/theme';
import headroom from '../styles/headroom';

injectGlobal`

  *, *:before, *:after {
    box-sizing: inherit;
  }
  html {
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  a {
    color: ${theme.colors.link};
    transition: color .5s;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
    color: ${theme.colors.linkHover};
  }
  h1{
    font-family: ${theme.fontFamily.heading};
  }
  table {
    table-layout: fixed;
    overflow: scroll;
    width: initial !important;
  }
  td, th {
    padding: 10px !important;
    width: max-content;
  }
  .fibTree {
    @media (max-width: 768px) {
      display: none;
    }
    @media (min-width: 769px) {
      display: block;
    }
  }
  .tree {
    min-width: fit-content;
  }

  ${headroom}
`;
=======
import '../styles/headroom.css';
>>>>>>> 98503c87d99aa727633d1b421b85dbc6fbc7adb7

const Layout = ({ children }) => (
  <div>
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
