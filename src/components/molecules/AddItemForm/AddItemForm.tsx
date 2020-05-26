import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { storeItem } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { StoreItem, Tag } from '../../../classes/classes';
import { baseBranches } from '../../../firebase/firebaseEndpoints';
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
  itemsList: storeItem[];
  storeType: string;
}

const AddStoreForm = (props: Props) => {
  const { toggleModal, itemsList, storeType } = props;
  const initialValues: Partial<storeItem> = {
    name: '',
    dimension: '',
    mainType: '',
    secondType: '',
    defaultOrderAmount: 0,
    additionalDescriptions: '',
  };

  let validateSchema = yup.object().shape({
    name: yup.string().required('Pole jest wymagane'),
    dimension: yup.string().required('Pole jest wymagane'),
    defaultOrderAmount: yup.number(),
  });

  const getNextItemNumber = (itemsList: storeItem[]): number => {
    const sortedList = itemsList.length
      ? itemsList.sort((firstId, secondId) => {
          return firstId.id - secondId.id;
        })
      : 0;
    return sortedList ? sortedList[sortedList.length - 1].id + 1 : 1;
  };
  const addNewItem = async (newItem: StoreItem) => {
    const key = await db.ref('QR').child(`${baseBranches.storesBranch}${storeType}`).push().key;
    const updates = {};
    updates[`${baseBranches.storesBranch}${storeType}/${key}`] = newItem;
    db.ref('QR/').update(updates);
  };

  const addNewTag = (newItem: StoreItem) => {
    const { name, storeType, id, mainType, secondType, dimension } = newItem;
    const description = `${name} ${mainType} ${secondType}`;
    const idNumber = `${storeType}-${id.toString().padStart(3, '0')}`;
    const newTag = new Tag(idNumber, description, dimension);

    db.ref(`QR/${baseBranches.tagsBranch}`).push(newTag);
  };

  const createOrderDesc = (newItem: StoreItem) => {
    newItem.orderDescription = `${newItem.name} ${newItem.dimension} ${newItem.mainType} ${newItem.secondType}`;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const {
          name,
          dimension,
          mainType,
          secondType,
          defaultOrderAmount,
          additionalDescriptions,
        } = values;
        const id = getNextItemNumber(itemsList);
        const newItem = new StoreItem(
          storeType,
          name!,
          id,
          dimension!,
          mainType!,
          secondType!,
          defaultOrderAmount!,
          additionalDescriptions!,
        );

        createOrderDesc(newItem);
        addNewItem(newItem);
        addNewTag(newItem);
        toggleModal();
        resetForm();
        setSubmitting(false);
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
              maxLength={25}
              error={errors.defaultOrderAmount && touched.defaultOrderAmount ? true : false}
              errorText={errors.defaultOrderAmount && touched.defaultOrderAmount ? errors.name : ''}
            />
          </StyledInputsWrapper>
          <StyledButtonsWrapper>
            <MenuButton type={'submit'}>Dodaj nowy</MenuButton>
            <MenuButton
              onClick={() => {
                toggleModal();
                setSubmitting(false);
                resetForm();
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

export default AddStoreForm;

/*
  const getProperties = (propName: string, stores: storeType[]): string[] => {
    const properties: string[] = [];
    stores.map((store) => {
      properties.push(store[propName]);
    });
    return properties;
  };

    const usedNames = getProperties('name', availableStores);
  const usedTypes = getProperties('type', availableStores);
  const usedIdentifiers = getProperties('identifier', availableStores);

    const createNewStore = (values: storeType) => {
    const { name, type, identifier } = values;
    const newStore = new StoreType(name, identifier, type);
    const updates = {};
    updates[`${baseBranches.storesBranch}${identifier}`] = 'EMPTY';
    updates[`${baseBranches.storeTypeBranch}${identifier}`] = newStore;
    const ref = db.ref('QR').update(updates);
  };
   */
