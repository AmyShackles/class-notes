import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import '../styles/tagsblock.css';

const TagsBlock = ({ list }) => (
  <div className="tagsContainer">
    {list &&
      list.map((tag, index) => {
        const upperTag = tag.charAt(0).toUpperCase() + tag.slice(1);
        return (
          <Link key={tag + index} to={`/tags/${tag}`}>
            <span>{upperTag}</span>
          </Link>
        );
      })}
  </div>
);

export default TagsBlock;

TagsBlock.propTypes = {
  list: PropTypes.array,
};
