import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import firebaseApp from './firebaseConfig'

let FirebaseContext = createContext({})
let FirebaseAuth = getAuth(firebaseApp)
let googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext)

const FirebaseContextProvider = ({children}) => {

  let [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if(user){
        console.log(user)
        setUser(user)
      }else{
        setUser(null)
      }
    })
  }, [])

  let signupUserWithEmailAndPassword = (email, password) => {
      return createUserWithEmailAndPassword(FirebaseAuth, email, password)
  }

  let signinUserWithEmailAndPassword = (email, password) => {
      return signInWithEmailAndPassword(FirebaseAuth, email, password)
  }

  let signinWithGoogle = () => {
    return signInWithPopup(FirebaseAuth, googleProvider)
  }


  const isLoggedIn = user ? true : false

  return (
    <FirebaseContext.Provider value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        isLoggedIn
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
