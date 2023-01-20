import { firebaseAuth, sendPasswordResetEmail } from './firebase.js';

export const pswReset = async (firebaseAuth, email) =>{
//e.preventDefault()
//const email = document.getElementById('RecoverPswFormInput').value

  try{
    await sendPasswordResetEmail(firebaseAuth, email)
    return Promise.resolve()
  }catch(error)  {
    return Promise.reject(error)
  };
}