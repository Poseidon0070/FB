import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseContextProvider'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import BookDetail from './BookDetail'
import Book from '../components/Book'

const MyBooks = () => {
    let firebase = useFirebase()
    let [books, setBooks] = useState(null)

    useEffect(() => {
        firebase.getMyBooks()
        .then(async(res) => {
            let bookArray = []
            res?.docs?.forEach((doc) => {
                // console.log("id => ", doc.id)
                // doc._document.data.value.mapValue.fields.id = doc.id
                let values = Object.entries(doc._document.data.value.mapValue.fields)
                // console.log(values)
                let currBook = {}
                values.forEach(field => {
                    let ky = field[0]
                    let vl = field[1].stringValue
                    currBook[ky] = vl
                });
                currBook.id = doc.id
                bookArray.push(currBook)
            })
            setBooks(bookArray)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    if(!books) return <LinearProgress sx={{ zIndex:"2", position:"relative", bottom:"65px"}} color="success"/>
    
    return (
        <Box sx={{display:"flex", gap:"70px", mt:"50px", mx:"50px", flexWrap:"wrap"}}>
            {books.map(book => (
                <Book 
                    key={book.id}
                    mode={"owner"}
                    id={book.id}
                    bookName={book.bookName} 
                    imageURL={book.imageURL}
                    price={book.price}
                    ISBN={book.ISBN}
                />
            ))}
        </Box>
    )
}

export default MyBooks


// let [book,setBook] = useState(null)
// let {bookId} = useParams()
// let firebase = useFirebase()
// let navigate = useNavigate()
// let qtyRef = useRef(null)

// useEffect(() => {
//     firebase.getBookById(bookId)
//     .then(async(doc) => {
//         // let keys = Object.keys(doc._document.data.value.mapValue.fields)
//         let values = Object.entries(doc._document.data.value.mapValue.fields)
//         // console.log(values)
//         let currBook = {}
//         values.forEach(field => {
//             let ky = field[0]
//             let vl = field[1].stringValue
//             currBook[ky] = vl
//             console.log(field)
//         });
//         currBook.imageURL = await firebase.getImageURL(currBook.imageURL)
//         setBook(currBook)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }, [])
// console.log(book)

// let orderHandler = async() => {
//     let result = await firebase.placeOrder(bookId, qtyRef.current.value)
// }

// if(!book) return <LinearProgress sx={{ zIndex:"2", position:"relative", bottom:"65px"}} color="success"/>
// return (
// <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
//     <Typography variant="h3">{book.bookName} by {book.displayName}</Typography>
//     <img src={book.imageURL} style={{border:"3px solid grey", height:"50vh", width:"40vw"}}></img>
//     <Typography variant="h5">Price: RS.{book.price}</Typography>
//     <Typography variant="h4">Owner Detail</Typography>
//     <Typography variant="h6">Name : {book.displayName}</Typography>
//     <Typography variant="h6">Gmail : {book.userEmail}</Typography>
//     <InputLabel>Qty:</InputLabel>
//     <TextField inputRef={qtyRef} type="number" label="" inputProps={{ min: 1, max: 10 }} defaultValue={1}>Quantity</TextField>
//     <Box sx={{display:"flex"}}>
//         <Button size="large" variant="contained" sx={{margin:"20px"}} onClick={() => navigate('..')}>Back</Button>
//         <Button size="large" variant="contained" sx={{margin:"20px"}} onClick={orderHandler}>Buy Now</Button>
//     </Box>
// </Box>
// )
// }
