import React, { useContext } from 'react';
import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/';
import UserContext from '../../../context/userContext';
import mainTheme from '../../../themes/mainTheme';
import MenuButton from '../../atoms/MenuButton/MenuButton';

interface ModalProps {
  isModalOpened: boolean;
}

const StyledCloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme.lightRed};
    border: 2px solid ${({ theme }) => theme.lightRed};
    border-radius: 10px;
    box-shadow: 0 0 5px 1px ${({ theme }) => theme.lightRed};
    cursor: pointer;
  }
`;

const StyledCloseIcon = styled(Close)`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.lightRed};
`;

const StyledWrapper = styled.div`
  padding: 20px 0;
  justify-content: flex-end;
  position: fixed;
  top: 15px;
  right: 5px;
  transform: ${(props: ModalProps) =>
    props.isModalOpened === true ? 'translateX(0)' : 'translateX(500px)'};
  transition: transform 0.6s;
  z-index: 8;
  width: 230px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
`;

interface Props {
  logIn: Function;
  logOut: Function;
  toggleModal: Function;
}

const UserMenuModal = (props: Props & ModalProps) => {
  const { isModalOpened, logIn, logOut, toggleModal } = props;
  const user = useContext(UserContext);
  return (
    <StyledWrapper isModalOpened={isModalOpened} className={'printHide'}>
      <StyledCloseButton onClick={() => toggleModal()}>
        <StyledCloseIcon />
      </StyledCloseButton>
      {user === null && (
        <MenuButton
          onClick={() => {
            toggleModal();
            logIn();
          }}
        >
          Zaloguj
        </MenuButton>
      )}
      {user && (
        <MenuButton
          onClick={() => {
            toggleModal();
            logOut();
          }}
          color={mainTheme.lightRed}
        >
          Wyloguj
        </MenuButton>
      )}
    </StyledWrapper>
  );
};

export default UserMenuModal;
