import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface IProps {
  data: {
    title: string;
    image: {
      fluid: any;
    };
    technologies: string[];
    description: string;
    slug: string;
  };
}

const Post = ({ data: { title, image, slug, technologies, description } }: IProps) => (
  <Item>
    <Link to={`/portfolio/${slug}/`}>
      <Img fluid={image.fluid} />
      <Overlay>
        <h3>{title}</h3>
        <small>A Shmuel Lotman project</small>
      </Overlay>
    </Link>
  </Item>
);

const Item = styled.div`
  position: relative;
  overflow: hidden;
  img {
    transition: transform 0.3s ease !important;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  transform: translateY(-50%);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  h3 {
    margin: 0;
    color: #fff;
  }
`;

export default Post;
