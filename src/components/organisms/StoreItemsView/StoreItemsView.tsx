import React from 'react';
import styled from 'styled-components';
import { storeItem } from '../../../types/types';
import { addNewTag } from '../../../tools/tools';
import StoreItem from '../../molecules/StoreItem/StoreItem';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';

const StyledWrapper = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 830px;
  height: 400px;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 25px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  margin: 30px 160px;
  color: red;
  padding: 0 10px;

  @media (max-width: 600px) {
    width: 350px;
  }
`;

const StyledLoading = styled.div`
  padding: 100px;
`;

type Props = {
  items: storeItem[];
  isStoreEmpty: boolean;
  toggleEditItemModal: (a: storeItem) => void;
};

const StyledErrorInfo = styled(ErrorInfo)`
  margin: 100px 0;
`;

const StoreItemsView = (props: Props) => {
  const { isStoreEmpty, items, toggleEditItemModal } = props;
  const actions = { addNewTag, toggleEditItemModal };

  const renderItems = (items: storeItem[]) => {
    return items.length ? (
      items
        .sort((a, b) => {
          return b.id - a.id;
        })
        .map((item, index) => {
          return <StoreItem item={item} key={index} actions={actions} />;
        })
    ) : (
      <StyledLoading>
        <LoadingImage customWidth={85} />
      </StyledLoading>
    );
  };
  return (
    <StyledWrapper className={'withScroll'}>
      {isStoreEmpty ? (
        <StyledErrorInfo>Brak elementów do wyświetlenia</StyledErrorInfo>
      ) : (
        renderItems(items)
      )}
    </StyledWrapper>
  );
};

export default StoreItemsView;
