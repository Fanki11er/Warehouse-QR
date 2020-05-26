import React from 'react';
import styled from 'styled-components';
import routes from '../../../routes/routes';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  justify-content: center;
`;

const StyledNavLink = styled(MenuButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  min-width: 90px;
  text-decoration: none;
  color: ${({ theme }) => theme.primaryBlue};
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  margin: 0 30px;
`;

const Navigation = () => {
  const { scan, tags, main } = routes;
  return (
    <StyledWrapper className={'printHide'}>
      <StyledNavLink as={Link} to={tags}>
        Etykiety
      </StyledNavLink>
      <StyledNavLink as={Link} to={scan}>
        Skaner
      </StyledNavLink>
      <StyledNavLink as={Link} to={main}>
        Główna
      </StyledNavLink>
    </StyledWrapper>
  );
};

export default Navigation;
