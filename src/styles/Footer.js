import styled from 'react-emotion';

export const Wrapper = styled.footer`
  padding-top: 15px;
  bottom: 0;
  position: static;
  height: 60px;
  width: 100%;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
`;

export const Text = styled.div`
  margin: 0;
  padding-bottom: 15px;
  text-align: center;
  justify-content: center;
  display: flex;
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
