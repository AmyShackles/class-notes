import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '../styles/Content.js';

const Content = ({ input }) => (
  <Wrapper dangerouslySetInnerHTML={{ __html: input }} />
);

export default Content;

Content.propTypes = {
  input: PropTypes.any.isRequired,
};
