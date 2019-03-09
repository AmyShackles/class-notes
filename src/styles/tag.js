import styled from 'react-emotion';
import { Link } from 'gatsby';

export const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.white.light};
  padding: 5px 10px;
  border: solid 1px #fff;
  border-radius: 20px;
  &:hover {
    color: ${props => props.theme.colors.black.blue};
    background: ${props => props.theme.colors.white.light};
  }
`;

export const Information = styled.div`
  text-align: center;
  h1 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
`;
