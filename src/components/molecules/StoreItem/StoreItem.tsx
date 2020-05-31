import React from 'react';
import styled from 'styled-components';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { storeItem } from '../../../types/types';

const StyledListElement = styled.li`
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  min-height: 45px;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;
  margin: 10px 10px 0 10px;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 100%;
    min-height: 75px;
    align-content: center;
    justify-content: center;
  }
`;

const StyledItem = styled.div`
  width: 55%;
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  color: ${({ theme }) => theme.primaryBlue};
  text-align: start;
  padding-left: 10px;

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
  @media (max-width: 600px) {
    justify-content: space-around;
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
    width: 90px;
    margin: 0 5px;
  }
`;

interface Props {
  item: storeItem;

  actions: {
    //order: Function,
    addNewTag: (item: storeItem) => void;
    toggleEditItemModal: (item: storeItem) => void;
  };
}

const StoreItem = (props: Props) => {
  const { item, actions } = props;
  const { orderDescription } = item;
  const { addNewTag, toggleEditItemModal } = actions;
  return (
    <StyledListElement>
      <StyledItem>{orderDescription}</StyledItem>
      <StyledButtonsWrapper>
        <StyledButton>Zamów</StyledButton>
        <StyledButton onClick={() => addNewTag(item)}>Etykieta</StyledButton>
        <StyledButton onClick={() => toggleEditItemModal(item)}>Edytuj</StyledButton>
        <StyledButton>Usuń</StyledButton>
      </StyledButtonsWrapper>
    </StyledListElement>
  );
};

export default StoreItem;
