import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContextProvider';

export default function Navbar() {
  const {isLoggedIn, signoutUser} = useFirebase()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Box sx={{display:"flex", alignItems:"center" }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, color:"#ffffff" }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr:8 }}>
            FireStore
          </Typography>
          <NavLink to="/"  className={({isActive}) => isActive ? 'active' : ''} style={{marginRight:"15px"}}>Home</NavLink>
          <NavLink to="/add-listing" className={({isActive}) => isActive ? 'active' : ''} style={{marginRight:"15px"}}>Add Listing</NavLink>
          <NavLink to="/my-books" className={({isActive}) => isActive ? 'active' : ''} style={{marginRight:"15px"}}>My Books</NavLink>
          {/* <NavLink to="/orders" className={({isActive}) => isActive ? 'active' : ''} style={{marginRight:"15px"}}>Orders</NavLink> */}
          <NavLink to="/ordered" className={({isActive}) => isActive ? 'active' : ''} style={{marginRight:"15px"}}>Ordered</NavLink>
        </Box>
        <Box>
        {!isLoggedIn ? <>
          <Link to="signin"><Button sx={{color:"white"}}>Login</Button></Link>
          <Link to="/signup"><Button sx={{color:"white"}}>Signup</Button></Link>
        </> : <>
          <Button sx={{color:"white"}} onClick={signoutUser}>Logout</Button>
        </>}
        </Box>
      </Toolbar>
      </AppBar>
    </Box>
  );
}
