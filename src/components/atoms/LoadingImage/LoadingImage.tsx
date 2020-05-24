import React from 'react';
import styled from 'styled-components';
import Loading from '../../../assets/image/Loading.svg';

const StyledLoadingImage = styled.img`
  display: flex;
  align-self: center;
  width: ${(props: Props) => (props.customWidth ? `${props.customWidth}px` : '75px')};
  margin: 10px;

  animation-name: rotation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  animation-timing-function: ease;

  @keyframes rotation {
    to {
      transform: rotate(720deg);
    }
  }
`;
interface Props {
  customWidth?: number;
}
const LoadingImage = (props: Props) => {
  return <StyledLoadingImage src={Loading} alt={'Loading image'} customWidth={props.customWidth} />;
};

export default LoadingImage;
