import React from 'react';
import styled from 'styled-components';
import OrderContext from '../../../context/orderContext';
import { storeItem, Shortage } from '../../../types/types';
import ShortageItem from '../../molecules/ShortageItem/ShortageItem';
import LoadingImage from '../../atoms/LoadingImage/LoadingImage';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';

const StyledWrapper = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 870px;
  height: 400px;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 25px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  margin: 30px 120px;
  padding: 0 10px;

  @media (max-width: 600px) {
    width: 350px;
  }
`;

const StyledLoading = styled.div`
  padding: 100px;
`;

type Props = {
  items: Shortage[];
  isStoreEmpty: boolean | undefined;
};

const StyledErrorInfo = styled(ErrorInfo)`
  margin: 100px 0;
`;

const ItemShortages = (props: Props) => {
  const { isStoreEmpty, items } = props;

  const renderItems = (items: Shortage[]) => {
    return items.length ? (
      items.map((item, index) => {
        return <ShortageItem item={item} key={index} />;
      })
    ) : (
      <StyledLoading>
        <LoadingImage customWidth={85} />
      </StyledLoading>
    );
  };
  return (
    <StyledWrapper className={'withScroll'}>
      {isStoreEmpty ? <StyledErrorInfo>Brak braków :)</StyledErrorInfo> : renderItems(items)}
    </StyledWrapper>
  );
};

export default ItemShortages;
