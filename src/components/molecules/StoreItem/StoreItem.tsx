import React, { useContext } from 'react';
import styled from 'styled-components';
import { storeItem, StatusInfo } from '../../../types/types';
import { DeleteModalContext } from '../../../providers/DeleteModalProvider';
import UserContext from '../../../context/userContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import MenuButton from '../../atoms/MenuButton/MenuButton';

interface StyledProps {
  endOf?: boolean;
}

const StyledListElement = styled.li`
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  min-height: 45px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;
  margin: 10px 10px 0 10px;

  @media (max-width: 600px) {
    width: 100%;
    min-height: 75px;
    align-content: center;
    justify-content: center;
  }
`;

const StyledItem = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
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
    height: 45%;
    justify-content: space-around;
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  justify-content: ${(props: StyledProps) => (props.endOf ? 'flex-end' : 'space-between')};
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

interface Props {
  item: storeItem;

  actions: {
    orderItem: Function;
    addNewTag: (item: storeItem, callback: (x: StatusInfo) => void) => void;
    toggleEditItemModal: (item: storeItem) => void;
  };
}

const StoreItem = (props: Props) => {
  const { item, actions } = props;
  const { orderDescription } = item;
  const { addNewTag, toggleEditItemModal, orderItem } = actions;
  const user = useContext(UserContext);
  const sendStatusInfo = useContext(StatusInfoContext);
  const { toggleDeleteModal } = useContext(DeleteModalContext);

  const renderAuthenticatedWrapper = () => (
    <StyledButtonsWrapper>
      <StyledButton onClick={() => orderItem(item)}>Zamów</StyledButton>
      <StyledButton onClick={() => addNewTag(item, sendStatusInfo)}>Etykieta</StyledButton>
      <StyledButton onClick={() => toggleEditItemModal(item)}>Edytuj</StyledButton>
      <StyledButton onClick={() => toggleDeleteModal(item)}>Usuń</StyledButton>
    </StyledButtonsWrapper>
  );

  const renderUnAuthenticatedWrapper = () => (
    <StyledButtonsWrapper endOf={true}>
      <StyledButton>Zgłoś brak</StyledButton>
    </StyledButtonsWrapper>
  );

  return (
    <StyledListElement className={'animateShow'}>
      <StyledItem>{orderDescription}</StyledItem>
      {user ? renderAuthenticatedWrapper() : renderUnAuthenticatedWrapper()}
    </StyledListElement>
  );
};

export default StoreItem;
