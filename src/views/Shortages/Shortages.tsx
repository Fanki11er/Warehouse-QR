import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import routes from '../../routes/routes';
import { Shortage } from '../../types/types';
import UserContext from '../../context/userContext';
import ItemShortages from '../../components/organisms/ItemShortages/ItemShortages';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
  align-items: center;
`;
const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledStoreHeader = styled.div`
  display: flex;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: ${({ theme }) => theme.fontSizeDesktop.veryLarge};
  align-self: center;
  justify-self: center;
  text-align: center;
  margin: 30px;
  @media (max-width: 600px) {
    margin: 20px;
  }
`;
interface Props {
  shortagesList: Shortage[];
  isStoreEmpty: boolean | undefined;
}
const Shortages = (props: Props) => {
  const { scan } = routes;
  const { shortagesList, isStoreEmpty } = props;

  const user = useContext(UserContext);
  if (!user?.uid) return <Redirect to={scan} />;
  return (
    <StyledWrapper>
      <StyledStoreHeader>Braki</StyledStoreHeader>
      <ItemShortages items={shortagesList} isStoreEmpty={isStoreEmpty} />
      <StyledFlexWrapper></StyledFlexWrapper>
    </StyledWrapper>
  );
};

export default Shortages;
