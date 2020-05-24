import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { storeTypesPath } from '../../firebase/firebaseEndpoints';
import { storeType } from '../../types/types';
import AppLogo from '../../components/atoms/AppLogo/AppLogo';
import StoreTypesMenu from '../../components/organisms/StoreTypesMenu/StoreTypesMenu';
import AddStoreModal from '../../components/organisms/AddStoreModal/AddStoreModal';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  padding: 20px 20px 0 20px;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainPage = () => {
  const initialState: storeType[] = [];

  const [availableStores, setAvailableStores] = useState(initialState);
  const [isBaseStatus, setIsBaseStatus] = useState(false);
  const [isAddStoreModalOpened, setIsStoreModalOpened] = useState(false);

  const fetchAvailableStoreTypes = (path: string) => {
    return db.ref(path).on('value', async (snapshot) => {
      const data = await snapshot.val();
      if (!data) {
        setAvailableStores([]);
      } else {
        setAvailableStores(Object.values(data));
        setIsBaseStatus(true);
      }
    });
  };

  const toggleAddStoreModal = () => {
    setIsStoreModalOpened(!isAddStoreModalOpened);
  };

  useEffect(() => {
    const listener = fetchAvailableStoreTypes(storeTypesPath);
    return () => {
      db.ref(storeTypesPath).off('value', listener);
    };
  }, []);
  return (
    <StyledWrapper>
      <StyledFlexWrapper>
        <AppLogo />

        <StoreTypesMenu
          availableStores={availableStores}
          baseStatus={isBaseStatus}
          toggleModal={toggleAddStoreModal}
        />
      </StyledFlexWrapper>
      <AddStoreModal
        isModalOpened={isAddStoreModalOpened}
        toggleModal={toggleAddStoreModal}
        availableStores={availableStores}
      />
    </StyledWrapper>
  );
};

export default MainPage;
