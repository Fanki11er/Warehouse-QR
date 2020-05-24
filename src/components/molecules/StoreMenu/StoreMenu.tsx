import React from 'react';
import styled from 'styled-components';
import theme from '../../../themes/mainTheme';
import MenuWrapper from '../../atoms/MenuWrapper/MenuWrapper';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';

const StyledWrapper = styled(MenuWrapper)`
  min-height: 150px;
  height: 180px;
  justify-content: flex-start;
`;

interface Props {}

const StoreMenu = (props: Props) => {
  const { primaryBlue } = theme;
  return (
    <StyledWrapper>
      <MenuHeader>Akcje</MenuHeader>
      <MenuButton color={primaryBlue}>Dodaj nowy</MenuButton>
    </StyledWrapper>
  );
};

export default StoreMenu;
