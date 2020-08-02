import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton';
import { storeType } from '../../../types/types';

const StyledButton = styled(MenuButton)`
  min-width: 220px;
  max-width: 95%;
  min-height: 45px;
  display: flex;
  color: ${({ theme }) => theme.primaryBlue};
  border: 1px solid ${({ theme }) => theme.primaryBlue};
  align-items: center;
  text-decoration: none;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
  margin-bottom: 15px;

  @media (max-width: 560px) {
    min-height: 50px;
  }

  @keyframes show {
    to {
      opacity: 1;
    }
  }
`;
interface Props {
  route: string;
  storeType: storeType;
}

const MenuLink = (props: Props) => {
  const {
    route,
    storeType: { name },
    storeType,
  } = props;
  return (
    <StyledButton
      as={Link}
      to={{
        pathname: route,
        state: {
          storeType,
        },
      }}
    >
      {name}
    </StyledButton>
  );
};

export default MenuLink;
