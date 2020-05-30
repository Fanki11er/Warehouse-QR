import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
`;

const StyledInput = styled(Field)`
  display: flex;
  justify-self: flex-end;
  padding-left: 10px;
  width: 300px;
  height: 35px;
  border: 2px solid ${({ theme }) => theme.green};
  margin: 0 15px;
  border-radius: 10px;
  color: ${({ theme }) => theme.green};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  caret-color: ${({ theme }) => theme.orange};

  &.error {
    color: ${({ theme }) => theme.lightRed};
    border: 2px solid ${({ theme }) => theme.lightRed};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderGreen};
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.primaryBlue};
  min-width: 80px;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  margin: 4px 0;
`;

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.lightRed};
`;

interface Props {
  label: string;
  type: string;
  name: string;
  errorText?: string;
  maxLength?: number;
  error?: boolean;
  placeholder?: string;
}

const FormInput = (props: Props) => {
  const { label, type, errorText, name, maxLength, error, placeholder } = props;
  return (
    <StyledWrapper>
      <StyledLabel>{`${label}:`}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        maxLength={maxLength}
        className={error ? 'error' : undefined}
        placeholder={placeholder}
      />
      <StyledError>{errorText}</StyledError>
    </StyledWrapper>
  );
};

export default FormInput;
