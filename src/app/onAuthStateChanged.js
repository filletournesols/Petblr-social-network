import { onAuthStateChanged, firebaseAuth} from './firebase.js'

onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log({uid})
        window.localStorage.setItem('loggedInUserId', uid)
    } else {
        console.log('no user')
    }
});