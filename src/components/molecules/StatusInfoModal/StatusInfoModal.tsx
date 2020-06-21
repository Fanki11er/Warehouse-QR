import React from 'react';
import styled from 'styled-components';
import { StatusInfo } from '../../../types/types';
import theme from '../../../themes/mainTheme';
interface StyledProps {
  isModalOpened: boolean;
}

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  transform: ${(props: StyledProps) =>
    props.isModalOpened === true ? 'translateY(0)' : 'translateY(-150%)'};
  transition: transform 0.4s;
  z-index: 12;
`;
interface InfoProps {
  status: 'ok' | 'error' | '';
}

const StyledBackground = styled.div`
  background-color: ${({ theme }) => theme.primary};
  min-width: 200px;
  height: 50px;
  margin: 30px;
  border-radius: 15px;
`;
const StyledInfo = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px solid
    ${(props: InfoProps) => (props.status === 'error' ? theme.lightRed : theme.green)};
  color: ${(props: InfoProps) => (props.status === 'error' ? theme.lightRed : theme.green)};
  border-radius: 15px;
  background-color: ${(props: InfoProps) =>
    props.status === 'error' ? theme.transparentRed : theme.modalGreen};
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
`;

interface Props {
  statusInfo: StatusInfo;
}

const StatusInfoModal = (props: Props & StyledProps) => {
  const { statusInfo, isModalOpened } = props;
  return (
    <StyledWrapper isModalOpened={isModalOpened} className={'printHide'}>
      <StyledBackground>
        <StyledInfo status={statusInfo.status}>{statusInfo.message}</StyledInfo>
      </StyledBackground>
    </StyledWrapper>
  );
};

export default StatusInfoModal;
