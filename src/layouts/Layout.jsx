import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'typeface-open-sans';
import 'typeface-candal';
import { NavBar, Footer } from 'layouts';
import '../styles/headroom.css';

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
