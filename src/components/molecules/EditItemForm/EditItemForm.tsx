import React, { useContext } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { StoreItem } from '../../../classes/classes';
import { baseBranches } from '../../../firebase/firebaseEndpoints';
import StatusInfoContext from '../../../context/StatusInfoContext';
import { createOrderDesc, getStoreItemKey } from '../../../tools/tools';
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
  item: storeItem | null;
}

const EditItemForm = (props: Props) => {
  const { toggleModal, item } = props;
  const sendStatusInfo = useContext(StatusInfoContext);
  if (!item) return null;

  const {
    name,
    dimension,
    mainType,
    secondType,
    defaultOrderAmount,
    storeType,
    id,
    identifier,
    additionalDescriptions,
  } = item;
  const initialValues: Partial<storeItem> = {
    name,
    dimension,
    mainType,
    secondType,
    defaultOrderAmount,
    additionalDescriptions,
  };

  let validateSchema = yup.object().shape({
    name: yup.string().required('Pole jest wymagane'),
    dimension: yup.string().required('Pole jest wymagane'),
    defaultOrderAmount: yup.number(),
  });

  const editItem = async (editedItem: StoreItem) => {
    const key = await getStoreItemKey(storeType, identifier);

    db.ref('QR/')
      .child(`${baseBranches.storesBranch}${storeType}`)
      .update({ [key]: editedItem })
      .then(() => {
        sendStatusInfo({
          status: 'ok',
          message: 'Dodano',
        });
      })
      .catch(() => {
        sendStatusInfo({
          status: 'error',
          message: 'Nie dodano',
        });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        const {
          name,
          dimension,
          mainType,
          secondType,
          defaultOrderAmount,
          additionalDescriptions,
        } = values;
        const editedItem = new StoreItem(
          storeType,
          name!,
          id,
          identifier,
          dimension!,
          mainType!,
          secondType!,
          defaultOrderAmount!,
          additionalDescriptions!,
        );

        createOrderDesc(editedItem);
        editItem(editedItem);
        toggleModal(null);
      }}
    >
      {({ handleSubmit, touched, errors, values, resetForm, setSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <MenuHeader>Dodaj do magazynu</MenuHeader>
          <StyledInputsWrapper>
            <FormInput
              name={'name'}
              type={'text'}
              label={'Nazwa'}
              maxLength={25}
              error={errors.name && touched.name ? true : false}
              errorText={errors.name && touched.name ? errors.name : ''}
            />
            <FormInput
              name={'dimension'}
              type={'text'}
              label={'Wymiar'}
              maxLength={12}
              error={errors.dimension && touched.dimension ? true : false}
              errorText={errors.dimension && touched.dimension ? errors.dimension : ''}
            />
            <FormInput
              name={'mainType'}
              type={'text'}
              label={'Typ1'}
              maxLength={12}
              error={errors.mainType && touched.mainType ? true : false}
              errorText={errors.mainType && touched.mainType ? errors.mainType : ''}
            />

            <FormInput
              name={'secondType'}
              type={'text'}
              label={'Typ2'}
              maxLength={12}
              error={errors.secondType && touched.secondType ? true : false}
              errorText={errors.secondType && touched.secondType ? errors.secondType : ''}
            />

            <FormInput
              name={'defaultOrderAmount'}
              type={'text'}
              label={'Do zamówienia'}
              inputMode={'numeric'}
              pattern={'[0-9]*'}
              maxLength={25}
              error={errors.defaultOrderAmount && touched.defaultOrderAmount ? true : false}
              errorText={errors.defaultOrderAmount && touched.defaultOrderAmount ? errors.name : ''}
            />
          </StyledInputsWrapper>
          <StyledButtonsWrapper>
            <MenuButton type="submit">Edytuj</MenuButton>
            <MenuButton
              type="reset"
              onClick={() => {
                setSubmitting(false);
                resetForm();
                toggleModal(null);
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

export default EditItemForm;
