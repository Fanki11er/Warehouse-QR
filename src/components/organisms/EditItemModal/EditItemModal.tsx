import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import { storeItem } from '../../../types/types';
import EditItemForm from '../../molecules/EditItemForm/EditItemForm';

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
  item: storeItem | null;
}
const EditItemModal = (props: Props) => {
  const { isModalOpened, toggleModal, item } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper className={'printHide'}>
        <EditItemForm toggleModal={toggleModal} item={item} />
      </StyledWrapper>
    </ModalCover>
  );
};

export default EditItemModal;
