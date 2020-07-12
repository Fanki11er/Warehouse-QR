import styled from 'styled-components';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 450px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  margin-top: 35px;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export default MenuWrapper;
