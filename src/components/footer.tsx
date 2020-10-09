import React from 'react';
import styled from 'styled-components';

const Navigation = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  margin: 0;

  li {
    margin: 0 0.5rem;

    a {
      padding: 0px 0.25rem;
      &::after {
        content: '';
        display: block;
        height: 10px;
        width: 0%;
        margin-top: -10px;
        background: #e94e1b;
        transition: all 0.5s ease 0s;
      }
      &:hover {
        border-bottom: none;
        &::after {
          width: 110%;
        }
      }
    }
    svg {
      margin-left: 1rem;
    }
  }
`;

const Foot = styled.footer`
  padding: 0 3% 1%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;

  @media print {
    display: none;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const Footer = () => (
  <Foot>
    <div>
      &copy; {new Date().getFullYear()} Shmuel Lotman
      <br />
      Proudly built with{' '}
      <a href="https://gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
        Gatsby
      </a>
      .
    </div>
    <nav>
      <Navigation data-testid="footer-menu">
        <li style={{ display: 'flex', alignItems: 'center' }} data-testid="github">
          <a
            href="https://github.com/jakeherp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }} data-testid="linkedin">
          <a
            href="https://www.linkedin.com/in/jacobherper/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }} data-testid="twitter">
          <a
            href="https://twitter.com/jakeherp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
      </Navigation>
    </nav>
  </Foot>
);

export default Footer;
