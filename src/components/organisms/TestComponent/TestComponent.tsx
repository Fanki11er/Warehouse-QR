import React, { useRef } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
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
const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  margin: 20px;
`;

const TestComponent = () => {
  const input = useRef<HTMLInputElement>(null);

  const createQr = (identifier: string): any => {
    return <QRCode value={identifier} renderAs={'svg'} size={50} />;
  };

  return (
    <StyledWrapper>
      <StyledInput type={'text'} ref={input} />
      <StyledButton>Add</StyledButton>
      {createQr('SRU-000')}
      {/*<ReadQr />*/}
    </StyledWrapper>
  );
};

export default TestComponent;
