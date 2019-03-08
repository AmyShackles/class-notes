import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { TagsBlock } from 'components';
import { Container } from 'layouts';
import {
  Wrapper,
  Image,
  Information,
  Date,
  Title,
} from '../styles/BlogList.js';

const BlogList = ({ path, cover, title, date, chapter, subtitle, tags }) => (
  <Container>
    <Wrapper>
      <Image>
        <Link to={path} title={title}>
          <Img fluid={cover} />
        </Link>
      </Image>
      <Information>
        <Date>{date}</Date>
        <Link to={path}>
          <Title>
            {title}
            <br />
            {chapter}
            {chapter ? <br /> : null}
            {subtitle}
          </Title>
        </Link>
        <TagsBlock list={tags} />
      </Information>
    </Wrapper>
  </Container>
);

export default BlogList;

BlogList.propTypes = {
  cover: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chapter: PropTypes.string,
  subtitle: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.array.isRequired,
};
