import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { auth } from '../../../firebase/firebaseConfig';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import Form from '../../atoms/Form/Form';
import FormInput from '../FormInput/FormInput';

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
  justify-content: space-around;
`;

interface Props {
  toggleModal: Function;
}

const LoginForm = (props: Props) => {
  const { toggleModal } = props;

  const initialValues = {
    email: '',
    password: '',
  };

  const logIn = async (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => toggleModal())
      .catch((err) => {
        console.log(err, 'E-Form');
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const { email, password } = values;
        logIn(email, password);
      }}
    >
      {({ handleSubmit, touched, errors, values, resetForm, setSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <MenuHeader>Logowanie</MenuHeader>
          <StyledInputsWrapper>
            <FormInput
              name={'email'}
              type={'text'}
              label={'E-mail'}
              error={errors.email && touched.email ? true : false}
              errorText={errors.email && touched.email ? errors.email : ''}
              inputMode={'text'}
            />
            <FormInput
              name={'password'}
              type={'password'}
              label={'Hasło'}
              inputMode={'password'}
              error={errors.password && touched.password ? true : false}
              errorText={errors.password && touched.password ? errors.password : ''}
            />
          </StyledInputsWrapper>
          <StyledButtonsWrapper>
            <MenuButton type="submit">Zaloguj</MenuButton>
            <MenuButton
              type="reset"
              onClick={() => {
                setSubmitting(false);
                resetForm();
                toggleModal();
              }}
            >
              Anuluj
            </MenuButton>
          </StyledButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
