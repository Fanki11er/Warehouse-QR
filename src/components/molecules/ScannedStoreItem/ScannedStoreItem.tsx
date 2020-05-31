import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { db } from '../../../firebase/firebaseConfig';
import { storesPath } from '../../../firebase/firebaseEndpoints';
import { storeItem } from '../../../types/types';

interface Props {
  scannedItemId: string;
}

const StyledWrapper = styled.div`
  border: 2px solid
    ${(props: Props) => {
      if (props.scannedItemId) return theme.green;
      return theme.darkGray;
    }};
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 120px;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;

const StyledStoreItem = styled.div`
  width: 100%;
  height: 50%;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  text-align: center;
`;

const StyledErrorInfo = styled.div`
  text-align: center;
  width: 100%;
  height: 50%;
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: space-around;
`;

const StyledItemButton = styled(MenuButton)`
  width: 150px;

  &.notActive {
    color: ${({ theme }) => theme.darkGray};
    border: 1px solid ${({ theme }) => theme.darkGray};
  }
`;

const ScannedStoreItem = (props: Props) => {
  const { scannedItemId } = props;

  const [error, setError] = useState('');
  const [item, setStoreItem] = useState<storeItem | undefined>(undefined);

  const getStoreType = (scannedItemId: string) => {
    const match = /\w{3}[\-]\d+/i.test(scannedItemId);
    if (!match) {
      setError('Nie właściwa forma kodu');
      return '';
    }
    return scannedItemId.slice(0, 3);
  };

  const fetchScannedItem = async (scannedItemId: string) => {
    const storeType = getStoreType(scannedItemId);
    if (storeType) {
      const item = await db
        .ref(storesPath)
        .child(storeType)
        .orderByChild('identifier')
        .equalTo(scannedItemId)
        .once('value');
      const [value]: any = item.val() ? Object.values(item.val()) : [undefined];
      if (value) {
        setStoreItem(value);
        setError('');
      } else {
        setError('Nie znaleziono elementu');
        setStoreItem(undefined);
      }
    }
  };

  useEffect(() => {
    scannedItemId && fetchScannedItem(scannedItemId);
  }, [scannedItemId]);
  return (
    <StyledWrapper scannedItemId={scannedItemId}>
      {error ? (
        <StyledErrorInfo>{error}</StyledErrorInfo>
      ) : (
        <StyledStoreItem>{item ? item.orderDescription : ''}</StyledStoreItem>
      )}

      <StyledButtonsWrapper>
        <StyledItemButton className={scannedItemId ? undefined : 'notActive'}>
          Zamów
        </StyledItemButton>
        <StyledItemButton className={scannedItemId ? undefined : 'notActive'}>
          Zgłoś brak
        </StyledItemButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};

export default ScannedStoreItem;
