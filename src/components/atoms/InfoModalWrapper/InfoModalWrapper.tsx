import styled from 'styled-components';

interface StyledProps {
  isModalOpened: boolean;
}

const InfoModalWrapper = styled.div`
  display: flex;
  width: 220px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  transform: ${(props: StyledProps) =>
    props.isModalOpened ? 'translateX(0)' : 'translateX(-150%)'};
  transition: transform 0.4s;
  z-index: 12;

  @media (max-width: 600px) {
    top: 0;
    bottom: initial;
    justify-content: flex-start;
    padding-left: 10px;
  }
`;

export default InfoModalWrapper;
