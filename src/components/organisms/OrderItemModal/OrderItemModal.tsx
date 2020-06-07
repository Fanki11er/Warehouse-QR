import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import { storeItem } from '../../../types/types';
import OrderItemForm from '../../molecules/OrderItemForm/OrderItemForm';

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
      </StyledWrapper>
    </ModalCover>
  );
};

export default OrderItemModal;
