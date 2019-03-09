import React from 'react';
import styled, { keyframes } from 'react-emotion';

const Wrapper = styled.footer`
  padding-top: 15px;
  position: static;
  height: 60px;
  width: 100%;
  justify-content: center;
  bottom: 0;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 4rem;
  }
`;

const Text = styled.div`
  margin: 0;
  padding-bottom: 15px;
  justify-content: center;
  display: flex;
  text-align: center;
  color: ${props => props.theme.colors.white.light};
  a {
    color: #62fdfe;
    font-weight: bold;
    margin: 0 15px;
  }
  span {
    color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-shadow: 0 0 0 white;
  }
`;

const Footer = () => (
  <Wrapper>
    <Text>
      <span>
        Notes for Great Good &nbsp;&nbsp;&nbsp;
        <span role="img" aria-label="pawprints">
          🐾
        </span>
        <a href="https://amyshackles.com">Amy Shackles</a>
      </span>
    </Text>
  </Wrapper>
);
export default Footer;
