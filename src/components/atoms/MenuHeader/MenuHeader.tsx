import styled from 'styled-components';

const MenuHeader = styled.div`
  display: flex;
  align-self: center;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.large};
  margin: 10px;
`;

export default MenuHeader;
