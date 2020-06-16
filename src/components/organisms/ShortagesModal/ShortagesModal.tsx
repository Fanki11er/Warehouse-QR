import React from 'react';
import styled from 'styled-components';
import InfoModalWrapper from '../../atoms/InfoModalWrapper/InfoModalWrapper';

const StyledInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.lightRed};
  color: ${({ theme }) => theme.lightRed};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.primary};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  margin-bottom: 20px;

  @media (max-width: 600px) {
    margin-top: 25px;
    font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
    width: 120px;
  }
`;

interface Props {
  isModalOpened: boolean;
  shortagesNumber: number;
}

const ShortagesModal = (props: Props) => {
  const { isModalOpened, shortagesNumber } = props;

  return (
    <InfoModalWrapper isModalOpened={isModalOpened}>
      <StyledInfo>{`Braki: ${shortagesNumber}`}</StyledInfo>
    </InfoModalWrapper>
  );
};

export default ShortagesModal;
