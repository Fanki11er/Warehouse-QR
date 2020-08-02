import React, { useContext } from 'react';
import styled from 'styled-components';
import { storeType } from '../../../types/types';
import UserContext from '../../../context/userContext';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import MenuLink from '../../atoms/MenuLink/MenuLink';
import routes from '../../../routes/routes';
import MenuWrapper from '../../atoms/MenuWrapper/MenuWrapper';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';
import DummyButton from '../../atoms/DummyButton/DummyButton';

const StyledMenuButton = styled(MenuButton)`
  margin-bottom: 20px;
`;

interface Props {
  availableStores: storeType[];
  baseStatus: boolean;
  toggleModal: Function;
}
const StoreTypesMenu = (props: Props) => {
  const user = useContext(UserContext);
  const { store } = routes;
  const { availableStores, baseStatus, toggleModal } = props;

  const renderAvailableStores = (availableStores: storeType[]) => {
    return availableStores.length ? (
      availableStores.map((availableStore, index) => {
        return <MenuLink route={store} storeType={availableStore} key={index} />;
      })
    ) : (
      <ErrorInfo>Jeszcze pusto</ErrorInfo>
    );
  };
  const renderButtons = () => (
    <StyledMenuButton
      className={!baseStatus ? 'notActive' : undefined}
      onClick={() => toggleModal()}
    >
      Dodaj nowy
    </StyledMenuButton>
  );

  const renderDummyButtons = () => <DummyButton>Dodaj nowy</DummyButton>;
  return (
    <MenuWrapper className={'withScroll'}>
      <MenuHeader>Magazyny</MenuHeader>
      {user ? renderButtons() : renderDummyButtons()}

      {!baseStatus ? (
        <ErrorInfo>
          Łączę
          <LoadingImage customWidth={45} />
        </ErrorInfo>
      ) : (
        renderAvailableStores(availableStores)
      )}
    </MenuWrapper>
  );
};

export default StoreTypesMenu;
