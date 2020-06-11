import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import routes from '../../routes/routes';
import { db } from '../../firebase/firebaseConfig';
import { checkIfIsStoreEmpty, getOrderKey } from '../../tools/tools';
import { ordersPath, baseBranches } from '../../firebase/firebaseEndpoints';
import userContext from '../../context/userContext';
import StatusInfoContext from '../../context/StatusInfoContext';
import { Order } from '../../types/types';
import ErrorInfo from '../../components/atoms/ErrorInfo/ErrorInfo';
import MenuButton from '../../components/atoms/MenuButton/MenuButton';
import OrdersList from '../../components/molecules/OrdersList/OrdersList';

const StyledWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
`;

const StyledPage = styled.div`
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  margin: 30px;
  width: 180mm;
  height: 275mm;
  background-color: #ddd;
  padding: 30px;
  @media (max-width: 600px) {
    height: 277mm;
    transform: scale(0.5);
    margin: -220px 20px;
    padding: 25px 0;
  }
`;

const StyledErrorInfo = styled(ErrorInfo)`
  color: black;
  margin: 30px 0;
`;

const StyledMenuButton = styled(MenuButton)`
  color: ${({ theme }) => theme.lightRed};
  border: 2px solid ${({ theme }) => theme.lightRed};
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  margin: 45px 0 0 0;
  width: 500px;
  justify-content: space-around;

  @media (max-width: 600px) {
    width: 350px;
  }
`;

const OrdersPage = () => {
  const { scan } = routes;
  const user = useContext(userContext);
  const sendStatusInfo = useContext(StatusInfoContext);
  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [ordersList, setOrdersList] = useState([]);
  const [pagesList, setPagesList] = useState<Array<Order[]>>([]);
  const [printer, setPrinter] = useState(true);

  useEffect(() => {
    //!! Info about useCallback
    const loadItemsList = (ordersPath: string, user: firebase.User) => {
      return db
        .ref(ordersPath)
        .child(user.uid)
        .on('value', async (snapshot) => {
          const isEmpty = await checkIfIsStoreEmpty(snapshot);

          setIsStoreEmpty(isEmpty);
          if (!isEmpty) {
            const items = await snapshot.val();

            items ? setOrdersList(Object.values(items)) : setOrdersList([]);
          }
        });
    };

    const listener = user ? loadItemsList(ordersPath, user) : undefined;
    return () => db.ref(ordersPath).off('value', listener);
  }, [user]);

  useEffect(() => {
    ordersList.length ? setPagesList(spliceForPages(ordersList)) : setPagesList(spliceForPages([]));
  }, [ordersList]);

  const changePrinter = () => {
    setPrinter(!printer);
  };

  const sortOrdersList = (ordersList: Order[]) => {
    return ordersList.sort((a: Order, b: Order) => {
      const aIdentifier = a.itemIdentifier.substr(0, 3);
      const bIdentifier = b.itemIdentifier.substr(0, 3);
      if (aIdentifier > bIdentifier) return 1;
      else if (aIdentifier < bIdentifier) return -1;
      else {
        if (a.orderDescription > b.orderDescription) {
          return 1;
        } else if (a.orderDescription < b.orderDescription) {
          return -1;
        }
        return 0;
      }
    });
  };

  const spliceForPages = (ordersList: Order[]): Array<Order>[] => {
    const list = sortOrdersList([...ordersList]);

    const check = (list: Order[]) => {
      let counter = 0;
      let isLargeItem = 0;
      while (counter < 20 && counter < list.length) {
        isLargeItem = list[counter].extraInfo ? (isLargeItem += 1) : isLargeItem;
        counter += 1;
      }
      return isLargeItem ? Number((isLargeItem / 2).toFixed(0)) + 1 : 0;
    };
    const pages: Array<Order>[] = [];
    do {
      const limit = 20 - check(list);
      const page = list.splice(0, limit);
      pages.push(page);
    } while (list.length > 0);
    return pages;
  };

  const deleteOrderItem = async (identifier: string, user: firebase.User) => {
    const tagKey = await getOrderKey(identifier, user);
    tagKey &&
      db
        .ref('QR/')
        .child(`${baseBranches.ordersBranch}${user.uid}`)
        .update({ [tagKey]: null })
        .then(() => {
          sendStatusInfo({
            status: 'ok',
            message: 'Usunięto',
          });
        })
        .catch(() => {
          sendStatusInfo({
            status: 'error',
            message: 'Nie usunięto',
          });
        });
  };

  const resetOrdersList = (user: firebase.User) => {
    db.ref('QR/')
      .child(`${baseBranches.ordersBranch}/${user.uid}`)
      .set('EMPTY')
      .then(() => {
        sendStatusInfo({
          status: 'ok',
          message: 'Zresetowano',
        });
      })
      .catch(() => {
        sendStatusInfo({
          status: 'error',
          message: 'Nie zresetowano',
        });
      });
  };

  const renderPages = (pagesList: Array<Order>[]) => {
    return (
      pagesList.length &&
      pagesList.map((page, index, arr) => {
        let startIndex = 0;
        if (index) startIndex = arr[index - 1].length;
        return (
          <StyledPage className={printer ? 'pagePrinter' : 'pagePdf'} key={index}>
            <OrdersList
              ordersList={page}
              startIndex={startIndex}
              deleteOrderItem={deleteOrderItem}
            />
          </StyledPage>
        );
      })
    );
  };
  if (!user?.uid) return <Redirect to={scan} />;

  return (
    <StyledWrapper>
      <StyledButtonsWrapper className={'printHide'}>
        <MenuButton onClick={() => changePrinter()}>{printer ? 'PDF' : 'DRUKARKA'}</MenuButton>
        <StyledMenuButton onClick={() => user && resetOrdersList(user)}>Resetuj</StyledMenuButton>
      </StyledButtonsWrapper>
      {!isStoreEmpty && user ? (
        renderPages(pagesList)
      ) : (
        <StyledPage>
          {user ? (
            <StyledErrorInfo>Brak elementów do wyświetlenia</StyledErrorInfo>
          ) : (
            <StyledErrorInfo>Brak uprawnień</StyledErrorInfo>
          )}
        </StyledPage>
      )}
    </StyledWrapper>
  );
};
export default OrdersPage;
