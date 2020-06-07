import React from 'react';
import styled from 'styled-components';
import AppLogo from '../../atoms/AppLogo/AppLogo';
import Navigation from '../Navigation/Navigation';

const StyledTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-flow: wrap row;
    justify-content: center;
  }
`;

interface Props {
  logOut: Function;
  logIn: Function;
}

const TopWrapper = (props: Props) => {
  const { logOut, logIn } = props;
  return (
    <StyledTopWrapper className={'printHide'}>
      <AppLogo />
      <Navigation logOut={logOut} logIn={logIn} />
    </StyledTopWrapper>
  );
};

export default TopWrapper;
