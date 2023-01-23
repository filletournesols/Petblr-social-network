import { database, addDoc, collection, getDocs } from './firebase.js';

const saveTask = (description) => {
  return addDoc(collection(database , 'posts'), {description});

};
export { saveTask }