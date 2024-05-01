import { Box, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContextProvider'

const OrderDetail = () => {
  const {bookId} = useParams()
  let [orders, setOrder] = useState(null)
  let firebase = useFirebase()
  useEffect(() => {
    firebase.getOrders(bookId)
    .then(res => {
    let ordersArray = res?.docs?.map(doc => {
      doc._document.data.value.mapValue.fields.id = doc.id
      return doc._document.data.value.mapValue.fields
    })
    setOrder(ordersArray?ordersArray:[])
    })
  }, [])

  
  if(orders === null) return <LinearProgress sx={{ zIndex:"2", position:"relative", bottom:"65px"}} color="success"/>
  if(orders.length == 0) return <p>No orders pending</p>
  console.log(orders)

  return (
    <>
    <Box sx={{display:"flex", gap:"70px", mt:"50px", mx:"50px", flexWrap:"wrap"}}>
      {orders.map(order => (
        <Box sx={{border:"3px solid grey", p:"20px"}}>
          <Box>Name : {order.displayName.stringValue}</Box>
          <Box>Email : {order.userEmail.stringValue}</Box>
          <Box>Quantity : {order.qty.integerValue}</Box>
        </Box>
      ))}
      </Box>
    </>
  )
}

export default OrderDetail

// useEffect(() => {
//   setLoading(true)
//   firebase.getBooks()
//   .then((res) => {
//     let bookArray = res.docs.map(doc => {
//       doc._document.data.value.mapValue.fields.id = doc.id
//       return doc._document.data.value.mapValue.fields
//     })
//     setBooks(bookArray)
//     setLoading(false)
//   })
//   .catch(err => {
//     setLoading(false)
//     console.log(err)
//   })
// },[])
