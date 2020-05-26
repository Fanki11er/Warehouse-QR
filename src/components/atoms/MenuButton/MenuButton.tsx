import styled from 'styled-components';
import theme from '../../../themes/mainTheme';

interface Props {
  color?: string;
}

const MenuButton = styled.button`
  display: flex;
  width: 180px;
  height: 40px;
  color: ${(props: Props) => (props.color ? props.color : theme.green)};
  border: 2px solid ${(props: Props) => (props.color ? props.color : theme.green)};
  border-radius: 10px;
  background-color: transparent;
  align-self: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  transition: color 0.7s, border 0.7s;

  &:hover {
    color: ${({ theme }) => theme.orange};
    border: 1px solid ${({ theme }) => theme.orange};
    cursor: pointer;
  }

  &.notActive {
    color: ${({ theme }) => theme.gray};
    border: 1px solid ${({ theme }) => theme.gray};
    pointer-events: none;
    cursor: normal;
  }

  @media (max-width: 600px) {
    transform: scale(0.9);
  }
`;

export default MenuButton;
