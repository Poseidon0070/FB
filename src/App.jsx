import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import { createTheme, ThemeProvider } from '@mui/material'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import FirebaseContextProvider from './context/FirebaseContextProvider'

let router = createBrowserRouter([
  {path : '/', element : <Home />},
  {path : '/signup', element : <Signup />},
  {path : '/signin', element : <Signin />}
])

let theme = createTheme()

function App() {

  return (
    <FirebaseContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
        </RouterProvider>
      </ThemeProvider>
    </FirebaseContextProvider>
  )
}

export default App
