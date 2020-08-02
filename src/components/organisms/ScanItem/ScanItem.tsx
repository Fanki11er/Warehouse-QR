import React, { useState, RefObject, useEffect, useCallback, useRef } from 'react';
import ScannedStoreItem from '../../molecules/ScannedStoreItem/ScannedStoreItem';
import styled from 'styled-components';
import ReadQr from '../ReadQR/ReadQr';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import useGoToTheTop from '../../../Hooks/useGoToTheTop';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #010d26;
  align-items: center;
`;

const StyledScannerWrapper = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid ${({ theme }) => theme.green};
  border-radius: 5px;
  margin-top: 20px;
`;

const StyledButton = styled(MenuButton)`
  width: 100px;
  height: 60px;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 10%;
  margin: 20px;
`;

const StyledIdLabel = styled.label`
  display: flex;
  width: 150px;
  height: 45px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;
  color: ${({ theme }) => theme.orange};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;

  &.animated {
    animation-name: resize;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }

  @keyframes resize {
    0% {
      letter-spacing: 3px;
    }
    50% {
      letter-spacing: 10px;
    }
    100% {
      letter-spacing: 3px;
    }
  }
`;

const StyledError = styled.label`
  color: ${({ theme }) => theme.lightRed};
  margin: 5px;
`;

const ScanItem = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItemId, setScannedItemId] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const [scrollToPosition, setScrollToPosition] = useState<number>(0);

  const button = useRef<HTMLButtonElement>(null);

  const toggleScanning = () => {
    !isScanning && setScannedItemId('');
    setIsScanning(!isScanning);
    setScanError('');
  };

  const resetScannedItem = () => {
    setScannedItemId('');
  };

  const getScannedItemId = (id: string) => {
    setScannedItemId(id);
  };
  const handleErr = (err: string) => {
    setScanError(err);
  };
  const getPosition = useCallback((element: RefObject<HTMLDivElement | HTMLButtonElement>) => {
    if (element.current) {
      console.log(element);
      setScrollToPosition(element.current.offsetTop - 300);
    }
  }, []);

  const goTop = useGoToTheTop();

  useEffect(() => {
    getPosition(button);
  }, [button, getPosition]);

  useEffect(() => {
    isScanning && goTop();
  }, [isScanning]);

  useEffect(() => {
    scannedItemId &&
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
  }, [scannedItemId]);

  return (
    <StyledWrapper>
      <StyledScannerWrapper>
        {isScanning && (
          <ReadQr
            toggleScanning={toggleScanning}
            getScannedItemId={getScannedItemId}
            handleErr={handleErr}
          />
        )}
      </StyledScannerWrapper>
      <StyledButton onClick={() => toggleScanning()} ref={button}>
        {isScanning ? 'Wyłącz' : 'Skanuj'}
      </StyledButton>

      <StyledIdLabel className={isScanning ? 'animated' : undefined}>
        {scannedItemId ? scannedItemId : '-------'}
      </StyledIdLabel>

      <StyledError>{scanError ? 'Błąd skanowania' : ''}</StyledError>
      <ScannedStoreItem
        scannedItemId={scannedItemId}
        isScanning={isScanning}
        resetScannedItem={resetScannedItem}
      />
    </StyledWrapper>
  );
};

export default ScanItem;
