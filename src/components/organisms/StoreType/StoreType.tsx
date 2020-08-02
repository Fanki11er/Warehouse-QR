import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { storesPath } from '../../../firebase/firebaseEndpoints';
import { checkIfIsStoreEmpty } from '../../../tools/tools';
import StoreMenu from '../../molecules/StoreMenu/StoreMenu';
import StoreItemsView from '../StoreItemsView/StoreItemsView';
import AddItemModal from '../AddItemModal/AddItemModal';
import EditItemModal from '../EditItemModal/EditItemModal';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import useGoToTheTop from '../../../Hooks/useGoToTheTop';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
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

const StyledMenu = styled(StoreMenu)`
  width: 150px;
  min-height: 300px;
`;
interface Props {
  location: any; //! What type is it??
}

const StoreType = (props: Props) => {
  const storeType = props.location.state
    ? props.location.state.storeType
    : { name: '', identifier: '', defaultItemName: '' };
  const { name, identifier, defaultItemName } = storeType;
  const filterInput = useRef<HTMLInputElement>(null);
  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [itemsList, setItemsList] = useState<storeItem[]>([]);
  const [filteredItemsList, setFilteredItemsList] = useState<storeItem[]>([]);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [isEditItemModalOpened, setIsEditItemModalOpened] = useState(false);
  const [isSortByName, setSortByName] = useState(false);
  const [itemToEdition, setItemToEdition] = useState<storeItem | null>(null);
  const toggleAddItemsModal = () => {
    setIsAddItemModalOpened(!isAddItemModalOpened);
  };

  const toggleEditItemModal = async (item: storeItem) => {
    setItemToEdition(item);
    setIsEditItemModalOpened(!isEditItemModalOpened);
  };

  const toggleSortType = () => {
    setSortByName(!isSortByName);
  };

  const goTop = useGoToTheTop();
  useEffect(() => {
    goTop();
  }, [goTop]);

  useEffect(() => {
    filterItems(itemsList);
  }, [itemsList]);

  useEffect(() => {
    if (!identifier) return;
    const loadItemsList = (identifier: string, storesPath: string) => {
      const ref = db.ref(storesPath);
      return ref.child(identifier).on('value', async (snapshot) => {
        const isEmpty = await checkIfIsStoreEmpty(snapshot);

        setIsStoreEmpty(isEmpty);
        if (!isEmpty) {
          const items = await snapshot.val();

          items ? setItemsList(Object.values(items)) : setItemsList([]);
        } else setItemsList([]);
      });
    };
    const listener = loadItemsList(identifier, storesPath);
    return () => db.ref(storesPath).off('value', listener);
  }, [identifier, isStoreEmpty]);

  const filterItems = (itemsList: storeItem[]) => {
    if (filterInput.current) {
      const filteredList = itemsList.length
        ? itemsList.filter(({ orderDescription, catalogNumber }) => {
            return `${orderDescription} ${catalogNumber}`
              .toLowerCase()
              .includes(filterInput.current!.value.toLowerCase());
          })
        : [];
      setFilteredItemsList(filteredList);
    }
    return [];
  };

  return (
    <StyledWrapper>
      <StyledStoreHeader>{`Magazyn: ${name}`}</StyledStoreHeader>
      <SearchInput
        type="text"
        placeholder={'Filtruj'}
        ref={filterInput}
        onKeyUp={() => filterItems(itemsList)}
      />
      <StyledFlexWrapper>
        <StyledMenu
          toggleModal={toggleAddItemsModal}
          toggleSortType={toggleSortType}
          isSortByName={isSortByName}
        />
        <StoreItemsView
          sortByName={isSortByName}
          isStoreEmpty={isStoreEmpty!}
          items={filterInput.current?.value ? filteredItemsList : itemsList}
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
