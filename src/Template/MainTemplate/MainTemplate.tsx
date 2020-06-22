import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db, dbBackup } from '../../firebase/firebaseConfig';
import { storeItem, StatusInfo, Shortage } from '../../types/types';
import routes from '../../routes/routes';
import { shortagesPath } from '../../firebase/firebaseEndpoints';
import { getData } from '../../tools/tools';
import UserContext from '../../context/userContext';
import DeleteModalProvider from '../../providers/DeleteModalProvider';
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
import UserMenu from '../../components/molecules/UserMenu/UserMenu';
import UserMenuModal from '../../components/molecules/UserMenuModal/UserMenuModal';
import Shortages from '../../views/Shortages/Shortages';
import ShortagesModal from '../../components/organisms/ShortagesModal/ShortagesModal';
import DeleteItemModal from '../../components/organisms/DeleteItemModal/DeleteItemModal';

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
  const { scan, store, main, tags, orders, shortages } = routes;
  const [isLogInModalOpened, setIsLogInModalOpened] = useState(false);
  const [isOrderModalOpened, setIsOrderModalOpened] = useState(false);
  const [isStatusInfoModalOpened, setIsStatusInfoOpened] = useState(false);
  const [isMenuModalOpened, setIsMenuModalOpened] = useState(false);
  const [isShortagesModalOpened, setIsShortagesModalOpened] = useState(false);
  const [isShortage, setIsShortage] = useState(false);
  const [areThereShortages, setAreThereShortages] = useState<boolean | undefined>(undefined);
  const [shortagesList, setShortagesList] = useState<Shortage[]>([]);
  const [itemToOrder, setItemToOrder] = useState<storeItem | undefined>(undefined);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
  const [statusInfo, setStatusInfo] = useState<StatusInfo>({
    status: '',
    message: '',
  });

  const isPathNotExist = (routes: Object, pathName: string): boolean => {
    const notExist = Object.values(routes).findIndex((route) => {
      return route === pathName;
    });
    return notExist < 0 ? true : false;
  };

  const toggleLogInModal = () => {
    setIsLogInModalOpened(!isLogInModalOpened);
  };

  const toggleMenuModal = () => {
    setIsMenuModalOpened(!isMenuModalOpened);
  };

  const toggleOrderModal = (item: storeItem | undefined, shortage?: boolean) => {
    shortage ? setIsShortage(true) : setIsShortage(false);
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

  const makeBackup = async () => {
    const originalBaseStoreTypes = await (await db.ref('QR/StoreTypes').once('value')).val();
    const originalBaseStores = await (await db.ref('QR/Stores').once('value')).val();
    const backup = {
      originalBaseStoreTypes,
      originalBaseStores,
    };
    const stringified: any = JSON.stringify(backup);
    const timestamp = new Date().toLocaleString();
    dbBackup
      .collection('BACKUP')
      .doc()
      .set({ [timestamp]: stringified })
      .then(() => {
        setStatusInfo({
          status: 'ok',
          message: 'KOPIA OK',
        });
      })
      .catch(() => {
        setStatusInfo({
          status: 'error',
          message: 'Błąd',
        });
      });
  };

  useEffect(() => {
    const listener = getData(shortagesPath, setAreThereShortages, setShortagesList);
    return () => db.ref(shortagesPath).off('value', listener);
  }, [user]);

  useEffect(() => {
    shortagesList.length && !areThereShortages
      ? setIsShortagesModalOpened(true)
      : setIsShortagesModalOpened(false);
  }, [shortagesList, areThereShortages]);

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
        <UserMenu isModalOpened={isMenuModalOpened} toggleModal={toggleMenuModal} />

        <StatusInfoContext.Provider value={getStatusInfo}>
          <UserMenuModal
            isModalOpened={isMenuModalOpened}
            logOut={logOut}
            logIn={toggleLogInModal}
            toggleModal={toggleMenuModal}
            makeBackup={makeBackup}
          />
          <DeleteModalProvider>
            <TopWrapper />
            <OrderModalContext.Provider value={toggleOrderModal}>
              {pathname === scan && <ScanItem />}
              {pathname === store && <StoreType location={location} />}
              {pathname === tags && <PrintPage />}
              {pathname === main && <MainPage />}
              {pathname === orders && <OrdersPage />}
              {pathname === shortages && (
                <Shortages shortagesList={shortagesList} isStoreEmpty={areThereShortages} />
              )}
              {isPathNotExist(routes, pathname) && <ScanItem />}
            </OrderModalContext.Provider>
            <LoginModal isModalOpened={isLogInModalOpened} toggleModal={toggleLogInModal} />
            <OrderItemModal
              isModalOpened={isOrderModalOpened}
              toggleModal={toggleOrderModal}
              item={itemToOrder}
              isShortage={isShortage}
            />
            <DeleteItemModal />
          </DeleteModalProvider>
        </StatusInfoContext.Provider>
      </UserContext.Provider>
      {user && shortagesList?.length > 0 && (
        <ShortagesModal
          isModalOpened={isShortagesModalOpened}
          shortagesNumber={shortagesList.length}
        />
      )}
      <Footer />
    </StyledWrapper>
  );
};

export default MainTemplate;
