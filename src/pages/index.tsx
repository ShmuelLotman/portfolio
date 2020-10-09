import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { PageProps, graphql } from "gatsby"
import styled from 'styled-components'
import Particles from 'react-particles-js'
import particleParams from '../utils/particalParams';
import TW from '../utils/typewriter'

const listArr = [
  "A Father",
  "A Husband",
  "Dedicated",
  "A Quick Learner",
  "A software engineer",
  "Ready to work"
];

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps | any>> = ({ data, path }) => (
  <>
    <Background params={particleParams} />
    <Intro>
      <Container>

        <Headline>
          <TW listArr={listArr} /><br /><br />
        </Headline>
        <Text style={{ fontFamily: 'brandon-grotesque, sans-serif' }}>
          As a strong team player, problem solver, and tireless worker, I'm confident I can provide value to your team. Please feel free to take a look at my work and/or CV and reach out at any time.
    </Text>

      </Container>
    </Intro>
  </>
)

export default UsingTypescript

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
const Background = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: white;
`;
const Headline = styled.h1`
  font-size: 3rem;
  margin: 0;
  .accent {
    color: #e94e1b;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0.5rem 0;
`;

const Intro = styled.section`
  min-height: 75vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 1140px;
  max-width: 94%;
  margin: 0 auto;
`;
