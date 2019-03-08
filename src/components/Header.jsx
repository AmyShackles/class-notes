import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Wrapper, Text, Subtitle } from '../styles/Header.js';

const Header = ({ children, title, chapter, subtitle, date, cover }) => (
  <Wrapper>
    <Img fluid={cover || {} || [] || ''} />
    <Text>
      {title ? <h1>{title}</h1> : null}
      {chapter ? <h2>{chapter}</h2> : null}
      {subtitle ? <h3>{subtitle}</h3> : null}
      {date ? <h4>{date}</h4> : null}

      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
