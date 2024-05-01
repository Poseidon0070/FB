import { Box, Button, InputLabel, LinearProgress, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContextProvider'

const BookDetail = () => {
    let [book,setBook] = useState(null)
    let {bookId} = useParams()
    let firebase = useFirebase()
    let navigate = useNavigate()
    let qtyRef = useRef(null)

    useEffect(() => {
        firebase.getBookById(bookId)
        .then(async(doc) => {
            // let keys = Object.keys(doc._document.data.value.mapValue.fields)
            doc._document.data.value.mapValue.fields.id = doc.id
            let values = Object.entries(doc._document.data.value.mapValue.fields)
            // console.log(values)
            let currBook = {}
            values.forEach(field => {
                let ky = field[0]
                let vl = field[1].stringValue
                currBook[ky] = vl
            });
            currBook.imageURL = await firebase.getImageURL(currBook.imageURL)
            setBook(currBook)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    let orderHandler = async() => {
        let result = await firebase.placeOrder(bookId, qtyRef.current.value)
    }

    if(!book) return <LinearProgress sx={{ zIndex:"2", position:"relative", bottom:"65px"}} color="success"/>
  return (
    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Typography variant="h3">{book.bookName} by {book.displayName}</Typography>
        <img src={book.imageURL} style={{border:"3px solid grey", height:"50vh", width:"40vw"}}></img>
        <Typography variant="h5">Price: RS.{book.price}</Typography>
        <Typography variant="h4">Owner Detail</Typography>
        <Typography variant="h6">Name : {book.displayName}</Typography>
        <Typography variant="h6">Gmail : {book.userEmail}</Typography>
        <InputLabel>Qty:</InputLabel>
        <TextField inputRef={qtyRef} type="number" label="" inputProps={{ min: 1, max: 10 }} defaultValue={1}>Quantity</TextField>
        <Box sx={{display:"flex"}}>
            <Button size="large" variant="contained" sx={{margin:"20px"}} onClick={() => navigate('..')}>Back</Button>
            <Button size="large" variant="contained" sx={{margin:"20px"}} onClick={orderHandler}>Buy Now</Button>
        </Box>
    </Box>
  )
}

export default BookDetail
