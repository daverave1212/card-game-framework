
import { useState } from "react";
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx9NTfBnExEDapCusx-l533TU9qKg7IAk",
  authDomain: "card-game-framework.firebaseapp.com",
  projectId: "card-game-framework",
  storageBucket: "card-game-framework.firebasestorage.app",
  messagingSenderId: "361863754722",
  appId: "1:361863754722:web:b79a3bfb854715f93cbfbb",
  databaseURL: "https://card-game-framework-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth()
auth.languageCode = 'en'

// Provider (strategy specific)
const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
    'login_hint': 'user@example.com'
})

// onAuthStateChanged(auth, user => {
//     console.log(`Changing auth: user null? ${user == null}`)
//     if (user == null) {
//         firebaseUserStore.dispatch({ type: 'change', payload: null })
//     } else {
//         firebaseUserStore.dispatch({ type: 'change', payload: {
//             id: user.uid,
//             name: user.displayName,
//             token: user.accessToken,
//         }})
//     }
// })

export function onAuthChanged(func) {
    onAuthStateChanged(auth, user => {
        func(user)
    })
}

export function useFirebaseAuthUser() {
    
    const [userState, setUserState] = useState(null)

    onAuthChanged(newUserState => {
        setUserState(newUserState)
    })

    return userState

}

// export function isLoggedIn() {
//     console.log(`FirebaseAuth.isLoggedIn...`)
//     return firebaseUserStore.getState() != null
// }

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleAuthProvider)  // or signInWithRedirect
    const user = result.user
    const { accessToken } = GoogleAuthProvider.credentialFromResult(result)
    console.log({ accessToken, user })
    return { accessToken, user }
}

export async function logout() {
    await auth.signOut()
}

export async function test() {

}