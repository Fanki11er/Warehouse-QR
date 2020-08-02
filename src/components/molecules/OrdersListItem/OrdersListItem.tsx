import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../../context/userContext';
import { Order } from '../../../types/types';

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid black;
  margin-bottom: 3px;
  padding: 10px;
  justify-content: space-between;
  &:hover {
    border: 2px solid ${({ theme }) => theme.lightRed};
    background-color: ${({ theme }) => theme.transparentRed};
    cursor: pointer;
  }
  letter-spacing: 1px;
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
  deleteOrderItem: (identifier: string, user: firebase.User) => void;
}

const OrdersListItem = (props: Props) => {
  const {
    item: { orderDescription, units, quantity, extraInfo, itemIdentifier },
    index,
    deleteOrderItem,
  } = props;
  const user = useContext(UserContext);
  return (
    <>
      <StyledListItem
        onClick={() => user && deleteOrderItem(itemIdentifier, user)}
        className={'animateShow'}
      >
        <StyledCounter>{index + 1}.</StyledCounter>
        <StyledItem>{orderDescription}</StyledItem>
        <StyledQuantity>{`${quantity} ${units}`}</StyledQuantity>
        {extraInfo && <StyledExtraInfo>{extraInfo}</StyledExtraInfo>}
      </StyledListItem>
    </>
  );
};

export default OrdersListItem;
