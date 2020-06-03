import React from 'react';
import styled from 'styled-components';
import routes from '../../routes/routes';
import TopWrapper from '../../components/molecules/TopWrapper/TopWrapper';
import ScanItem from '../../components/organisms/ScanItem/ScanItem';
import StoreType from '../../components/organisms/StoreType/StoreType';
import PrintPage from '../../views/PrintPage/PrintPage';
import MainPage from '../../views/mainPage/MainPage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  padding: 20px 20px 0 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainTemplate = ({ location }) => {
  const { pathname } = location;
  const { scan, store, main, tags } = routes;
  console.log(pathname);

  return (
    <StyledWrapper>
      <TopWrapper />
      {pathname === scan && <ScanItem />}
      {pathname === store && <StoreType location={location} />}
      {pathname === tags && <PrintPage />}
      {pathname === main && <MainPage />}
    </StyledWrapper>
  );
};

export default MainTemplate;
