import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { storesPath } from '../../../firebase/firebaseEndpoints';
import AppLogo from '../../atoms/AppLogo/AppLogo';
import StoreMenu from '../../molecules/StoreMenu/StoreMenu';
import StoreItemsView from '../StoreItemsView/StoreItemsView';
import AddItemModal from '../AddItemModal/AddItemModal';

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
  justify-content: space-between;
`;
const StyledColumnWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledStoreHeader = styled.div`
  display: flex;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.veryLarge};
  align-self: center;
  justify-self: center;
  text-align: center;
`;
const StyledNavigation = styled.nav`
  width: 100%;
  height: 50px;
`;

interface Props {
  location: any; //! What type is it??
}

const StoreType = (props: Props) => {
  const {
    location: {
      state: { storeType },
    },
  } = props;
  const { name, identifier } = storeType;

  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [itemsList, setItemsList] = useState<storeItem[]>([]);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);

  const toggleAddItemsModal = () => {
    setIsAddItemModalOpened(!isAddItemModalOpened);
  };

  useEffect(() => {
    //!! Info about useCallback
    const loadItemsList = (identifier: string, storesPath: string) => {
      const ref = db.ref(storesPath);
      return ref.child(identifier).on('value', async (snapshot) => {
        const isEmpty =
          isStoreEmpty === undefined ? (await snapshot.val()) === 'EMPTY' : isStoreEmpty;
        setIsStoreEmpty(isEmpty);
        if (!isEmpty) {
          const items = await snapshot.val();

          setItemsList(Object.values(items));
        }
      });
    };
    const listener = loadItemsList(identifier, storesPath);
    return () => db.ref(storesPath).off('value', listener);
  }, [identifier, isStoreEmpty]);

  return (
    <StyledWrapper>
      <StyledFlexWrapper>
        <AppLogo />
        <StyledColumnWrapper>
          <StyledNavigation />
          <StyledStoreHeader>{`Magazyn: ${name}`}</StyledStoreHeader>
        </StyledColumnWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper>
        <StoreMenu toggleModal={toggleAddItemsModal} />
        <StoreItemsView isStoreEmpty={isStoreEmpty!} items={itemsList} />
      </StyledFlexWrapper>
      <AddItemModal
        isModalOpened={isAddItemModalOpened}
        toggleModal={toggleAddItemsModal}
        storeType={identifier}
        itemsList={itemsList}
      />
    </StyledWrapper>
  );
};

export default StoreType;

//const [isAddModalOpened, setModalStatus] = useState(false);

/* const checkIfIsBaseExist = async () => {
    const ref = db.ref();
    ref.once('value', (snapshot) => {
      const exists = snapshot.hasChild('QR');
      !exists && createDatabase();
    });
  };*/

/*const checkIfIsStoreEmpty = () => {
    //!Rename function
    const ref = db.ref('QR');
    ref.child('storesTypes').once('value', (snapshot) => {
      const isEmpty = snapshot.val() === 'EMPTY';
      setIsStoreEmpty(isEmpty);
      //console.log(isEmpty);
    });
  };*/

/*const getNextItemNumber = async (type) => {
    let id;
    return await db.ref('QR/Stores').child(type).orderByKey().limitToLast(1).once('value');
  };*/

/*const increase = (number) => {
    const id = number ? number.replace(/^0+(?!$)/, '') : '000';
    return (Number(id) + 1).toString().padStart(3, '0');
  };*/

/*const addNewItem = async (type) => {
    let item: any[];
    const nextItemNumber = isEmpty ? '001' : (await getNextItemNumber('screws')).val();
    console.log(nextItemNumber);
    item = Object.values(nextItemNumber);
    const [{ id: oldId }] = item;
    //console.log(oldId);

    db.ref('QR/Stores')
      .child(type)
      .push({ name: 'T2', id: increase(oldId) });
  };*/

/*const addButton: button = {
    text: 'Dodaj nowy',
    action: addNewItem,
    isActive: !isStoreEmpty,
  };*/

/*const addNewStore: button = {
    text: 'Utwórz magazyn',
    action: createStore,
    isActive: false,
  };*/
/*useEffect(() => {
    checkIfIsBaseExist();
    checkIfIsStoreEmpty();
    checkIfIsEmpty('screws');
  }, []);*/

/*const { storeType, baseEndpoint } = props;
  const [isStoreEmpty, setIsStoreEmpty] = useState<any>(null); //!
  const [isEmpty, setIsEmpty] = useState>(true); //!*/
