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
  width: 750px;
  height: 400px;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 25px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  margin: 30px 100px;
  color: red;
  padding: 0 5px;

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
};

const StyledErrorInfo = styled(ErrorInfo)`
  margin: 100px 0;
`;

const StoreItemsView = (props: Props) => {
  const { isStoreEmpty, items } = props;
  const actions = { addNewTag };
  const renderItems = (items: storeItem[]) => {
    return items.length ? (
      items.reverse().map((item, index) => {
        console.log(item);
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
