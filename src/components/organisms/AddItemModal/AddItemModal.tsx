import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import { storeItem } from '../../../types/types';
import AddItemForm from '../../molecules/AddItemForm/AddItemForm';

const StyledWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 550px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;
`;
interface Props {
  isModalOpened: boolean;
  toggleModal: Function;
  itemsList: storeItem[];
  storeType: string;
}
const AddItemModal = (props: Props) => {
  const { isModalOpened, toggleModal, itemsList, storeType } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper>
        <AddItemForm toggleModal={toggleModal} itemsList={itemsList} storeType={storeType} />
      </StyledWrapper>
    </ModalCover>
  );
};

export default AddItemModal;