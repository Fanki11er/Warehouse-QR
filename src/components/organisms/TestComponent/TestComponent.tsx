import React, { useState } from 'react';
import styled from 'styled-components';
import ReadQr from '../ReadQR/ReadQr';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #010d26;
  padding: 50px;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 60px;
  color: white;
  background-color: black;
  border: 2px solid white;
  border-radius: 10%;
  margin: 20px;
`;

const TestComponent = () => {
  const [isScanning, setIsScanning] = useState(false);
  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  return (
    <StyledWrapper>
      {isScanning && <ReadQr toggleScanning={toggleScanning} />}
      <StyledButton onClick={() => toggleScanning()}>Scan</StyledButton>
    </StyledWrapper>
  );
};

export default TestComponent;
