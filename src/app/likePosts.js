import { updateDoc, doc, database, arrayUnion, arrayRemove } from './firebase.js';

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