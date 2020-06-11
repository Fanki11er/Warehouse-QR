import styled from 'styled-components';

const FormLabel = styled.label`
  color: ${({ theme }) => theme.primaryBlue};
  min-width: 80px;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  margin: 4px 0;
`;

export default FormLabel;
