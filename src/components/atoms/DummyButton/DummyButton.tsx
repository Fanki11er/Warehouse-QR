import styled from 'styled-components';

const DummyButton = styled.button`
  display: flex;
  width: 180px;
  height: 50px;
  color: ${({ theme }) => theme.darkGray};
  border: 2px solid ${({ theme }) => theme.darkGray};
  border-radius: 10px;
  background-color: transparent;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  transition: color 0.3s, border 0.3s;
  outline: none;

  &:hover {
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    transform: scale(0.9);
  }
`;

export default DummyButton;
