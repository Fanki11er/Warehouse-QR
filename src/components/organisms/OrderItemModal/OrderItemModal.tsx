import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import { storeItem } from '../../../types/types';
import OrderItemForm from '../../molecules/OrderItemForm/OrderItemForm';
import MenuButton from '../../atoms/MenuButton/MenuButton';

const StyledWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 600px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;
  @media (max-width: 600px) {
    width: 350px;
    padding: 5px;
    min-height: 620px;
  }
`;

const StyledErrorInfo = styled.div`
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.large};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

interface Props {
  isModalOpened: boolean;
  toggleModal: Function;
  item: storeItem | undefined;
}
const OrderItemModal = (props: Props) => {
  const { isModalOpened, toggleModal, item } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper className={'printHide'}>
        {item && <OrderItemForm toggleModal={toggleModal} item={item} />}
        {!item && (
          <StyledFlexWrapper>
            <StyledErrorInfo>Nie znaleziono elementu</StyledErrorInfo>
            <MenuButton onClick={() => toggleModal()}>Close</MenuButton>
          </StyledFlexWrapper>
        )}
      </StyledWrapper>
    </ModalCover>
  );
};

export default OrderItemModal;
