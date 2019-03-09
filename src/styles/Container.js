import styled from 'react-emotion';

export const Wrapper = styled.section`
  text-align: ${props => (props.center ? 'center' : '')};
  margin: auto;
  padding: 3rem 1.5rem;
  width: 60%;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 90%;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    width: 95%;
  }
  max-width: ${props => props.theme.layout[props.type]};
  height: 100%;
  flex: 1;
`;
