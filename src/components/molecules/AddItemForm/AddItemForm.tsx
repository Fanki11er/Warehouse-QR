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
import { MultiStepFormContext } from '../../../providers/MultiStepFormProvider';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import Form from '../../atoms/Form/Form';
import * as FormInputs from '../FormInputsWrapper/FormInputsWrapper';

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
  toggleModal: Function;
  itemsList: storeItem[];
  storeType: string;
  defaultItemName: string;
}

const AddItemForm = (props: Props) => {
  const { toggleModal, itemsList, storeType, defaultItemName } = props;
  const user = useContext(UserContext);
  const { currentIndex, changeCurrentIndex, createSettings, resetCurrentIndex } = useContext(
    MultiStepFormContext,
  );
  const sendStatusInfo = useContext(StatusInfoContext);
  const [itemExists, setItemExists] = useState(false);
  const initialValues: Partial<storeItem> & AddFormSettings = {
    name: defaultItemName,
    dimension: '',
    mainType: '',
    secondType: '',
    defaultOrderAmount: 0,
    quantity: 0,
    catalogNumber: '',
    additionalDescriptions: '',
    withTag: true,
    withOrder: false,
  };
  const { minIndex, maxIndex } = createSettings(1, 2);

  const usedItems = getProperties('orderDescription', itemsList);

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

  const withErrors = (errors: Object): boolean => {
    const values = Object.values(errors).filter((value) => {
      return value;
    });
    return values.length ? true : false;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (currentIndex === maxIndex) {
          const {
            name,
            dimension,
            mainType,
            secondType,
            defaultOrderAmount,
            additionalDescriptions,
            quantity,
            catalogNumber,
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
            quantity!,
            catalogNumber!,
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
          resetCurrentIndex(minIndex);
          setSubmitting(false);
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
          <MenuHeader>{`Dodaj do magazynu (${currentIndex}/${maxIndex})`}</MenuHeader>
          <FormInputs.FormInputsWrapper
            values={values}
            errors={errors}
            touched={touched}
            itemExists={itemExists}
            currentIndex={currentIndex}
          >
            <FormInputs.FormPartOne index={1} />
            <FormInputs.FormPartTwo index={2} />
          </FormInputs.FormInputsWrapper>

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
                  !withErrors(err) &&
                    changeCurrentIndex(currentIndex, { minIndex, maxIndex }, 'next');
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
            Dodaj nowy
          </StyledSubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;
