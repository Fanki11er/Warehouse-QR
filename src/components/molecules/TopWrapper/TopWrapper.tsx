import React from 'react';
import styled from 'styled-components';
import AppLogo from '../../atoms/AppLogo/AppLogo';
import Navigation from '../Navigation/Navigation';

const StyledTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-flow: wrap row;
    justify-content: center;
  }
`;

const TopWrapper = () => {
  return (
    <StyledTopWrapper>
      <AppLogo />
      <Navigation />
    </StyledTopWrapper>
  );
};

export default TopWrapper;
