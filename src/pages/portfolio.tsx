import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Post from '../components/Atoms/Post'
interface IProps {
    data: {
        allContentfulPortfolioItem: {
            edges: {
                node: {
                    title: string;
                    slug: string;
                    image: {
                        fluid: any;
                    };
                    type: string;
                    technologies: string[]
                    description: string
                };
            }[];
        };
    };
}

const Portfolio: FC<IProps> = ({ data }: IProps) => {
    const posts = data.allContentfulPortfolioItem.edges;
    console.log(posts)
    return (
        <Container>
            <h2 data-testid="headline">Portfolio</h2>
            <Grid>
                {posts.map(({ node: { title, description, slug, technologies, image } }) => (
                    <Post data={{ title, description, slug, technologies, image }} key={slug} />
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
    allContentfulPortfolioItem {
      edges {
        node {
          title
          slug
          technologies
          content {
              content
          }
          image: featuredImage {
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

export default Portfolio
