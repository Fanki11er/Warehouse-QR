import React, { useContext } from 'react';
import styled from 'styled-components';
import { DeleteModalContext } from '../../../providers/DeleteModalProvider';
import StatusInfoContext from '../../../context/StatusInfoContext';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import DummyButton from '../../atoms/DummyButton/DummyButton';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 450px;
  height: 250px;
  border: 2px solid ${({ theme }) => theme.lightRed};
  background-color: ${({ theme }) => theme.primary};
  border-radius: 15px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const StyledHeader = styled.span`
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.large};
`;

const StyledMenuButton = styled(MenuButton)`
  color: ${({ theme }) => theme.lightRed};
  border: 2px solid ${({ theme }) => theme.lightRed};
`;

const StyledItemInfo = styled.span`
  padding: 0 10px;
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  justify-content: center;
`;

const DeleteItemModal = () => {
  const sendStatusInfo = useContext(StatusInfoContext);
  const { isDeleteModalOpened, toggleDeleteModal, deleteStoreItem, itemToDelete } = useContext(
    DeleteModalContext,
  );
  const identifier = itemToDelete ? itemToDelete.identifier : '';
  const description = itemToDelete ? itemToDelete.orderDescription : '';
  return (
    <ModalCover isModalOpened={isDeleteModalOpened} className={'printHide'}>
      <StyledWrapper>
        <StyledHeader>Na pewno usunąć</StyledHeader>
        <StyledItemInfo>{description}</StyledItemInfo>
        <StyledButtonsWrapper>
          {itemToDelete ? (
            <StyledMenuButton
              onClick={() => {
                deleteStoreItem(identifier, sendStatusInfo);
                toggleDeleteModal(null);
              }}
            >
              Usuń
            </StyledMenuButton>
          ) : (
            <DummyButton>Usuń</DummyButton>
          )}
          <MenuButton onClick={() => toggleDeleteModal(null)}>Anuluj</MenuButton>
        </StyledButtonsWrapper>
      </StyledWrapper>
    </ModalCover>
  );
};
export default DeleteItemModal;
