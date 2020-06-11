import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/firebaseConfig';
import routes from '../../routes/routes';
import UserContext from '../../context/userContext';
import OrderModalContext from '../../context/orderContext';
import StatusInfoContext from '../../context/StatusInfoContext';
import TopWrapper from '../../components/molecules/TopWrapper/TopWrapper';
import ScanItem from '../../components/organisms/ScanItem/ScanItem';
import StoreType from '../../components/organisms/StoreType/StoreType';
import PrintPage from '../../views/PrintPage/PrintPage';
import MainPage from '../../views/mainPage/MainPage';
import LoginModal from '../../components/organisms/LoginModal/LoginModal';
import OrdersPage from '../../views/OrdersPage/OrdersPage';
import OrderItemModal from '../../components/organisms/OrderItemModal/OrderItemModal';
import Footer from '../../components/molecules/Footer/Footer';
import StatusInfoModal from '../../components/molecules/StatusInfoModal/StatusInfoModal';
import { storeItem, StatusInfo } from '../../types/types';

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
  const { scan, store, main, tags, orders } = routes;
  const [isLogInModalOpened, setIsLogInModalOpened] = useState(false);
  const [isOrderModalOpened, setIsOrderModalOpened] = useState(false);
  const [isStatusInfoModalOpened, setIsStatusInfoOpened] = useState(false);
  const [itemToOrder, setItemToOrder] = useState<storeItem | undefined>(undefined);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
  const [statusInfo, setStatusInfo] = useState<StatusInfo>({
    status: '',
    message: '',
  });

  const toggleLogInModal = () => {
    setIsLogInModalOpened(!isLogInModalOpened);
  };

  const toggleOrderModal = (item: storeItem | undefined) => {
    setItemToOrder(item);
    setIsOrderModalOpened(!isOrderModalOpened);
  };

  const getStatusInfo = (status: StatusInfo) => {
    setStatusInfo(status);
  };

  const showStatusModal = () => {
    setIsStatusInfoOpened(true);
    return setTimeout(() => {
      setIsStatusInfoOpened(false);
    }, 1500);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const logOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const listener = statusInfo.status ? showStatusModal() : undefined;
    return () => clearTimeout(listener);
  }, [statusInfo]);

  return (
    <StyledWrapper>
      <StatusInfoModal statusInfo={statusInfo} isModalOpened={isStatusInfoModalOpened} />
      <UserContext.Provider value={user}>
        <StatusInfoContext.Provider value={getStatusInfo}>
          <TopWrapper logOut={logOut} logIn={toggleLogInModal} />
          <OrderModalContext.Provider value={toggleOrderModal}>
            {pathname === scan && <ScanItem />}
            {pathname === store && <StoreType location={location} />}
            {pathname === tags && <PrintPage />}
            {pathname === main && <MainPage />}
            {pathname === orders && <OrdersPage />}
            {pathname !== scan &&
              pathname !== store &&
              pathname !== tags &&
              pathname !== main &&
              pathname !== orders && <ScanItem />}
          </OrderModalContext.Provider>
          <LoginModal isModalOpened={isLogInModalOpened} toggleModal={toggleLogInModal} />
          <OrderItemModal
            isModalOpened={isOrderModalOpened}
            toggleModal={toggleOrderModal}
            item={itemToOrder}
          />
        </StatusInfoContext.Provider>
      </UserContext.Provider>
      <Footer />
    </StyledWrapper>
  );
};

export default MainTemplate;
