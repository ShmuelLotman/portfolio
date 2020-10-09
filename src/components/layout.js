/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from 'styled-theming';
import Header from "./header"
import Footer from './footer'
import "./layout.css"


export const getBackground = theme('mode', {
  light: '#d6deeb',
  dark: '#011627',
});

export const getTextColor = theme('mode', {
  light: '#011627',
  dark: '#d6deeb',
});


const Style = createGlobalStyle`
  body {
      background-color: ${getBackground};
      color: ${getTextColor};
      font-family: "brandon-grotesque", sans-serif;
      font-size: 1.25rem;
      margin: 0;
      transition: 0.5s;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: 0.5s;
  }

  .menu-background {
    background: ${getTextColor};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-height:80vh;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Wrapper>

        <Style />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >

          <main>{children}</main>
        </div>

      </Wrapper>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
