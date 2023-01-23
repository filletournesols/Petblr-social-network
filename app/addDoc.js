import { database, addDoc, collection } from './firebase.js';

const saveTask = (description, authorId, authorName, date, createdAt) => {
  return addDoc(collection(database , 'posts'), {description, authorId, authorName, date, createdAt});
};
export { saveTask }