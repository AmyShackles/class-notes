import React from 'react';
import PropTypes from 'prop-types';
import '../styles/prism.css';
import '../styles/content.css';

const Content = ({ input }) => (
  <div
    className="content-wrapper"
    dangerouslySetInnerHTML={{ __html: input }}
  />
);

export default Content;

Content.propTypes = {
  input: PropTypes.any.isRequired,
};
