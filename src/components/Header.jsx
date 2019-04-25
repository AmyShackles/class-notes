import React from 'react';
import PropTypes from 'prop-types';
import '../styles/header.css';
import cover from '../templates/speed.jpg';


const Header = ({ children, title, chapter, subtitle, date }) => (
  <div className="header-wrapper">
    <img src={cover || {} || [] || ''} alt="" />
    <div className="header-text">
      {title ? <h1>{title}</h1> : null}
      {chapter ? <h2>{chapter}</h2> : null}
      {subtitle ? <h3>{subtitle}</h3> : null}
      {date ? <h4>{date}</h4> : null}

      {children && <div className="header-subtitle">{children}</div>}
    </div>
  </div>
);

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
  chapter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Header.defaultProps = {
  children: false,
  cover: false,
  date: false,
  title: false,
};
