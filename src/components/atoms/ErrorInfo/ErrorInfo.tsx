import styled from 'styled-components';

const ErrorInfo = styled.div`
  color: ${({ theme }) => theme.lightRed};
  font-size: ${({ theme }) => theme.fontSizeDesktop.large};
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export default ErrorInfo;
