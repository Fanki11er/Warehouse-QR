import React, { useContext } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { StoreItem } from '../../../classes/classes';
import { baseBranches } from '../../../firebase/firebaseEndpoints';
import StatusInfoContext from '../../../context/StatusInfoContext';
import { MultiStepFormContext } from '../../../providers/MultiStepFormProvider';
import { createOrderDesc, getStoreItemKey, withErrors } from '../../../tools/tools';
import * as FormInputs from '../FormInputsWrapper/FormInputsWrapper';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import Form from '../../atoms/Form/Form';

interface Props {
  toggleModal: Function;
  item: storeItem | null;
}

const EditItemForm = (props: Props) => {
  const { toggleModal, item } = props;
  const sendStatusInfo = useContext(StatusInfoContext);
  const { currentIndex, createSettings, resetCurrentIndex } = useContext(MultiStepFormContext);
  const { minIndex, maxIndex } = createSettings(1, 2);
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
    quantity,
    catalogNumber,
  } = item;
  const initialValues: Partial<storeItem> = {
    name,
    dimension,
    mainType,
    secondType,
    defaultOrderAmount,
    additionalDescriptions,
    quantity,
    catalogNumber,
  };

  let validateSchema = yup.object().shape({
    name: yup.string().required('Pole jest wymagane'),
    dimension: yup.string().required('Pole jest wymagane'),
    defaultOrderAmount: yup
      .number()
      .required('Pole jest wymagane')
      .integer('Wartość musi być liczbą')
      .min(0, 'Wartość musi być dodatnia'),
    quantity: yup
      .number()
      .required('Pole jest wymagane')
      .integer('Wartość musi być liczbą')
      .min(0, 'Wartość musi być dodatnia'),
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
        if (currentIndex === maxIndex) {
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
          resetCurrentIndex(minIndex);
        }
      }}
    >
      {({
        handleSubmit,
        touched,
        errors,
        values,
        resetForm,
        setSubmitting,
        validateForm,
        setErrors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <MenuHeader>{`Edytuj (${currentIndex}/${maxIndex})`}</MenuHeader>
          <FormInputs.FormInputsWrapper
            values={values}
            errors={errors}
            touched={touched}
            currentIndex={currentIndex}
            formType={'edit'}
          >
            <FormInputs.FormPartOne index={1} />
            <FormInputs.FormPartTwo index={2} />
            <FormInputs.Controls
              toggleModal={toggleModal}
              settings={{ minIndex, maxIndex }}
              setSubmitting={setSubmitting}
              resetForm={resetForm}
              validateForm={validateForm}
              setErrors={setErrors}
              withErrors={withErrors}
            />
          </FormInputs.FormInputsWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default EditItemForm;
