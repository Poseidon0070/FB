import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, Firestore} from 'firebase/firestore'
// collection is used to make reference to collection and doc is used to make reference to doc
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
// ref is used to make reference to storage
import firebaseApp from './firebaseConfig'

let FirebaseContext = createContext({})
let FirebaseAuth = getAuth(firebaseApp)
let Storage = getStorage(firebaseApp)
let FireStore = getFirestore(firebaseApp)
let googleProvider = new GoogleAuthProvider()

export const useFirebase = () => useContext(FirebaseContext)

const FirebaseContextProvider = ({children}) => {

  let [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if(user){
        // console.log(user)
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

  let signoutUser = () => {
    return signOut(FirebaseAuth)
  }

  let getImageURL = (path) => {
    return getDownloadURL(ref(Storage, path))
  }

  let createNewListing = async(bookName, ISBN, price, file) => {
    // console.log(bookName, ISBN, price, file)
    const imageRef = ref(Storage, `uploads/images/${Date.now()}-${file.name}`)
    const uploadResult =  await uploadBytes(imageRef, file)
    return addDoc(collection(FireStore, 'books'), {
      bookName,
      ISBN,
      price,
      imageURL : uploadResult.ref.fullPath,
      userID : user.uid,
      userEmail : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL
    })
  }

  let getBooks = async() => {
    return getDocs(collection(FireStore,'books'))
  }

  let getBookById = (bookId) => {
    return getDoc(doc(FireStore, "books" , bookId))
  }

  let placeOrder = (bookId, qty) => {
    return addDoc(collection(FireStore, "books", bookId, "orders"), {
      userID : user.uid,
      userEmail : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL,
      qty : Number(qty)
    })
  }

  let getMyBooks = async() => {
    if(!user) return []
    let q = query(collection(FireStore,"books"), where("userID", "==", user.uid))
    let books = await getDocs(q)
    return books
  }

  let getOrders = async(bookId) => {
    if(!user) return []
    return getDocs(collection(FireStore, "books", bookId, "orders"))
  }

  const isLoggedIn = user ? true : false

  return (
    <FirebaseContext.Provider value={{
        user,
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        isLoggedIn,
        signoutUser,
        createNewListing,
        getBooks,
        getImageURL,
        getBookById,
        placeOrder,
        getMyBooks,
        getOrders
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
