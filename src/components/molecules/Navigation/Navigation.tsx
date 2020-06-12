import React, { useContext } from 'react';
import styled from 'styled-components';
import routes from '../../../routes/routes';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { NavLink } from 'react-router-dom';
//import mainTheme from '../../../themes/mainTheme';
import UserContext from '../../../context/userContext';
import DummyButton from '../../atoms/DummyButton/DummyButton';
//import AuthIcon from '../../atoms/AuthIcon/AuthIcon';

const StyledWrapper = styled.nav`
  display: flex;
  height: 100%;
  padding: 0 15px;
  justify-content: center;
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 5px;
    flex-flow: wrap row;
    width: 100%;
    height: 140px;
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
  margin: 0 30px 5px 30px;

  @media (max-width: 600px) {
    margin: 0 5px 5px 5px;
  }

  &.activeLink {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primaryBlue};

    &:hover {
      color: ${({ theme }) => theme.primary};
      border: 2px solid ${({ theme }) => theme.primaryBlue};
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;

const StyledDummyButton = styled(DummyButton)`
  width: 120px;
  margin: 0 30px 5px 30px;
  @media (max-width: 600px) {
    margin: 0 5px 5px 5px;
  }
`;

const StyledButton = styled(MenuButton)`
  width: 130px;
`;

const Navigation = () => {
  const { scan, tags, main, orders } = routes;
  const user = useContext(UserContext);
  return (
    <StyledWrapper className={'printHide'}>
      <StyledNavLink as={NavLink} exact to={scan} activeClassName={'activeLink'}>
        Skaner
      </StyledNavLink>
      <StyledNavLink as={NavLink} to={main} activeClassName={'activeLink'}>
        Magazyny
      </StyledNavLink>
      {user ? (
        <StyledNavLink as={NavLink} to={orders} activeClassName={'activeLink'}>
          Zamówienia
        </StyledNavLink>
      ) : (
        <StyledDummyButton>Zamówienia</StyledDummyButton>
      )}
      {user ? (
        <StyledNavLink as={NavLink} to={tags} activeClassName={'activeLink'}>
          Etykiety
        </StyledNavLink>
      ) : (
        <StyledDummyButton>Etykiety</StyledDummyButton>
      )}
      )
    </StyledWrapper>
  );
};

export default Navigation;
