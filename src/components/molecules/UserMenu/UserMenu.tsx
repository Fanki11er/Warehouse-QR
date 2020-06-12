import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserDetail } from '@styled-icons/boxicons-solid/';
import UserContext from '../../../context/userContext';
import AuthIcon from '../../atoms/AuthIcon/AuthIcon';
import theme from '../../../themes/mainTheme';

interface IconProps {
  logged: boolean;
}
const StyledUserIcon = styled(UserDetail)`
  opacity: 0;
  width: 35px;
  height: 35px;
  color: ${(props: IconProps) => (props.logged ? theme.green : theme.lightRed)};
  animation-name: show;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  @keyframes show {
    to {
      opacity: 1;
    }
  }
`;

const StyledTopListElement = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MenuButtonProps {
  isModalOpened: boolean;
}

const StyledButton = styled.button`
  opacity: ${(props: MenuButtonProps) => (props.isModalOpened ? '0' : '1')};
  user-select: none;
  pointer-events: ${(props: MenuButtonProps) => (props.isModalOpened ? 'none' : '')};
  position: sticky;
  top: 20px;
  align-self: flex-end;
  width: 115px;
  height: 45px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 10px;
  padding: 0;
  background-color: ${({ theme }) => theme.primary};
  z-index: 10;
  transform: ${(props: MenuButtonProps) =>
    props.isModalOpened === true ? 'translateX(-25px)' : 'translateX(0)'};
  transition: transform 0.6s, opacity 0.6s;
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.orange};
    border: 2px solid ${({ theme }) => theme.orange};
    box-shadow: 0 0 5px 1px ${({ theme }) => theme.orange};
    cursor: pointer;
  }
`;
interface Props {
  toggleModal: Function;
}

const UserMenu = (props: MenuButtonProps & Props) => {
  const { isModalOpened, toggleModal } = props;
  const user = useContext(UserContext);
  return (
    <StyledButton
      isModalOpened={isModalOpened}
      onClick={() => toggleModal()}
      className={'printHide'}
    >
      <StyledTopListElement>
        {user === undefined && <AuthIcon />}
        {user === null && <StyledUserIcon logged={false} />}
        {user && <StyledUserIcon logged={true} />}
      </StyledTopListElement>
    </StyledButton>
  );
};

export default UserMenu;
