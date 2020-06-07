import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../../context/userContext';
import { Order } from '../../../types/types';
import OrdersListItem from '../../molecules/OrdersListItem/OrdersListItem';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const StyledHeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
`;

const StyledList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface Props {
  ordersList: Order[];
  startIndex: number;
  deleteOrderItem: (identifier: string, user: firebase.User) => void;
}

const OrdersList = (props: Props) => {
  const user = useContext(UserContext);
  const { ordersList, startIndex, deleteOrderItem } = props;

  const makeUserInfo = (user: firebase.User | null) => {
    const [userInfo] = user ? user.email!.split('@') : [''];
    return userInfo;
  };

  const renderList = (ordersList: Order[]) => {
    return ordersList.map((order: Order, index) => {
      return (
        <OrdersListItem
          item={order}
          key={index}
          index={startIndex + index}
          deleteOrderItem={deleteOrderItem}
        />
      );
    });
  };
  return (
    <StyledWrapper>
      <StyledHeaderSection>
        <StyledHeader>{`Zamówienie: ${makeUserInfo(user)}`}</StyledHeader>
      </StyledHeaderSection>
      <StyledList>
        {ordersList.length ? renderList(ordersList) : <LoadingImage customWidth={85} />}
      </StyledList>
    </StyledWrapper>
  );
};

export default OrdersList;
