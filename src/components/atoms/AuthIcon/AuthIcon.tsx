import React from 'react';
import styled from 'styled-components';
import Padlock from '../../../assets/image/Padlock.svg';

const StyledPadlock = styled.img`
  width: 25px;
  height: 25px;
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

const AuthIcon = () => <StyledPadlock src={Padlock} alt={'Padlock'}></StyledPadlock>;

export default AuthIcon;
