import React, { useState } from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';

const StyledWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #010d26;
`;

const StyledP = styled.p`
  margin-top: 150px;
  font-size: 40px;
  color: white;
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

const ReadQr = () => {
  const [data, setData] = useState('Empty');
  const [status, setStatus] = useState('OK');
  const [legacyMode, setMode] = useState(true);

  const handleErr = (err) => {
    setStatus(err);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result);
      setMode(false);
    }
  };

  const previewStyle = {
    height: 300,
    width: 300,
  };

  return (
    <StyledWrapper>
      {legacyMode && (
        <QrReader delay={200} onError={handleErr} onScan={handleScan} style={previewStyle} />
      )}
      <StyledP>{data}</StyledP>

      <StyledButton onClick={() => setMode(!legacyMode)}>Set mode</StyledButton>
    </StyledWrapper>
  );
};

export default ReadQr;
