import React, { useState } from 'react';
import styled from 'styled-components';
import ReadQr from '../ReadQR/ReadQr';
import Navigation from '../../molecules/Navigation/Navigation';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #010d26;
  padding: 15px 50px 50px 50px;
  align-items: center;
`;

const StyledScannerWrapper = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid ${({ theme }) => theme.green};
  border-radius: 5px;
  margin-top: 40px;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 60px;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  background-color: transparent;
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
  const toggleScanning = () => {
    !isScanning && setScannedItemId('');
    setIsScanning(!isScanning);
    setScanError('');
  };

  const getScannedItemId = (id: string) => {
    setScannedItemId(id);
  };
  const handleErr = (err: string) => {
    setScanError(err);
  };

  return (
    <StyledWrapper>
      <Navigation />
      <StyledScannerWrapper>
        {isScanning && (
          <ReadQr
            toggleScanning={toggleScanning}
            getScannedItemId={getScannedItemId}
            handleErr={handleErr}
          />
        )}
      </StyledScannerWrapper>
      <StyledButton onClick={() => toggleScanning()}>
        {isScanning ? 'Wyłącz' : 'Skanuj'}
      </StyledButton>

      <StyledIdLabel className={isScanning ? 'animated' : undefined}>
        {scannedItemId ? scannedItemId : '-------'}
      </StyledIdLabel>

      <StyledError>{scanError ? 'Błąd skanowania' : ''}</StyledError>
    </StyledWrapper>
  );
};

export default ScanItem;
