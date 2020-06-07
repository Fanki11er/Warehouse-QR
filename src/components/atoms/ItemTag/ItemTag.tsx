import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Tag } from '../../../classes/classes';

const StyledWrapper = styled.div`
  display: flex;
  width: 70mm;
  height: 25mm;
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
  width: 53mm;
  height: 25mm;
`;

const StyledQrWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 65px;
  height: 65px;
  align-self: center;
`;
const StyledDescriptionLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizeDesktop.small};
  font-weight: bolder;
  text-align: center;
  margin: 0 2px 0 4px;
`;

const StyledDimensionLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  font-weight: bolder;
  text-align: center;
  margin: 3px 0;
  letter-spacing: 1px;
`;

interface Props {
  itemTag: Tag;
  deleteTag: Function;
}
const ItemTag = (props: Props) => {
  const {
    itemTag: { id, description, dimension },
    deleteTag,
  } = props;
  const createQr = (id: string): any => {
    return <QRCode value={id} renderAs={'svg'} size={60} />;
  };

  return (
    <StyledWrapper onClick={() => deleteTag(id)} className={'animateShow'}>
      <StyledFlexColumnWrapper>
        <StyledDescriptionLabel>{description}</StyledDescriptionLabel>
        <StyledDimensionLabel>{dimension}</StyledDimensionLabel>
      </StyledFlexColumnWrapper>
      <StyledQrWrapper>{createQr(id)}</StyledQrWrapper>
    </StyledWrapper>
  );
};

export default ItemTag;
