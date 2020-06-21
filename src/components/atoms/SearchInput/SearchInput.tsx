import styled from 'styled-components';

const SearchInput = styled.input`
  display: flex;

  padding: 2px;
  width: 330px;
  height: 35px;
  border: 2px solid ${({ theme }) => theme.green};
  margin: 0 15px;
  border-radius: 10px;
  color: ${({ theme }) => theme.green};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  caret-color: ${({ theme }) => theme.orange};
  transform: translateX(380px);
  text-align: center;
  user-select: none;
  &::placeholder {
    color: ${({ theme }) => theme.placeholderGreen};
    text-align: center;
  }

  &:focus {
    box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.green};
    outline: none;
  }

  @media (max-width: 1290px) {
    transform: translate(320px);
  }
  @media (max-width: 600px) {
    transform: translateX(0);
    width: 315px;
    align-self: center;
  }
`;

export default SearchInput;
