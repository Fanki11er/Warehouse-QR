import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import FormLabel from '../../atoms/FormLabel/FormLabel';

interface InputProps {
  width?: number;
}

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
  width: ${(props: InputProps) => (props.width ? `${props.width}px` : '300px')};
  height: 35px;
  border: 2px solid ${({ theme }) => theme.green};
  margin: 0 15px;
  border-radius: 10px;
  color: ${({ theme }) => theme.green};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizeDesktop.larger};
  caret-color: ${({ theme }) => theme.orange};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
    margin: 0;
  }

  &.error {
    color: ${({ theme }) => theme.lightRed};
    border: 2px solid ${({ theme }) => theme.lightRed};
    &:focus {
      box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.lightRed};
      outline: none;
    }
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderGreen};
  }

  &:focus {
    box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.green};
    outline: none;
    caret-color: ${({ theme }) => theme.orange};
  }

  @media (max-width: 600px) {
    max-width: 98%;
  }
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
  width?: number;
  inputMode?: string;
  pattern?: string;
}

const FormInput = (props: Props) => {
  const {
    label,
    type,
    errorText,
    name,
    maxLength,
    error,
    placeholder,
    width,
    inputMode,
    pattern,
  } = props;

  return (
    <StyledWrapper>
      <FormLabel>{`${label}:`}</FormLabel>
      <StyledInput
        type={type}
        name={name}
        maxLength={maxLength}
        className={error ? 'error' : undefined}
        placeholder={placeholder}
        width={width}
        inputMode={inputMode}
        pattern={pattern}
      />
      <StyledError>{errorText}</StyledError>
    </StyledWrapper>
  );
};

export default FormInput;
