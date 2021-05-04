import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './AuthConfig.firebase';
if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
}


export const loginWithGoogle = () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(providerGoogle)
        .then((result) => {
            return result;
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            throw error;
            // ...
        });
}


export const loginWithFacebook = () => {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(providerFacebook)
        .then((result) => {
            return result;
        }).catch((error) => {
            throw error;

        });
}

export const signOut = () => {
    return firebase.auth().signOut().then(() => {
        return true;
    }).catch((error) => {
        throw error;
    });
}

export const signUpwithEmailPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential;
        })
        .catch((error) => {
            throw error;
        });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential;
        })
        .catch((error) => {
            throw error;
        });
}