import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { db } from '../../../firebase/firebaseConfig';
import { storesPath } from '../../../firebase/firebaseEndpoints';
import { storeItem } from '../../../types/types';
import OrderModalContext from '../../../context/orderContext';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';

interface ThemeProps {
  scannedItemId: string;
}

interface Props {
  isScanning: boolean;
}

const StyledWrapper = styled.div`
  border: 2px solid
    ${(props: ThemeProps) => {
      if (props.scannedItemId) return theme.green;
      return theme.darkGray;
    }};
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 135px;
  border-radius: 10px;
  margin-top: 15px;
  padding: 5px;
  transition: border 0.5s;
`;

const StyledItemWrapper = styled.div`
  width: 100%;
  height: 60px;
`;

const StyledStoreItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};

  opacity: 0;
  animation-name: showing;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  @keyframes showing {
    to {
      opacity: 1;
    }
  }
`;

const StyledErrorInfo = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-around;
  align-self: flex-end;
`;

const StyledItemButton = styled(MenuButton)`
  width: 150px;

  &.notActive {
    color: ${({ theme }) => theme.darkGray};
    border: 1px solid ${({ theme }) => theme.darkGray};
  }
`;

const StyledLoadingInfo = styled.div`
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  margin: 0 5px;
`;
const StyledInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScannedStoreItem = (props: Props & ThemeProps) => {
  const { scannedItemId, isScanning } = props;
  const toggleOrderModal = useContext(OrderModalContext);
  const [error, setError] = useState('');
  const [item, setStoreItem] = useState<storeItem | undefined>(undefined);

  const getStoreType = (scannedItemId: string) => {
    const match = /\w{3}[-]\d+/i.test(scannedItemId);
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
    if (isScanning) {
      setError('');
      setStoreItem(undefined);
    }
  }, [isScanning]);

  useEffect(() => {
    if (scannedItemId) fetchScannedItem(scannedItemId);
  }, [scannedItemId]);

  const renderItem = (error: string, item: storeItem | undefined) => {
    if (error) {
      return <StyledErrorInfo>{error}</StyledErrorInfo>;
    } else if (scannedItemId && !item) {
      return (
        <StyledInfoWrapper>
          <LoadingImage customWidth={30} />
          <StyledLoadingInfo>Ładuję</StyledLoadingInfo>
        </StyledInfoWrapper>
      );
    } else if (!scannedItemId && !item) {
      return <StyledStoreItem>{''}</StyledStoreItem>;
    }
    return <StyledStoreItem>{item!.orderDescription}</StyledStoreItem>;
  };
  return (
    <StyledWrapper scannedItemId={scannedItemId}>
      <StyledItemWrapper>{renderItem(error, item)}</StyledItemWrapper>

      <StyledButtonsWrapper>
        <StyledItemButton
          className={scannedItemId ? undefined : 'notActive'}
          onClick={() => toggleOrderModal(item)}
        >
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
