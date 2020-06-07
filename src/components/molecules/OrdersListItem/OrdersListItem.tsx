import React from 'react';
import styled from 'styled-components';
import { Order } from '../../../types/types';

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 3px;
  padding: 10px;
  justify-content: space-between;
`;

const StyledItem = styled.div`
  display: flex;
  min-width: 80%;
  margin-right: 15px;
`;

const StyledQuantity = styled.div`
  display: flex;
  width: 75px;
`;

const StyledExtraInfo = styled.div`
  display: flex;
  width: 100%;
`;

const StyledCounter = styled.div`
  display: flex;
  width: 50px;
  position: absolute;
  top: 0;
  left: -50px;
  justify-content: center;
  height: 100%;
  align-items: center;
`;
interface Props {
  item: Order;
  index: number;
}

const OrdersListItem = (props: Props) => {
  const {
    item: { orderDescription, units, quantity, extraInfo },
    index,
  } = props;
  return (
    <>
      <StyledListItem>
        <StyledCounter>{index + 1}.</StyledCounter>
        <StyledItem>{orderDescription}</StyledItem>
        <StyledQuantity>{`${quantity} ${units}`}</StyledQuantity>
        {extraInfo && <StyledExtraInfo>{extraInfo}</StyledExtraInfo>}
      </StyledListItem>
    </>
  );
};

export default OrdersListItem;
