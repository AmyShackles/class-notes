import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header } from 'components';
import '../styles/prism.css';
import '../styles/post.css';

const Post = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const post = data.markdownRemark;
  const image = post.frontmatter.cover;
  const title = post.frontmatter.title;
  const chapter = post.frontmatter.chapter;
  const subtitle = post.frontmatter.subtitle;
  const date = post.frontmatter.date;
  const html = post.html;
  return (
    <Layout>
      <Header
        title={title}
        chapter={chapter}
        subtitle={subtitle}
        date={date}
        cover={image}
      />
      <Container>
        <Content input={html} />
        <TagsBlock list={post.frontmatter.tags || []} />
      </Container>
      <div className="post-suggestionBar">
        <div className="post-postSuggestion">
          {prev && (
            <Link to={prev.frontmatter.path}>
              <button value="prev" aria-label="previous" className="prev-post">
                <h3 className="prev-post">
                  {'<< Previous:'}
                  <br />
                  {prev.frontmatter.title}
                  <br />
                  {prev.frontmatter.subtitle}
                </h3>
              </button>
            </Link>
          )}
        </div>
        <div className="post-postSuggestion">
          {next && (
            <Link to={next.frontmatter.path}>
              <button value="next" aria-label="next" className="next-post">
                <h3 className="next-post">
                  {'>> Next:'}
                  <br />
                  {next.frontmatter.title}
                  <br />
                  {next.frontmatter.subtitle}
                </h3>
              </button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        date
        title
        chapter
        subtitle
        tags
        path
      }
    }
  }
`;
