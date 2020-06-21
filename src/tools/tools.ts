import { StoreItem, Tag } from '../classes/classes';
import { baseBranches, storesPath } from '../firebase/firebaseEndpoints';
import { Order, StatusInfo } from '../types/types';
import { ItemShortage } from '../classes/classes';
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
        message: 'Nie dodano',
      });
    });
};

export const getData = (mainPath: string, setIsEmpty: Function, setItemsList: Function) => {
  return db.ref(mainPath).on('value', async (snapshot) => {
    const isEmpty = await checkIfIsStoreEmpty(snapshot);

    setIsEmpty(isEmpty);
    if (!isEmpty) {
      const items = await snapshot.val();

      items ? setItemsList(Object.values(items)) : setItemsList([]);
    }
  });
};

export const addShortage = async (
  itemIdentifier: string,
  orderDescription: string,
  callback: Function,
) => {
  const date = new Date();
  const shortage = new ItemShortage(itemIdentifier, orderDescription, date.toLocaleString());

  await db
    .ref('QR')
    .child(baseBranches.shortagesBranch)
    .push(
      shortage,
      callback({
        status: 'ok',
        message: 'Zgłoszono',
      }),
    )
    .catch(() => {
      callback({
        status: 'error',
        message: 'Błąd',
      });
    });
};

const getStoreType = (scannedItemId: string, setErr?: Function) => {
  const match = /\w{3}[-]\d+/i.test(scannedItemId);
  if (!match) {
    setErr && setErr('Nie właściwa forma kodu');
    return '';
  }
  return scannedItemId.slice(0, 3);
};

export const fetchItem = async (itemId: string) => {
  const storeType = getStoreType(itemId);
  if (storeType) {
    const item = await db
      .ref(storesPath)
      .child(storeType)
      .orderByChild('identifier')
      .equalTo(itemId)
      .once('value');
    const [value]: any = item.val() ? Object.values(item.val()) : [undefined];
    if (value) {
      return value;
    } else {
      return;
    }
  }
};

export const getShortageKey = async (identifier: string) => {
  const shortage = await db
    .ref('QR')
    .child(baseBranches.shortagesBranch)
    .orderByChild('itemIdentifier')
    .equalTo(identifier)
    .once('value');
  if (shortage.val()) {
    const [key] = Object.keys(shortage.val());
    return key;
  }
  return null;
};

export const deleteShortage = async (
  identifier: string,
  sendStatusInfo: (x: StatusInfo) => void,
) => {
  const shortageKey = await getShortageKey(identifier);
  shortageKey &&
    db
      .ref('QR/')
      .child(`${baseBranches.shortagesBranch}`)
      .update({ [shortageKey]: null })
      .then(() => {
        sendStatusInfo({
          status: 'ok',
          message: 'Usunięto',
        });
      })
      .catch(() => {
        sendStatusInfo({
          status: 'error',
          message: 'Nie usunięto',
        });
      });
};

export const deleteStoreItem = async (
  identifier: string,
  sendStatusInfo: (x: StatusInfo) => void,
) => {
  const storeType = getStoreType(identifier);
  const itemKey = await getStoreItemKey(storeType, identifier);
  itemKey &&
    db
      .ref('QR/')
      .child(`${baseBranches.storesBranch}${storeType}`)
      .update({ [itemKey]: null })
      .then(() => {
        sendStatusInfo({
          status: 'ok',
          message: 'Usunięto',
        });
      })
      .catch(() => {
        sendStatusInfo({
          status: 'error',
          message: 'Nie usunięto',
        });
      });
};
