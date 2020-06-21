import React, { useContext } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { storeItem, Order } from '../../../types/types';
import { ItemOrder } from '../../../classes/classes';
import { addNewOrderItem, deleteShortage } from '../../../tools/tools';
import userContext from '../../../context/userContext';
import StatusInfoContext from '../../../context/StatusInfoContext';
import MenuHeader from '../../atoms/MenuHeader/MenuHeader';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import Form from '../../atoms/Form/Form';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';

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
  item: storeItem | undefined;
  isShortage?: boolean;
}

const OrderItemForm = (props: Props) => {
  const { toggleModal, item, isShortage } = props;
  const user = useContext(userContext);
  const sendStatusInfo = useContext(StatusInfoContext);

  const initialValues: Order = {
    itemIdentifier: item ? item.identifier : '',
    orderDescription: item ? item.orderDescription : '',
    quantity: item ? item.defaultOrderAmount : 0,
    units: 'szt',
    extraInfo: '',
  };

  let validateSchema = yup.object().shape({
    quantity: yup.number().required('Pole jest wymagane').moreThan(0, 'Wartość większa od zera'),
    orderDescription: yup.string().required('Pole jest wymagane'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        const { itemIdentifier, quantity, extraInfo, units, orderDescription } = values;

        const newOrderItem = new ItemOrder(
          itemIdentifier,
          orderDescription,
          quantity,
          units,
          extraInfo,
        );
        user?.uid
          ? addNewOrderItem(newOrderItem, user, sendStatusInfo).then(() => {
              if (isShortage) deleteShortage(itemIdentifier, sendStatusInfo);
            })
          : sendStatusInfo({
              status: 'error',
              message: 'Brak uprawnień',
            });

        toggleModal(undefined);
      }}
    >
      {({ handleSubmit, touched, errors, values, resetForm, setSubmitting, initialValues }) => (
        <Form onSubmit={handleSubmit}>
          <MenuHeader>Dodaj do zamówienia</MenuHeader>
          <StyledInputsWrapper>
            <FormInput
              name={'orderDescription'}
              type={'text'}
              label={'Przedmiot'}
              width={400}
              error={errors.orderDescription && touched.orderDescription ? true : false}
              errorText={
                errors.orderDescription && touched.orderDescription ? errors.orderDescription : ''
              }
            />
            <FormInput
              name={'quantity'}
              type={'text'}
              label={'Ilość'}
              inputMode={'numeric'}
              pattern={'[0-9]*'}
              maxLength={5}
              width={150}
              error={errors.quantity && touched.quantity ? true : false}
              errorText={errors.quantity && touched.quantity ? errors.quantity : ''}
            />

            <SelectInput name={'units'} label={'Jednostki'} options={['szt', 'mb']} />
            <FormInput
              name={'extraInfo'}
              type={'text'}
              label={'Uwagi'}
              width={400}
              maxLength={50}
              error={errors.extraInfo && touched.extraInfo ? true : false}
              errorText={errors.extraInfo && touched.extraInfo ? errors.extraInfo : ''}
            />
          </StyledInputsWrapper>
          <StyledButtonsWrapper>
            <MenuButton type={'submit'}>Dodaj</MenuButton>
            <MenuButton
              type="reset"
              onClick={() => {
                toggleModal(undefined);
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

export default OrderItemForm;
