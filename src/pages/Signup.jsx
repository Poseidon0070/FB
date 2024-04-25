import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import { useFirebase } from '../context/FirebaseContextProvider'
import React, { useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const firebase = useFirebase()

  let navigate = useNavigate()

  let handleSignup = async(e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let payload = Object.fromEntries(formData)
    let result = await firebase.signupUserWithEmailAndPassword(payload.email, payload.password)
    console.log("=> ", result)
  }

  useEffect(() => {
    console.log(firebase)
    if(firebase.isLoggedIn){
      return navigate('/')
    }
  }, [firebase.isLoggedIn, navigate])

  return (
    <Box sx={{ marginX: "50px", marginTop:"30px" }}>
    <Form onSubmit={handleSignup}>
      <FormLabel>Name</FormLabel>
      <TextField fullWidth label="Enter name" name="name" sx={{my:"15px"}}/>
      <FormLabel>Email</FormLabel>
      <TextField fullWidth label="Enter email" name="email" sx={{my:"15px"}}/>
      <FormLabel >Password</FormLabel>
      <TextField type="password" fullWidth label="Enter password" name="password"  sx={{my:"15px"}} />
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <Box>
        <Box sx={{display:"flex"}}>
                  <Box><Button type="submit" variant='contained' size="large" sx={{marginX:"20px"}}>Signup</Button></Box>
              </Box>
              <Box sx={{textAlign:"center"}}><Typography sx={{fontSize:"12px", marginTop:"10px"}}>Account already created? <Link to="/signin">Signin</Link></Typography></Box>
              </Box>
        </Box>
    </Form>
    </Box>
  )
}

export default Signup
