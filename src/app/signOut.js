import { firebaseAuth, signOut } from './firebase.js';

export const signOutFun = async (firebaseAuth) => {
  try {
    await signOut(firebaseAuth)
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}