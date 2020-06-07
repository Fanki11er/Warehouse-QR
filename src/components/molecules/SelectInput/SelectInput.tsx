import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
`;

const StyledSelectInput = styled.select`
  display: flex;
  justify-self: flex-end;
  padding-left: 10px;
  width: 100px;
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
  }
`;

const StyledOption = styled.option`
  color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.primary};
  font-size: ${({ theme }) => theme.fontSizeDesktop.normal};
  outline: none;
  border: none;
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
  name: string;
  options: string[];
  errorText?: string;
  error?: boolean;
}

const SelectInput = (props: Props) => {
  const { label, errorText, name, error, options } = props;

  const renderOptions = (options: string[]) => {
    return options.length
      ? options.map((option, index) => {
          return <StyledOption value={option} label={option} key={index} />;
        })
      : undefined;
  };
  return (
    <StyledWrapper>
      <StyledLabel>{`${label}:`}</StyledLabel>
      <StyledSelectInput name={name} className={error ? 'error' : undefined}>
        {renderOptions(options)}
      </StyledSelectInput>

      <StyledError>{errorText}</StyledError>
    </StyledWrapper>
  );
};

export default SelectInput;

/* <select
        name="color"
        value={values.color}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'block' }}
      >
        <option value="" label="Select a color" />
        <option value="red" label="red" />
        <option value="blue" label="blue" />
        <option value="green" label="green" />
      </select> */
