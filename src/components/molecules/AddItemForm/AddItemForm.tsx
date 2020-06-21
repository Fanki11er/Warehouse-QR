import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { storeItem, AddFormSettings } from '../../../types/types';
import { db } from '../../../firebase/firebaseConfig';
import { StoreItem, ItemOrder } from '../../../classes/classes';
import { baseBranches } from '../../../firebase/firebaseEndpoints';
import {
  addNewTag,
  createItemTag,
  getProperties,
  checkForRepeats,
  addNewOrderItem,
} from '../../../tools/tools';
import UserContext from '../../../context/userContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import Form from '../../atoms/Form/Form';
import FormInput from '../FormInput/FormInput';
import FormCheckBox from '../../atoms/FormCheckBox/FormCheckBox';

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

interface Props {
  toggleModal: Function;
  itemsList: storeItem[];
  storeType: string;
  defaultItemName: string;
}

const AddItemForm = (props: Props) => {
  const { toggleModal, itemsList, storeType, defaultItemName } = props;
  const user = useContext(UserContext);
  const sendStatusInfo = useContext(StatusInfoContext);
  const [itemExists, setItemExists] = useState(false);
  const initialValues: Partial<storeItem> & AddFormSettings = {
    name: defaultItemName,
    dimension: '',
    mainType: '',
    secondType: '',
    defaultOrderAmount: 0,
    additionalDescriptions: '',
    withTag: true,
    withOrder: false,
  };

  const usedItems = getProperties('orderDescription', itemsList);

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

  const makeIdentifier = (id: number, storeType: string): string => {
    return `${storeType}-${id.toString().padStart(4, '0')}`;
  };
  const addNewItem = async (newItem: StoreItem) => {
    const key = db.ref('QR').child(`${baseBranches.storesBranch}${storeType}`).push().key;
    const updates = {};
    updates[`${baseBranches.storesBranch}${storeType}/${key}`] = newItem;
    db.ref('QR/')
      .update(updates)
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
          withTag,
          withOrder,
        } = values;
        const id = getNextItemNumber(itemsList);
        const identifier = makeIdentifier(id, storeType);
        const newItem = new StoreItem(
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

        createOrderDesc(newItem);
        if (checkForRepeats(usedItems, newItem.orderDescription)) {
          setItemExists(true);
          return;
        }
        addNewItem(newItem);
        if (withTag) {
          const newTag = createItemTag(newItem);
          addNewTag(newTag, sendStatusInfo);
        }
        if (withOrder) {
          const { orderDescription, identifier, defaultOrderAmount } = newItem;
          const newOrder = new ItemOrder(identifier, orderDescription, defaultOrderAmount, 'szt');
          user?.uid
            ? addNewOrderItem(newOrder, user, sendStatusInfo)
            : sendStatusInfo({ status: 'error', message: 'Brak uprawnień' });
        }
        toggleModal();
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, touched, errors, values, resetForm, setSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <MenuHeader>Dodaj do magazynu</MenuHeader>
          <StyledInputsWrapper>
            <StyledCheckBoxesWrapper>
              <FormCheckBox name={'withTag'} label={'Etykieta'} checked={values.withTag} />
              <FormCheckBox name={'withOrder'} label={'Zamówienie'} checked={values.withOrder} />
            </StyledCheckBoxesWrapper>
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
              error={errors.dimension && touched.dimension ? true : false}
              errorText={errors.dimension && touched.dimension ? errors.dimension : ''}
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

            <FormInput
              name={'defaultOrderAmount'}
              type={'text'}
              label={'Do zamówienia'}
              maxLength={25}
              inputMode={'numeric'}
              pattern={'[0-9]*'}
              error={errors.defaultOrderAmount && touched.defaultOrderAmount ? true : false}
              errorText={errors.defaultOrderAmount && touched.defaultOrderAmount ? errors.name : ''}
            />
            <StyledError>{itemExists ? 'Taki przedmiot już istnieje' : ''}</StyledError>
          </StyledInputsWrapper>
          <StyledButtonsWrapper>
            <MenuButton type={'submit'}>Dodaj nowy</MenuButton>
            <MenuButton
              type="reset"
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

export default AddItemForm;
