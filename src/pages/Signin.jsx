import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useFirebase } from '../context/FirebaseContextProvider'
import { Form, Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const firebase = useFirebase()

    let navigate = useNavigate()

    let handleSignin = async(e) => {
      e.preventDefault()
      let formData = new FormData(e.target)
      let payload = Object.fromEntries(formData)
      let result = await firebase.signinUserWithEmailAndPassword(payload.email, payload.password)
      console.log("=> ", result)
    }

    
    useEffect(() => {
        console.log(firebase.isLoggedIn)
        if(firebase.isLoggedIn){
            return navigate('/')
        }
    }, [firebase.isLoggedIn, navigate])

    return (
      <Box sx={{ marginX: "50px", marginTop:"30px" }}>
      <Form onSubmit={handleSignin}>
        <FormLabel>Email</FormLabel>
        <TextField fullWidth label="Enter email" name="email" sx={{my:"15px"}}/>
        <FormLabel >Password</FormLabel>
        <TextField type="password" fullWidth label="Enter password" name="password"  sx={{my:"15px"}} />
        <Box sx={{display:"flex", justifyContent:"center"}}>
        <Box>
            <Box sx={{display:"flex"}}>
                <Box><Button type="submit" variant='contained' size="large" sx={{marginX:"20px"}}>Signin</Button></Box>
                <Box><Button onClick={firebase.signinWithGoogle} type="submit" variant='contained' color="error" size="large">Signin with Google</Button></Box>
            </Box>
            <Box sx={{textAlign:"center"}}><Typography sx={{fontSize:"12px", marginTop:"10px", }}>Account not created? <Link to="/signup">Signup</Link></Typography></Box>
            </Box>
        </Box>
      </Form>
      </Box>
    )
}

export default Signin
