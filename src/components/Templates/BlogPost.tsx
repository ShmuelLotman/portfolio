import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';


const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  max-height: 40vh;
  padding-top: 50px;
`;

interface IProps {
    data: {
        contentfulBlogPost: {
            title: string;
            subtitle: string;
            heroImage: {
                fluid: any;
            };
            content: {
                childMarkdownRemark: {
                    html: any
                }
            };
        };
    };
    pageContext: {
        previous: {
            slug: string;
            title: string;
        } | null;
        next: {
            slug: string;
            title: string;
        } | null;
    };
}

const BlogPost = ({ data, pageContext }: IProps) => {
    const {
        title,
        subtitle,
        heroImage: image,
        content: { childMarkdownRemark: newInfo },
    } = data.contentfulBlogPost;
    const { previous, next } = pageContext;
    console.log(newInfo.html)
    return (
        <div>
            <Image fluid={image.fluid} alt={title} style={{ maxHeight: '400px', objectFit: 'contain' }} />
            <Container>
                <h2 data-testid="projectTitle">{title}</h2>
                <h3 data-testid="projectType">{subtitle}</h3>
                <div data-testid="projectBody"
                    dangerouslySetInnerHTML={{
                        __html: newInfo.html
                    }}>
                </div>
                <button>
                    Visit project
                </button>
                <Pagination>
                    {previous && (
                        <li data-testid="previous">
                            <Link to={`/blog/${previous.slug}/`} rel="prev">
                                &laquo; {previous.title}
                            </Link>
                        </li>
                    )}
                    {next && (
                        <li data-testid="next">
                            <Link to={`/blog/${next.slug}/`} rel="next">
                                {next.title} &raquo;
              </Link>
                        </li>
                    )}
                </Pagination>
            </Container>
        </div>
    );
};

export default BlogPost;

const Image = styled(Img)`
  margin-top: 2rem;

`;

const Pagination = styled.ul`
  list-style: none;
  margin: 3rem 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  li {
    a {
      color: #ccc;
      text-decoration: none;
      transition: 0.2s;
      &:hover {
        color: #999;
      }
    }
  }
`;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $assetSlug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      subtitle
      content {
        childMarkdownRemark {
              html
        }
      }
      heroImage {
        fluid(maxWidth: 1920, quality: 70) {
          ...GatsbyContentfulFluid
        }
      }
    }
    allContentfulAsset(filter: {title: {glob: $assetSlug}}) {
    edges {
      node {
        title
        fluid(maxWidth: 1920, quality: 70) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
  }
`;
