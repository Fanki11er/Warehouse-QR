import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { storeItem, Shortage } from '../../types/types';
import { db } from '../../firebase/firebaseConfig';
import { shortagesPath } from '../../firebase/firebaseEndpoints';
import { getData } from '../../tools/tools';
import UserContext from '../../context/userContext';
import ItemShortages from '../../components/organisms/ItemShortages/ItemShortages';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
  align-items: center;
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

interface Props {}

const Shortages = (props: Props) => {
  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [itemsList, setItemsList] = useState<Shortage[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const listener = getData(shortagesPath, setIsStoreEmpty, setItemsList);
    return () => db.ref(shortagesPath).off('value', listener);
  }, [user]);

  return (
    <StyledWrapper>
      <StyledStoreHeader>Braki</StyledStoreHeader>
      <ItemShortages items={itemsList} isStoreEmpty={isStoreEmpty} />
      <StyledFlexWrapper></StyledFlexWrapper>
    </StyledWrapper>
  );
};

export default Shortages;
