import React from 'react';
import styled from 'styled-components';
import Padlock from '../../../assets/image/Padlock.svg';

const StyledWrapper = styled.div`
  display: flex;
  width: 130px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.darkGray};
  border-radius: 10px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;
const StyledPadlock = styled.img`
  width: 15px;
  transform-origin: 50% 50%;
  animation-name: goRotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;

  @keyframes goRotate {
    to {
      transform: rotateY(360deg);
    }
  }
`;

const AuthIcon = () => (
  <StyledWrapper>
    <StyledPadlock src={Padlock} alt={'Padlock'}></StyledPadlock>
  </StyledWrapper>
);

export default AuthIcon;
