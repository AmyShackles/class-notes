import React from 'react';
import styled, { keyframes } from 'react-emotion';

const reverseRave = keyframes`
  0% {
    color: violet;
  }
  14% {
    color: indigo;
  }
  28% {
    color: blue;
  }
  42% {
    color: green;
  }
  56% {
    color: yellow;
  }
  70% {
    color: orange;
  }
  84% {
    color: red;
  }
`;

const Wrapper = styled.footer`
  padding-top: 15px;
  bottom: 0;
  position: static;
  width: 100%;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
`;

const Text = styled.div`
  margin: 0;
  padding-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.white.light};
  a {
    animation: ${reverseRave} 1.5s alternate infinite;
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
