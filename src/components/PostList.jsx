import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import '../styles/postlist.css';
import cover from '../templates/speed.jpg';

const PostList = ({ path, date, title, chapter, subtitle }) => (
  <div className="postlist-wrapper">
    <div className="postlist-image">
      <img src={cover} alt="" />
    </div>
    <Link className="postlist-styledLink" to={path}>
      <div className="postlist-info">
        <div>
          <span>{date}</span>
          <div className="postlist-title">
            <h2>{title}</h2>
            <span>
              <h3>{chapter}</h3>
            </span>
            <span>{subtitle}</span>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default PostList;

PostList.propTypes = {
  path: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  chapter: PropTypes.string,
  // excerpt: PropTypes.string,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
