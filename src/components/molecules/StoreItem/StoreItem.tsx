import React from 'react';
import styled from 'styled-components';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { storeItem } from '../../../types/types';

const StyledListElement = styled.li`
  display: flex;
  flex-flow: wrap row;
  width: 720px;
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

const StyledItem = styled.button`
  width: 65%;
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  color: ${({ theme }) => theme.primaryBlue};
  text-align: start;
  padding-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.green};
    background-color: ${({ theme }) => theme.transparentGreen};
    cursor: pointer;
  }

  @media (max-width: 600px) {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
    width: 100%;
    height: 45%;
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-between;
  @media (max-width: 600px) {
    justify-content: space-around;
  }
`;

const StyledButton = styled(MenuButton)`
  color: ${({ theme }) => theme.primaryBlue};
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 5px;
  width: 100px;
  height: 30px;
  margin: 0 10px;
`;

interface Props {
  item: storeItem;

  actions: {
    //order: Function,
    addNewTag: (item: storeItem) => void;
  };
}

const StoreItem = (props: Props) => {
  const { item, actions } = props;
  const { orderDescription } = item;
  const { addNewTag } = actions;
  return (
    <StyledListElement>
      <StyledItem>{orderDescription}</StyledItem>
      <StyledButtonsWrapper>
        <StyledButton>Zamów</StyledButton>
        <StyledButton onClick={(e) => addNewTag(item)}>Etykieta</StyledButton>
      </StyledButtonsWrapper>
    </StyledListElement>
  );
};

export default StoreItem;
