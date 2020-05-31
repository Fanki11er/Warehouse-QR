import React from 'react';
import styled from 'styled-components';
import routes from '../../../routes/routes';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { NavLink } from 'react-router-dom';

const StyledWrapper = styled.nav`
  display: flex;
  height: 100%;
  padding: 0 15px;
  justify-content: center;
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 5px;
  }
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
  @media (max-width: 600px) {
    margin: 0 5px;
  }

  &.activeLink {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primaryBlue};

    &:hover {
      color: ${({ theme }) => theme.primary};
      border: 2px solid ${({ theme }) => theme.primaryBlue};
      cursor: not-allowed;
    }
  }
`;

const Navigation = () => {
  const { scan, tags, main } = routes;
  return (
    <StyledWrapper className={'printHide'}>
      <StyledNavLink as={NavLink} to={tags} activeClassName={'activeLink'}>
        Etykiety
      </StyledNavLink>
      <StyledNavLink as={NavLink} exact to={scan} activeClassName={'activeLink'}>
        Skaner
      </StyledNavLink>
      <StyledNavLink as={NavLink} to={main} activeClassName={'activeLink'}>
        Główna
      </StyledNavLink>
    </StyledWrapper>
  );
};

export default Navigation;
