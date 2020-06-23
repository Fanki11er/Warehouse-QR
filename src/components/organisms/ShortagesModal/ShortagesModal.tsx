import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import routes from '../../../routes/routes';
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
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.lightRed};
    border: 2px solid ${({ theme }) => theme.lightRed};
    box-shadow: 0 0 5px 1px ${({ theme }) => theme.lightRed};
    cursor: pointer;
  }

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
  const { shortages } = routes;
  const { isModalOpened, shortagesNumber } = props;
  const [isModalClicked, setIsModalClicked] = useState(false);

  if (isModalClicked) return <Redirect to={shortages} />;
  return (
    <InfoModalWrapper
      isModalOpened={isModalOpened}
      onClick={() => {
        setIsModalClicked(true);
        setTimeout(() => setIsModalClicked(false), 30);
      }}
      className={'printHide'}
    >
      <StyledInfo>{`Braki: ${shortagesNumber}`}</StyledInfo>
    </InfoModalWrapper>
  );
};

export default ShortagesModal;
