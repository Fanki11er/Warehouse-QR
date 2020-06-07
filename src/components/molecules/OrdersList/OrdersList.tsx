import React from 'react';
import styled from 'styled-components';
import { Order } from '../../../types/types';
import OrdersListItem from '../../molecules/OrdersListItem/OrdersListItem';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 5px 0;
`;

const StyledList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface Props {
  ordersList: Order[];
  startIndex: number;
}

const OrdersList = (props: Props) => {
  const { ordersList, startIndex } = props;

  const renderList = (ordersList: Order[]) => {
    return ordersList.map((order: Order, index) => {
      return <OrdersListItem item={order} key={index} index={startIndex + index} />;
    });
  };
  return (
    <StyledWrapper>
      <StyledHeaderSection>
        <StyledHeader>Zamówienie</StyledHeader>
      </StyledHeaderSection>
      <StyledList>
        {ordersList.length ? renderList(ordersList) : <LoadingImage customWidth={85} />}
      </StyledList>
    </StyledWrapper>
  );
};

export default OrdersList;

/*<StyledInfo>Autor: Krzysztof Dziedzic</StyledInfo> */
