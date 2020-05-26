import { StoreItem, Tag } from '../classes/classes';
import { baseBranches } from '../firebase/firebaseEndpoints';
import { db } from '../firebase/firebaseConfig';

export const addNewTag = (newItem: StoreItem) => {
  const { name, identifier, mainType, secondType, dimension } = newItem;
  const description = `${name} ${mainType} ${secondType}`;
  const newTag = new Tag(identifier, description, dimension);

  db.ref(`QR/${baseBranches.tagsBranch}`).push(newTag);
};
