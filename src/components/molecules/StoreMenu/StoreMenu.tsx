import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import UserContext from '../../../context/userContext';
import MenuWrapper from '../../atoms/MenuWrapper/MenuWrapper';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import DummyButton from '../../atoms/DummyButton/DummyButton';

const StyledWrapper = styled(MenuWrapper)`
  min-height: 150px;
  height: 180px;
  justify-content: flex-start;
`;

interface Props {
  toggleModal: Function;
}

const StoreMenu = (props: Props) => {
  const user = useContext(UserContext);
  const { primaryBlue } = theme;
  const { toggleModal } = props;
  return (
    <StyledWrapper>
      <MenuHeader>Akcje</MenuHeader>
      {user ? (
        <MenuButton color={primaryBlue} onClick={() => toggleModal()}>
          Dodaj nowy
        </MenuButton>
      ) : (
        <DummyButton>Dodaj nowy</DummyButton>
      )}
    </StyledWrapper>
  );
};

export default StoreMenu;
