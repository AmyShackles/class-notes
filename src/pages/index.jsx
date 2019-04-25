import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Header, PostList } from 'components';
import { Layout } from 'layouts';
import '../styles/index.css';

const Index = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title={'Note Subjects'} />
      <Header title="Note Subjects">Please select a topic</Header>
      <div className="index-postWrapper">
        {edges.map(({ node }) => (
          <PostList
            key={node.id}
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            chapter={node.frontmatter.chapter}
            subtitle={node.frontmatter.subtitle}
            date={node.frontmatter.date}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              chapter: PropTypes.string,
              subtitle: PropTypes.string,
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 6
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          frontmatter {
            title
            chapter
            subtitle
            path
            tags
            date(formatString: "MM.DD.YYYY")

          }
        }
      }
    }
  }
`;
