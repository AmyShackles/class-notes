import styled from 'react-emotion';

export const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${props => props.theme.colors.white.light};
  box-shadow: ${props => props.theme.shadow.suggestion};
`;
export const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  h3 {
    font-size: 16px;
  }
`;
