import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Blog from '../components/Atoms/Blog'
interface IProps {
    data: {
        allContentfulBlogPost: {
            edges: {
                node: {
                    title: string;
                    slug: string;
                    subtitle: string;
                    image: {
                        fluid: any;
                    };
                };
            }[];
        };
    };
}

const BlogPage: FC<IProps> = ({ data }: IProps) => {
    const posts = data.allContentfulBlogPost.edges;
    console.log(posts)
    return (
        <Container>
            <h2 data-testid="headline">Blog</h2>
            <Grid>
                {posts.map(({ node: { title, subtitle, slug, image } }) => (
                    <Blog data={{ title, slug, subtitle, image }} key={slug} />
                ))}
            </Grid>
            <Centered>
                This is a small selection of the hundreds of projects I worked on.
          <br />
          Want to see more?{' '}
                <Link to="/contact/">
                    <strong>Get in touch</strong>
                </Link>{' '}
          and let me know what you're looking for, so I can send you a more
          comprehensive portfolio.
        </Centered>
        </Container>
    )
}

export const pageQuery = graphql`
  query {
    allContentfulBlogPost {
      edges {
        node {
          title
          slug
          subtitle
          content {
              childMarkdownRemark {
                  html
              }
          }
          image: heroImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

const Container = styled.div`
  width: 1140px;
  max-width: 94%;
  margin: 0 auto;
`;

const Centered = styled.p`
  margin-top: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default BlogPage
