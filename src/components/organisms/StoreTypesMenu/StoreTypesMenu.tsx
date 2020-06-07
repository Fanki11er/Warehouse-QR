import React, { useContext } from 'react';
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

interface Props {
  availableStores: storeType[];
  baseStatus: boolean;
  toggleModal: Function;
  makeBackup: Function;
}
const StoreTypesMenu = (props: Props) => {
  const user = useContext(UserContext);
  const { store } = routes;
  const { availableStores, baseStatus, toggleModal, makeBackup } = props;

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
    <>
      <MenuButton className={!baseStatus ? 'notActive' : undefined} onClick={() => toggleModal()}>
        Dodaj nowy
      </MenuButton>
      <MenuButton onClick={() => makeBackup()}>Kopia zapasowa</MenuButton>
    </>
  );

  const renderDummyButtons = () => (
    <>
      <DummyButton>Dodaj nowy</DummyButton>
      <DummyButton>Kopia Zapasowa</DummyButton>
    </>
  );
  return (
    <MenuWrapper>
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
