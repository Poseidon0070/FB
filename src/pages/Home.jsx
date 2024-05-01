import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseContextProvider'
import { Box, LinearProgress } from '@mui/material'
import Book from '../components/Book'

const Home = () => {
  let [books, setBooks] = useState([])
  let [loading, setLoading] = useState(false)
  let firebase = useFirebase()

  useEffect(() => {
    setLoading(true)
    firebase.getBooks()
    .then((res) => {
      let bookArray = res.docs.map(doc => {
        doc._document.data.value.mapValue.fields.id = doc.id
        return doc._document.data.value.mapValue.fields
      })
      setBooks(bookArray)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  },[])

  if(loading) {
    return (
      <>
      <LinearProgress sx={{ zIndex:"2", position:"relative", bottom:"65px"}} color="success"/>
      </>
    )
  }
  if(books.length == 0) return <p>No book added</p>

  return (
    <Box sx={{display:"flex", gap:"70px", mt:"50px", mx:"50px", flexWrap:"wrap"}}>
      {books.map((book) => (
        <Book 
          key={book.id}
          mode={"buyer"}
          id={book.id}
          bookName={book.bookName.stringValue} 
          imageURL={book.imageURL.stringValue}
          price={book.price.stringValue}
          ISBN={book.ISBN.stringValue}
        />
      ))}
    </Box>
  )
}

export default Home
