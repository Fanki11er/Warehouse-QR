import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import { storeItem } from '../../../types/types';
import AddItemForm from '../../molecules/AddItemForm/AddItemForm';

const StyledWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 600px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;

  @media (max-width: 1290px) {
    transform: scale(0.9);
  }

  @media (max-width: 600px) {
    width: 350px;
    padding: 5px;
    min-height: 620px;
  }
`;
interface Props {
  isModalOpened: boolean;
  toggleModal: Function;
  itemsList: storeItem[];
  storeType: string;
  defaultItemName: string;
}
const AddItemModal = (props: Props) => {
  const { isModalOpened, toggleModal, itemsList, storeType, defaultItemName } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper className={'printHide'}>
        <AddItemForm
          toggleModal={toggleModal}
          itemsList={itemsList}
          storeType={storeType}
          defaultItemName={defaultItemName}
        />
      </StyledWrapper>
    </ModalCover>
  );
};

export default AddItemModal;
