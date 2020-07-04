import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import useGoToTheTop from '../../Hooks/useGoToTheTop';
import { storeTypesPath } from '../../firebase/firebaseEndpoints';
import { storeType } from '../../types/types';
import StoreTypesMenu from '../../components/organisms/StoreTypesMenu/StoreTypesMenu';
import AddStoreModal from '../../components/organisms/AddStoreModal/AddStoreModal';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
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
  const goTop = useGoToTheTop();
  useEffect(() => {
    goTop();
  }, [goTop]);

  useEffect(() => {
    const listener = fetchAvailableStoreTypes(storeTypesPath);
    return () => {
      db.ref(storeTypesPath).off('value', listener);
    };
  }, []);

  return (
    <StyledWrapper>
      <StoreTypesMenu
        availableStores={availableStores}
        baseStatus={isBaseStatus}
        toggleModal={toggleAddStoreModal}
      />
      <AddStoreModal
        isModalOpened={isAddStoreModalOpened}
        toggleModal={toggleAddStoreModal}
        availableStores={availableStores}
      />
    </StyledWrapper>
  );
};

export default MainPage;
