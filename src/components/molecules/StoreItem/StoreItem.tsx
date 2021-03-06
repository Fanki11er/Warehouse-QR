import React, { useContext } from 'react';
import styled from 'styled-components';
import { storeItem, StatusInfo } from '../../../types/types';
import { Tag } from '../../../classes/classes';
import { DeleteModalContext } from '../../../providers/DeleteModalProvider';
import UserContext from '../../../context/userContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import MenuButton from '../../atoms/MenuButton/MenuButton';

interface StyledProps {
  endOf?: boolean;
}

const StyledListElement = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: space-around;
  justify-content: center;
  min-height: 90px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;
  margin: 10px 10px 0 10px;
  padding: 5px 0;
`;

const StyledItem = styled.div`
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  min-height: 45%;
  border: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  color: ${({ theme }) => theme.primaryBlue};
  text-align: start;
  padding-left: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 1024px) {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
    width: 100%;
    justify-content: space-around;
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 95%;
  justify-content: center;
  align-items: center;
  justify-content: ${(props: StyledProps) => (props.endOf ? 'flex-end' : 'center')};
  @media (max-width: 1024px) {
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
  @media (max-width: 1024px) {
    width: 95px;
    margin: 0 5px;
  }
`;

interface Props {
  item: storeItem;

  actions: {
    orderItem: Function;
    addNewTag: (item: Tag, callback: (x: StatusInfo) => void) => void;
    toggleEditItemModal: (item: storeItem) => void;
    createItemTag: (item: storeItem) => Tag;
  };
}

const StoreItem = (props: Props) => {
  const { item, actions } = props;
  const { orderDescription, catalogNumber } = item;
  const { addNewTag, toggleEditItemModal, orderItem, createItemTag } = actions;
  const user = useContext(UserContext);
  const sendStatusInfo = useContext(StatusInfoContext);
  const { toggleDeleteModal } = useContext(DeleteModalContext);

  const renderAuthenticatedWrapper = () => (
    <StyledButtonsWrapper>
      <StyledButton onClick={() => orderItem(item)}>Zamów</StyledButton>
      <StyledButton
        onClick={() => {
          const newTag = createItemTag(item);
          addNewTag(newTag, sendStatusInfo);
        }}
      >
        Etykieta
      </StyledButton>
      <StyledButton onClick={() => toggleEditItemModal(item)}>Edytuj</StyledButton>
      <StyledButton onClick={() => toggleDeleteModal(item)}>Usuń</StyledButton>
    </StyledButtonsWrapper>
  );

  const renderUnAuthenticatedWrapper = () => (
    <StyledButtonsWrapper>
      <StyledButton>Zgłoś brak</StyledButton>
    </StyledButtonsWrapper>
  );

  return (
    <StyledListElement className={'animateShow'}>
      <StyledItem>{`${orderDescription} ${
        catalogNumber ? `Kat: ${catalogNumber}` : ''
      }`}</StyledItem>
      {user ? renderAuthenticatedWrapper() : renderUnAuthenticatedWrapper()}
    </StyledListElement>
  );
};

export default StoreItem;
