import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import UserContext from '../../../context/userContext';
import MenuWrapper from '../../atoms/MenuWrapper/MenuWrapper';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import DummyButton from '../../atoms/DummyButton/DummyButton';

const StyledWrapper = styled(MenuWrapper)`
  min-height: 180px;
  height: 180px;
  justify-content: space-between;
  min-width: 300px;
  @media (max-width: 560px) {
    height: inherit;
  }
`;

interface Props {
  toggleModal: Function;
  toggleSortType: () => void;
  isSortByName: boolean;
}

const StoreMenu = (props: Props) => {
  const user = useContext(UserContext);
  const { primaryBlue } = theme;
  const { toggleModal, toggleSortType, isSortByName } = props;

  return (
    <StyledWrapper>
      <MenuHeader>Akcje</MenuHeader>
      {user ? (
        <>
          <MenuButton color={primaryBlue} onClick={() => toggleModal()}>
            Dodaj nowy
          </MenuButton>
          <MenuButton color={primaryBlue} onClick={() => toggleSortType()}>{`Sortuj: ${
            isSortByName ? 'Nazwy' : 'Kolejność'
          }`}</MenuButton>
        </>
      ) : (
        <>
          <DummyButton>Dodaj nowy</DummyButton>
          <DummyButton>Sortuj: Nazwa</DummyButton>
        </>
      )}
    </StyledWrapper>
  );
};

export default StoreMenu;
