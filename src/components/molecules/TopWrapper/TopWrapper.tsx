import React from 'react';
import styled from 'styled-components';
import AppLogo from '../../atoms/AppLogo/AppLogo';
import Navigation from '../Navigation/Navigation';

const StyledTopWrapper = styled.div`
  position: sticky;
  top: -10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  z-index: 5;
  box-shadow: 0px 10px 20px ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    top: 0;
    height: 240px;
    width: 100%;
    flex-flow: wrap row;
    justify-content: center;
    align-items: flex-end;
  }
`;

const TopWrapper = () => {
  return (
    <StyledTopWrapper className={'printHide'}>
      <AppLogo />
      <Navigation />
    </StyledTopWrapper>
  );
};

export default TopWrapper;
