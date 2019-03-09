import styled from 'react-emotion';
import { Link } from 'gatsby';

export const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  flex-grow: 0.1;
  justify-content: space-between;
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  font-size: 1.1rem;
  align-self: center;
  height: fit-content;
  a {
    color: ${props => props.theme.colors.white.base};
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.white.grey};
    }
  }
`;
