import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import useGoToTheTop from '../../../Hooks/useGoToTheTop';
import UserContext from '../../../context/userContext';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { storeItem } from '../../../types/types';
import { addShortage, fetchItem } from '../../../tools/tools';
import OrderModalContext from '../../../context/orderContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';
import DummyButton from '../../atoms/DummyButton/DummyButton';

interface ThemeProps {
  scannedItemId: string;
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
  min-height: 135px;
  border-radius: 10px;
  margin-top: 15px;
  padding: 5px;
  transition: border 0.5s;
`;

const StyledItemWrapper = styled.div`
  width: 100%;
  min-height: 60px;
`;

const StyledStoreItem = styled.div`
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  color: ${({ theme }) => theme.primaryBlue};
  text-align: center;
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

interface Props {
  isScanning: boolean;
  resetScannedItem: () => void;
}

const ScannedStoreItem = (props: Props & ThemeProps) => {
  const { scannedItemId, isScanning, resetScannedItem } = props;
  const [error, setError] = useState('');
  const [item, setStoreItem] = useState<storeItem | undefined>(undefined);
  const toggleOrderModal = useContext(OrderModalContext);
  const user = useContext(UserContext);
  const sendStatsInfo = useContext(StatusInfoContext);

  const goTop = useGoToTheTop();

  useEffect(() => {
    goTop();
  }, [goTop]);

  useEffect(() => {
    if (isScanning) {
      setError('');
      setStoreItem(undefined);
    }
  }, [isScanning]);

  useEffect(() => {
    if (scannedItemId)
      fetchItem(scannedItemId).then((item) => {
        setStoreItem(item);
      });
    else {
      setStoreItem(undefined);
    }
  }, [scannedItemId]);

  const isValid = (item: storeItem) => {
    const isOk = /^\w{3}-\d{3,4}$/.test(item.identifier);
    console.log(isOk);
    return isOk;
  };

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
    } else if (scannedItemId && item && !isValid(item)) {
      return <StyledStoreItem>{'Nie odpowiedni format kodu'}</StyledStoreItem>;
    }

    return (
      <>
        <StyledStoreItem>{item!.orderDescription} </StyledStoreItem>
        <StyledStoreItem>
          {item!.catalogNumber ? `Kat: ${item!.catalogNumber}` : ''}
        </StyledStoreItem>
      </>
    );
  };

  return (
    <StyledWrapper scannedItemId={scannedItemId}>
      <StyledItemWrapper>{renderItem(error, item)}</StyledItemWrapper>

      <StyledButtonsWrapper>
        {user ? (
          <StyledItemButton
            className={scannedItemId ? undefined : 'notActive'}
            disabled={scannedItemId ? false : true}
            onClick={() => {
              toggleOrderModal(item);
              goTop();
            }}
          >
            Zamów
          </StyledItemButton>
        ) : (
          <DummyButton>Zamów</DummyButton>
        )}
        <StyledItemButton
          className={scannedItemId ? undefined : 'notActive'}
          disabled={scannedItemId ? false : true}
          onClick={() => {
            item &&
              addShortage(
                item.identifier,
                item.orderDescription,
                item.catalogNumber,
                sendStatsInfo,
              ).then(() => {
                goTop();
                resetScannedItem();
              });
          }}
        >
          Zgłoś brak
        </StyledItemButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};

export default ScannedStoreItem;
