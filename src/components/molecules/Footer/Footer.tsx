import React from 'react';
import styled from 'styled-components';
import { appVersion } from '../../../firebase/firebaseConfig';

const StyledWrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 50px 10px 0;

  @media screen and (max-width: 767px) {
    padding-right: 20px;
  }
`;

const StyledAuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAuthor = styled.span`
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.smaller};
  margin: 0;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  }
  @media screen and (max-width: 770px) {
    margin: 0px;
  }
`;

const StyledAppVersion = styled.span`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSizeDesktop.smaller};
  margin: 0px;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeDesktop.smaller};
  }
  @media screen and (max-width: 770px) {
    margin: 0px;
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <StyledWrapper className={'printHide'}>
      <StyledAuthorWrapper>
        <StyledAuthor>{`By KDZ ${year}`}</StyledAuthor>
        <StyledAppVersion>{`ver: ${appVersion}`}</StyledAppVersion>
      </StyledAuthorWrapper>
    </StyledWrapper>
  );
};

export default Footer;
