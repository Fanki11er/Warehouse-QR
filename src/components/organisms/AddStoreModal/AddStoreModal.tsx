import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import AddStoreForm from '../../molecules/AddStoreForm/AddStoreForm';
import { storeType } from '../../../types/types';

const StyledWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 360px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;

  @media (max-width: 600px) {
    width: 350px;
  }
`;
interface Props {
  isModalOpened: boolean;
  toggleModal: Function;
  availableStores: storeType[];
}
const AddStoreModal = (props: Props) => {
  const { isModalOpened, toggleModal, availableStores } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper>
        <AddStoreForm toggleModal={toggleModal} availableStores={availableStores} />
      </StyledWrapper>
    </ModalCover>
  );
};

export default AddStoreModal;
