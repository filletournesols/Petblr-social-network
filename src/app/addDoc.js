import { database, addDoc, collection } from './firebase.js';

const saveTask = (description, authorId, authorName) => {
  return addDoc(collection(database , 'posts'), {description, authorId, authorName});
};
export { saveTask }