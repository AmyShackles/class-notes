import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { TagsBlock } from 'components';
import '../styles/bloglist.css';
import cover from '../templates/speed.jpg';

const BlogList = ({ path, title, date, chapter, subtitle, tags }) => (
  <article>
    <div className="bloglist-image">
      <Link to={path} title={title}>
        <img src={cover} alt="" />
      </Link>
    </div>
    <div className="bloglist-information">
      <div className="bloglist-date">{date}</div>
      <Link to={path}>
        {title}
        <br />
        <div className="bloglist-title">
          {chapter}
          {chapter ? <br /> : null}
          {subtitle}
        </div>
      </Link>
      <TagsBlock list={tags} />
    </div>
  </article>
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
