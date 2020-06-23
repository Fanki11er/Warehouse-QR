import React, { useContext } from 'react';
import styled from 'styled-components';
import { Shortage } from '../../../types/types';
import { fetchItem, deleteShortage } from '../../../tools/tools';
import UserContext from '../../../context/userContext';
import OrderContext from '../../../context/orderContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import MenuButton from '../../atoms/MenuButton/MenuButton';

const StyledListElement = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 120px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;
  margin: 10px 10px 0 10px;
  padding: 5px;

  @media (max-width: 600px) {
    width: 100%;
    min-height: 75px;
    align-content: center;
    justify-content: center;
  }
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;
  border: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  color: ${({ theme }) => theme.primaryBlue};
  text-align: start;
  padding-left: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
    width: 100%;
    height: 65%;
    justify-content: space-around;
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 600px) {
    justify-content: center;
    width: 95%;
  }
`;

const StyledButton = styled(MenuButton)`
  color: ${({ theme }) => theme.primaryBlue};
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 5px;
  width: 100px;
  height: 30px;
  margin: 0 10px;
  @media (max-width: 600px) {
    width: 95px;
    margin: 0 5px;
  }
`;

const StyledDate = styled.div`
  color: ${({ theme }) => theme.green};
  margin-left: 5px;
`;

interface Props {
  item: Shortage;
}

const ShortageItem = (props: Props) => {
  const { item } = props;
  const { orderDescription, itemIdentifier, date, catalogNumber } = item;
  const user = useContext(UserContext);
  const orderItem = useContext(OrderContext);
  const sendStatusInfo = useContext(StatusInfoContext);

  const renderAuthenticatedWrapper = () => (
    <StyledButtonsWrapper>
      <StyledButton
        onClick={() => {
          fetchItem(itemIdentifier).then((item) => {
            orderItem(item, true);
          });
        }}
      >
        Zamów
      </StyledButton>

      <StyledButton onClick={() => deleteShortage(itemIdentifier, sendStatusInfo)}>
        Usuń
      </StyledButton>
    </StyledButtonsWrapper>
  );

  return (
    <StyledListElement className={'animateShow'}>
      <StyledItem>
        {`${orderDescription} ${catalogNumber ? `Kat: ${catalogNumber}` : ''}`}
        <StyledDate>{date}</StyledDate>
      </StyledItem>
      {user && renderAuthenticatedWrapper()}
    </StyledListElement>
  );
};

export default ShortageItem;
