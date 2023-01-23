/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { firebaseAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from './firebase.js';

export const registrar = async (email, psw, repeatPsw, userName) => {
  try {
    if (psw && psw.length >=6 && psw === repeatPsw) {
      /[A-Z]/.test(psw) && /[a-z]/.test(psw) && /[0-9]/.test(psw);
      const userId = await createUserWithEmailAndPassword(firebaseAuth, email, psw);
      await updateProfile(firebaseAuth.currentUser, {
        displayName: userName
      })
      await sendEmailVerification(firebaseAuth.currentUser);
      return Promise.resolve(userId)
    } else if (psw !== repeatPsw) {
      return Promise.reject("wrong password")
    } else {
      return Promise.reject("generic_failure")
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
};