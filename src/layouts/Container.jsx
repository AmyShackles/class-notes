import React from 'react';
import PropTypes from 'prop-types';
import '../styles/container.css';

const Container = ({ children, type, className, center }) => (
  <section className="wrapper">
    <div className={className} type={type} center={center}>
      {children}
    </div>
  </section>
);

export default Container;

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  center: PropTypes.object,
};
