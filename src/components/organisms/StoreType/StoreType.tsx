import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { storesPath } from '../../../firebase/firebaseEndpoints';
import { checkIfIsStoreEmpty } from '../../../tools/tools';
import StoreMenu from '../../molecules/StoreMenu/StoreMenu';
import StoreItemsView from '../StoreItemsView/StoreItemsView';
import AddItemModal from '../AddItemModal/AddItemModal';
import EditItemModal from '../EditItemModal/EditItemModal';

import TopWrapper from '../../molecules/TopWrapper/TopWrapper';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
  padding: 15px;
`;
const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledStoreHeader = styled.div`
  display: flex;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.veryLarge};
  align-self: center;
  justify-self: center;
  text-align: center;
  margin: 30px;
  @media (max-width: 600px) {
    margin: 20px;
  }
`;

interface Props {
  location: any; //! What type is it??
}

const StoreType = (props: Props) => {
  const storeType = props.location.state
    ? props.location.state.storeType
    : { name: '', identifier: '', defaultItemName: '' };
  const { name, identifier, defaultItemName } = storeType;
  console.log(storeType.defaultItemName);

  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [itemsList, setItemsList] = useState<storeItem[]>([]);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [isEditItemModalOpened, setIsEditItemModalOpened] = useState(false);
  const [itemToEdition, setItemToEdition] = useState<storeItem | null>(null);

  const toggleAddItemsModal = () => {
    setIsAddItemModalOpened(!isAddItemModalOpened);
  };

  const toggleEditItemModal = async (item: storeItem) => {
    setItemToEdition(item);
    setIsEditItemModalOpened(!isEditItemModalOpened);
  };

  useEffect(() => {
    if (!identifier) return;
    //!! Info about useCallback
    const loadItemsList = (identifier: string, storesPath: string) => {
      const ref = db.ref(storesPath);
      return ref.child(identifier).on('value', async (snapshot) => {
        const isEmpty = await checkIfIsStoreEmpty(snapshot);

        setIsStoreEmpty(isEmpty);
        if (!isEmpty) {
          const items = await snapshot.val();

          items ? setItemsList(Object.values(items)) : setItemsList([]);
        }
      });
    };
    const listener = loadItemsList(identifier, storesPath);
    return () => db.ref(storesPath).off('value', listener);
  }, [identifier, isStoreEmpty]);

  return (
    <StyledWrapper>
      <TopWrapper />
      <StyledStoreHeader>{`Magazyn: ${name}`}</StyledStoreHeader>

      <StyledFlexWrapper>
        <StoreMenu toggleModal={toggleAddItemsModal} />
        <StoreItemsView
          isStoreEmpty={isStoreEmpty!}
          items={itemsList}
          toggleEditItemModal={toggleEditItemModal}
        />
      </StyledFlexWrapper>
      <AddItemModal
        isModalOpened={isAddItemModalOpened}
        toggleModal={toggleAddItemsModal}
        storeType={identifier}
        defaultItemName={defaultItemName}
        itemsList={itemsList}
      />

      <EditItemModal
        toggleModal={toggleEditItemModal}
        isModalOpened={isEditItemModalOpened}
        item={itemToEdition}
      />
    </StyledWrapper>
  );
};

export default StoreType;
