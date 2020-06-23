import React, { useContext, createContext } from 'react';
import styled from 'styled-components';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { storeItem, AddFormSettings } from '../../../types/types';
import FormInput from '../FormInput/FormInput';
import FormCheckBox from '../../atoms/FormCheckBox/FormCheckBox';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import { MultiStepFormSettings } from '../../../classes/classes';
import { MultiStepFormContext } from '../../../providers/MultiStepFormProvider';

const StyledCheckBoxesWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.lightRed};
  margin-top: -15px;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  transition: transform 1s;
  width: 100%;
  height: 70%;
  opacity: 0;
  animation-name: show;
  animation-fill-mode: forwards;
  animation-duration: 1s;

  @keyframes show {
    to {
      opacity: 1;
    }
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
  justify-content: space-around;
`;

const StyledMenuButton = styled(MenuButton)`
  width: 100px;
`;

const StyledSubmitButton = styled(MenuButton)`
  width: 250px;
`;

interface Props {
  values: (Partial<storeItem> & AddFormSettings) | Partial<storeItem>;
  errors: FormikErrors<Partial<storeItem> & AddFormSettings>;
  touched: FormikTouched<Partial<storeItem> & AddFormSettings>;
  itemExists?: boolean;
  children: any;
  currentIndex: number;
  formType: 'add' | 'edit';
}

interface FormContext {
  values: any;
  errors: FormikErrors<Partial<storeItem> & AddFormSettings>;
  touched: FormikTouched<Partial<storeItem> & AddFormSettings>;
  itemExists: boolean | undefined;
  currentIndex: number;
  formType: 'add' | 'edit';
}

const Context = createContext<FormContext>({
  values: { withTag: true, withOrder: false },
  errors: {},
  touched: {},
  itemExists: false,
  currentIndex: 1,
  formType: 'add',
});

const FormInputsWrapper = (props: Props) => {
  const { children, errors, values, touched, itemExists, currentIndex, formType } = props;
  const properties = { errors, values, touched, itemExists, currentIndex, formType };

  return <Context.Provider value={properties}>{children}</Context.Provider>;
};

const FormPartOne = ({ index }) => {
  const { errors, values, touched, currentIndex, formType } = useContext(Context);
  return currentIndex === index ? (
    <StyledInputsWrapper>
      {formType === 'add' && (
        <StyledCheckBoxesWrapper>
          <FormCheckBox name={'withTag'} label={'Etykieta'} checked={values.withTag} />
          <FormCheckBox name={'withOrder'} label={'Zamówienie'} checked={values.withOrder} />
        </StyledCheckBoxesWrapper>
      )}
      <FormInput
        name={'name'}
        type={'text'}
        label={'Nazwa'}
        maxLength={25}
        inputMode={'text'}
        error={errors.name && touched.name ? true : false}
        errorText={errors.name && touched.name ? errors.name : ''}
      />
      <FormInput
        name={'dimension'}
        type={'text'}
        label={'Wymiar'}
        maxLength={12}
        inputMode={'text'}
        error={errors.dimension ? true : false}
        errorText={errors.dimension ? errors.dimension : ''}
      />
      <FormInput
        name={'mainType'}
        type={'text'}
        label={'Typ1'}
        maxLength={12}
        inputMode={'text'}
        error={errors.mainType && touched.mainType ? true : false}
        errorText={errors.mainType && touched.mainType ? errors.mainType : ''}
      />

      <FormInput
        name={'secondType'}
        type={'text'}
        label={'Typ2'}
        maxLength={12}
        inputMode={'text'}
        error={errors.secondType && touched.secondType ? true : false}
        errorText={errors.secondType && touched.secondType ? errors.secondType : ''}
      />
    </StyledInputsWrapper>
  ) : null;
};

const FormPartTwo = ({ index }) => {
  const { errors, touched, currentIndex, itemExists } = useContext(Context);
  return currentIndex === index ? (
    <StyledInputsWrapper>
      <FormInput
        name={'defaultOrderAmount'}
        type={'text'}
        label={'Do zamówienia'}
        maxLength={5}
        inputMode={'numeric'}
        pattern={'[0-9]*'}
        error={errors.defaultOrderAmount && touched.defaultOrderAmount ? true : false}
        errorText={
          errors.defaultOrderAmount && touched.defaultOrderAmount ? errors.defaultOrderAmount : ''
        }
      />
      <FormInput
        name={'catalogNumber'}
        type={'text'}
        label={'Nr katalogowy'}
        maxLength={12}
        inputMode={'text'}
        error={errors.catalogNumber ? true : false}
        errorText={errors.catalogNumber ? errors.catalogNumber : ''}
      />
      <FormInput
        name={'quantity'}
        type={'text'}
        label={'Ilość w magazynie'}
        maxLength={12}
        inputMode={'number'}
        pattern={'[0-9]*'}
        error={errors.quantity && touched.quantity ? true : false}
        errorText={errors.quantity && touched.quantity ? errors.quantity : ''}
      />
      <StyledError>{itemExists ? 'Taki przedmiot już istnieje' : ''}</StyledError>
    </StyledInputsWrapper>
  ) : null;
};

interface ControlsProps {
  toggleModal: Function;
  settings: MultiStepFormSettings;
  setSubmitting: Function;
  resetForm: Function;
  validateForm: Function;
  setErrors: Function;
  withErrors: Function;
}

const Controls = (props: ControlsProps) => {
  const {
    toggleModal,
    setSubmitting,
    resetForm,
    validateForm,
    setErrors,
    withErrors,
    settings: { minIndex, maxIndex },
  } = props;
  const { currentIndex, formType, values } = useContext(Context);
  const { changeCurrentIndex, resetCurrentIndex } = useContext(MultiStepFormContext);
  return (
    <>
      <StyledButtonsWrapper>
        <StyledMenuButton
          type={'button'}
          className={currentIndex > minIndex ? undefined : 'notActive'}
          onClick={() => changeCurrentIndex(currentIndex, { minIndex, maxIndex }, 'prev')}
        >
          Cofnij
        </StyledMenuButton>

        <MenuButton
          type="reset"
          onClick={() => {
            toggleModal();
            resetCurrentIndex(minIndex);
            setSubmitting(false);
            resetForm();
          }}
        >
          Anuluj
        </MenuButton>
        <StyledMenuButton
          type={'button'}
          className={currentIndex < maxIndex ? undefined : 'notActive'}
          onClick={() => {
            validateForm(values).then((err) => {
              setErrors(err);
              !withErrors(err) && changeCurrentIndex(currentIndex, { minIndex, maxIndex }, 'next');
            });
          }}
        >
          Dalej
        </StyledMenuButton>
      </StyledButtonsWrapper>
      <StyledSubmitButton
        className={currentIndex === maxIndex ? undefined : 'notActive'}
        type={'submit'}
      >
        {formType === 'add' && 'Dodaj nowy'}
        {formType === 'edit' && 'Edytuj'}
      </StyledSubmitButton>
    </>
  );
};

export { FormInputsWrapper, FormPartOne, FormPartTwo, Controls };
