import { database, addDoc, collection } from './firebase.js';

const saveTask = (description, authorId, authorName, date, createdAt, amountLikes, arrayUsersLikes) => {
  return addDoc(collection(database , 'posts'), {description, authorId, authorName, date, createdAt, amountLikes, arrayUsersLikes});
};

export { saveTask }