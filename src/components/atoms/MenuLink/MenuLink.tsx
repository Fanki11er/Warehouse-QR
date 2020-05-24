import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton';
import { storeType } from '../../../types/types';

const StyledButton = styled(MenuButton)`
  display: flex;
  color: ${({ theme }) => theme.primaryBlue};
  border: 1px solid ${({ theme }) => theme.primaryBlue};
  align-items: center;
  text-decoration: none;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

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
