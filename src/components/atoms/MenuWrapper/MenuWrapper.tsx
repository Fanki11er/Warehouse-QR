import styled from 'styled-components';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 60vh;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  margin-top: 35px;
  justify-content: space-between;
  padding-bottom: 10px;

  @media (max-width: 560px) {
    height: 50vh;
  }
`;

export default MenuWrapper;
