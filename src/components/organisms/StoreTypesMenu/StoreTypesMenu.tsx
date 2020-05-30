import React from 'react';
import { storeType } from '../../../types/types';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import MenuLink from '../../atoms/MenuLink/MenuLink';
import routes from '../../../routes/routes';
import MenuWrapper from '../../atoms/MenuWrapper/MenuWrapper';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';

interface Props {
  availableStores: storeType[];
  baseStatus: boolean;
  toggleModal: Function;
  makeBackup: Function;
}
const StoreTypesMenu = (props: Props) => {
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
  return (
    <MenuWrapper>
      <MenuHeader>Magazyny</MenuHeader>
      {!baseStatus ? (
        <ErrorInfo>
          Łączę
          <LoadingImage customWidth={45} />
        </ErrorInfo>
      ) : (
        renderAvailableStores(availableStores)
      )}
      <MenuButton className={!baseStatus ? 'notActive' : undefined} onClick={() => toggleModal()}>
        Dodaj nowy
      </MenuButton>
      <MenuButton onClick={() => makeBackup()}>Make backup</MenuButton>
    </MenuWrapper>
  );
};

export default StoreTypesMenu;
