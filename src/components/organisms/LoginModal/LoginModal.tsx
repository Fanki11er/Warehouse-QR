import React from 'react';
import styled from 'styled-components';
import ModalCover from '../../atoms/ModalCover/ModalCover';
import LoginForm from '../../molecules/LoginForm/LoginForm';

const StyledWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;
  @media (max-width: 600px) {
    width: 350px;
    padding: 5px;
    min-height: 620px;
  }
`;
interface Props {
  isModalOpened: boolean;
  toggleModal: Function;
}
const LoginModal = (props: Props) => {
  const { isModalOpened, toggleModal } = props;
  return (
    <ModalCover isModalOpened={isModalOpened}>
      <StyledWrapper>
        <LoginForm toggleModal={toggleModal} />
      </StyledWrapper>
    </ModalCover>
  );
};

export default LoginModal;
