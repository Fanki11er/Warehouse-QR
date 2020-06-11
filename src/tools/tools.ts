import { StoreItem, Tag } from '../classes/classes';
import { baseBranches } from '../firebase/firebaseEndpoints';
import { Order, StatusInfo } from '../types/types';
import { db } from '../firebase/firebaseConfig';

export const addNewTag = (newItem: StoreItem, callback: (x: StatusInfo) => void) => {
  const { name, identifier, mainType, secondType, dimension } = newItem;
  const description = `${name} ${mainType} ${secondType}`;
  const newTag = new Tag(identifier, description, dimension);

  db.ref(`QR/${baseBranches.tagsBranch}`)
    .push(newTag, () => {
      callback({
        status: 'ok',
        message: 'Dodano',
      });
    })
    .catch(() => {
      callback({
        status: 'ok',
        message: 'Nie dodano',
      });
    });
};

export const createOrderDesc = (newItem: StoreItem) => {
  newItem.orderDescription = `${newItem.name} ${newItem.dimension} ${newItem.mainType} ${newItem.secondType}`;
};

export const getStoreItemKey = async (storeType: string, identifier: string) => {
  const item = await db
    .ref('QR')
    .child(`${baseBranches.storesBranch}${storeType}`)
    .orderByChild('identifier')
    .equalTo(identifier)
    .once('value');
  const [key] = Object.keys(item.val());
  return key;
};

export const getTagKey = async (identifier: string) => {
  const item = await db
    .ref('QR')
    .child(`${baseBranches.tagsBranch}`)
    .orderByChild('id')
    .equalTo(identifier)
    .once('value');
  if (item.val()) {
    const [key] = Object.keys(item.val());
    return key;
  }
  return null;
};

export const getOrderKey = async (identifier: string, user: firebase.User) => {
  const item = await db
    .ref('QR')
    .child(`${baseBranches.ordersBranch}${user.uid}`)
    .orderByChild('itemIdentifier')
    .equalTo(identifier)
    .once('value');
  if (item.val()) {
    const [key] = Object.keys(item.val());
    return key;
  }
  return null;
};

export const checkIfIsStoreEmpty = async (snapshot: firebase.database.DataSnapshot) => {
  if ((await snapshot.val()) === 'EMPTY' || !(await snapshot.val())) return true;
  return false;
};

export const getProperties = <T>(propName: string, source: T[]): string[] => {
  const properties: string[] = [];
  source.map((item) => {
    properties.push(item[propName]);
    return undefined;
  });
  return properties;
};

export const checkForRepeats = <T>(usedItems: T[], orderDescription: T) => {
  return usedItems.includes(orderDescription);
};

export const addNewOrderItem = async (
  newOrderItem: Order,
  user: firebase.User,
  callback: Function,
) => {
  const { uid } = user;

  await db
    .ref('QR')
    .child(`${baseBranches.ordersBranch}${uid}`)
    .push(
      newOrderItem,
      callback({
        status: 'ok',
        message: 'Dodano',
      }),
    )
    .catch(() => {
      callback({
        status: 'error',
        message: 'Nie dodano qq',
      });
    });
};
