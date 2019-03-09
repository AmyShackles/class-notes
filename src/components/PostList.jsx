import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Wrapper, Image, StyledLink, Info, Title } from '../styles/PostList.js';

const PostList = ({ cover, path, date, title, chapter, subtitle }) => (
  <Wrapper>
    <Image>
      <Img fluid={cover} />
    </Image>
    <StyledLink to={path}>
      <Info>
        <div>
          <span>{date}</span>
          <Title>
            {title}
            <span>
              <h3>{chapter}</h3>
            </span>
            <span>{subtitle}</span>
          </Title>
        </div>
      </Info>
    </StyledLink>
  </Wrapper>
);

export default PostList;

PostList.propTypes = {
  cover: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  chapter: PropTypes.string,
  // excerpt: PropTypes.string,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
