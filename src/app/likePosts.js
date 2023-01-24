import { updateDoc, doc, database, arrayUnion } from './firebase.js';

// va con await
// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data

export const getPostData2 = (uid) => {
    getDoc(doc(database, 'posts', uid))
};
// Like post
const likePost = (uid, likes, userLike) => {
    updateDoc(doc(database, 'posts', uid),
    { amountLikes: likes, arrayUsersLikes: arrayUnion(userLike) })
};
// Dislike post
const dislikePost = (uid, likes, userLike) => {
    updateDoc(doc(database, 'posts', uid),
    { amountLikes: likes, arrayUsersLikes: arrayRemove(userLike) })
};

export { likePost, dislikePost }