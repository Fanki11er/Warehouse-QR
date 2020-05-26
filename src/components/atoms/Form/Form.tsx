import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 10px 0;
  }
`;

export default Form;
