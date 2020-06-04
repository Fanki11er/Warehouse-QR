import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/firebaseConfig';
import routes from '../../routes/routes';
import TopWrapper from '../../components/molecules/TopWrapper/TopWrapper';
import ScanItem from '../../components/organisms/ScanItem/ScanItem';
import StoreType from '../../components/organisms/StoreType/StoreType';
import PrintPage from '../../views/PrintPage/PrintPage';
import MainPage from '../../views/mainPage/MainPage';
import LoginModal from '../../components/organisms/LoginModal/LoginModal';

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
  const [isLogInModalOpened, setIsLogInModalOpened] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  const toggleLogInModal = () => {
    setIsLogInModalOpened(!isLogInModalOpened);
    console.log('Toogle');
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const logOut = () => {
    auth.signOut();
  };

  return (
    <StyledWrapper>
      <TopWrapper user={user} logOut={logOut} logIn={toggleLogInModal} />
      {pathname === scan && <ScanItem />}
      {pathname === store && <StoreType location={location} />}
      {pathname === tags && <PrintPage />}
      {pathname === main && <MainPage />}
      {pathname !== scan && pathname !== store && pathname !== tags && pathname !== main && (
        <ScanItem />
      )}
      <LoginModal isModalOpened={isLogInModalOpened} toggleModal={toggleLogInModal} />
    </StyledWrapper>
  );
};

export default MainTemplate;
