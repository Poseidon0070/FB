import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseContextProvider'
import { Form, Link, useNavigate } from 'react-router-dom'

const Listing = () => {
    const firebase = useFirebase()
    let navigate = useNavigate()

    let handleSignin = async(e) => {
      e.preventDefault()
      let formData = new FormData(e.target)
      let payload = Object.fromEntries(formData)
      // console.log(payload)
      let result = await firebase.createNewListing(payload.bookName, payload.ISBN, payload.price, payload.file)
      // console.log(result)
    }

    
    useEffect(() => {
        // console.log(firebase.isLoggedIn)
        if(!firebase.isLoggedIn){
            return navigate('/signin')
        }
    }, [firebase.isLoggedIn, navigate])

    return (
      <Box sx={{ marginX: "50px", marginTop:"30px" }}>
      <Form onSubmit={handleSignin}>
        <FormLabel>Book Name</FormLabel>
        <TextField fullWidth label="" name="bookName" sx={{my:"15px"}}/>
        <FormLabel>ISBN</FormLabel>
        <TextField fullWidth label="" name="ISBN" sx={{my:"15px"}}/>
        <FormLabel>Price</FormLabel>
        <TextField fullWidth label="" type="number" name="price" sx={{my:"15px"}}/>
        <FormLabel>File</FormLabel>
        <TextField fullWidth label="" type="file" name="file" sx={{my:"15px"}}/>
        <Box sx={{display:"flex", justifyContent:"center"}}>
        <Box sx={{display:"flex"}}>
            <Box><Button type="submit" variant='contained' size="large" sx={{marginX:"20px"}}>Create</Button></Box>
        </Box>
        </Box>
      </Form>
      </Box>
    )
}

export default Listing
