import styled from 'styled-components';
interface Props {
  isModalOpened: boolean;
}

const ModalCover = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  transform: ${(props: Props) =>
    props.isModalOpened === true ? 'translateY(0)' : 'translateY(150%)'};
  transition: transform 0.6s;
  z-index: 10;
  animation-name: ${(props: Props) => (props.isModalOpened === true ? 'cover' : 'hide')};
  animation-duration: 1s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;

  @keyframes cover {
    to {
      background-color: ${({ theme }) => theme.transparentPrimary};
    }
  }
`;

export default ModalCover;
