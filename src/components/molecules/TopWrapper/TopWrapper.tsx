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
  user: firebase.UserInfo | null;
  logOut: Function;
  logIn: Function;
}

const TopWrapper = (props: Props) => {
  const { user, logOut, logIn } = props;
  return (
    <StyledTopWrapper className={'printHide'}>
      <AppLogo />
      <Navigation user={user} logOut={logOut} logIn={logIn} />
    </StyledTopWrapper>
  );
};

export default TopWrapper;
