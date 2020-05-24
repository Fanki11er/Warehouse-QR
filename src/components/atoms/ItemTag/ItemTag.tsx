import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Tag } from '../../../classes/classes';

const StyledWrapper = styled.div`
  display: flex;
  width: 50mm;
  height: 15mm;
  border: 1px solid black;
  background-color: #bbb;
  margin: 0.5px;
`;
const StyledFlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 35mm;
  height: 15mm;
`;

const StyledQrWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 14mm;
  height: 14mm;
`;
const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizeDesktop.smaller};
  font-weight: bold;
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
    <StyledWrapper>
      <StyledFlexColumnWrapper>
        <StyledLabel>{description}</StyledLabel>
        <StyledLabel>{dimension}</StyledLabel>
      </StyledFlexColumnWrapper>
      <StyledQrWrapper>{createQr(id)}</StyledQrWrapper>
    </StyledWrapper>
  );
};

export default ItemTag;
