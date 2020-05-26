import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Tag } from '../../../classes/classes';

const StyledWrapper = styled.div`
  display: flex;
  width: 50mm;
  height: 15mm;
  border: 1px solid black;
  background-color: #ddd;
  margin: 1px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.lightRed};
    background-color: ${({ theme }) => theme.transparentRed};
  }
`;
const StyledFlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35mm;
  height: 15mm;
`;

const StyledQrWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 15mm;
  height: 100%;
`;
const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizeDesktop.smaller};
  font-weight: bolder;
  text-align: center;
`;

interface Props {
  itemTag: Tag;
}
const ItemTag = (props: Props) => {
  const {
    itemTag: { id, description, dimension },
  } = props;
  const createQr = (id: string): any => {
    return <QRCode value={id} renderAs={'svg'} size={50} />;
  };

  return (
    <StyledWrapper onClick={() => console.log('Clicked')}>
      <StyledFlexColumnWrapper>
        <StyledLabel>{description}</StyledLabel>
        <StyledLabel>{dimension}</StyledLabel>
      </StyledFlexColumnWrapper>
      <StyledQrWrapper>{createQr(id)}</StyledQrWrapper>
    </StyledWrapper>
  );
};

export default ItemTag;
