import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import FormLabel from '../../atoms/FormLabel/FormLabel';

const CheckBox = styled(Field)`
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  transition: background-color 0.6s, border 0.6s;
  margin: 0 10px;

  &:checked {
    background-color: ${({ theme }) => theme.green};
    border: 2px solid ${({ theme }) => theme.green};
  }

  &:hover {
    border: 3px solid ${({ theme }) => theme.orange};
    cursor: pointer;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.orange};
  }

  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }
  @media screen and (max-width: 600px) {
    width: 25px;
    height: 25px;
    border-radius: 5px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
`;

interface Props {
  name: string;
  label: string;
  checked: boolean;
}

const FormCheckBox = (props: Props) => {
  const { name, label, checked } = props;
  return (
    <StyledWrapper>
      <CheckBox type={'checkbox'} checked={checked} name={name} />
      <FormLabel>{label}</FormLabel>
    </StyledWrapper>
  );
};

export default FormCheckBox;
