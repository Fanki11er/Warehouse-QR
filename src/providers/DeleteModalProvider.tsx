import React, { createContext, useState } from 'react';
import { storeItem, DeleTeModalInterface } from '../types/types';
import { deleteStoreItem } from '../tools/tools';

export const DeleteModalContext = createContext<DeleTeModalInterface>({
  isDeleteModalOpened: false,
  toggleDeleteModal: () => {},
  itemToDelete: null as storeItem | null,
  deleteStoreItem: () => {},
});

const DeleteModalProvider = ({ children }) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<storeItem | null>(null);

  const toggleDeleteModal = (item: storeItem | null) => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
    setItemToDelete(item);
  };

  const deleteModalContext: DeleTeModalInterface = {
    isDeleteModalOpened,
    itemToDelete,
    toggleDeleteModal,
    deleteStoreItem,
  };
  return (
    <DeleteModalContext.Provider value={deleteModalContext}>{children}</DeleteModalContext.Provider>
  );
};

export default DeleteModalProvider;
