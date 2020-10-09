/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const portfolioItem = path.resolve(
    `./src/components/Templates/PortfolioItem.tsx`
  );

  const blogPost = path.resolve(
    `./src/components/Templates/BlogPost.tsx`
  )
  return graphql(
    `
      {
        allContentfulPortfolioItem {
          edges {
            node {
              slug
              title
              content {
                  content
              }
            }
          }
        }
        allContentfulBlogPost {
          edges {
            node {
              title
              subtitle
              content {
                childMarkdownRemark {
                  html
                }
              }
              slug
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const portfolioItems = result.data.allContentfulPortfolioItem.edges;
    portfolioItems.forEach((post, index) => {
      const previous =
        index === portfolioItems.length - 1 ? null : portfolioItems[index + 1].node;
      const next = index === 0 ? null : portfolioItems[index - 1].node;

      createPage({
        path: `portfolio/${post.node.slug}`,
        component: portfolioItem,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      });
    });

    const blogPosts = result.data.allContentfulBlogPost.edges;
    blogPosts.forEach((post, index) => {
      const previous =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
      const next = index === 0 ? null : blogPosts[index - 1].node;
      createPage({
        path: `blog/${post.node.slug}`,
        component: blogPost,
        context: {
          slug: post.node.slug,
          assetSlug: `*${post.node.slug}*`,
          previous,
          next,
        },
      });
    })
  });
};
