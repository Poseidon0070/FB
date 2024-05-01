import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import { createTheme, ThemeProvider } from '@mui/material'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import FirebaseContextProvider from './context/FirebaseContextProvider'
import Root from './pages/Root'
import Listing from './pages/Listing'
import BookDetail from './pages/BookDetail'
import OrderDetail from './pages/OrderDetail'
import MyBooks from './pages/MyBooks'

let router = createBrowserRouter([
  {path : '/', 
    element : <Root />,
    children: [
      {index: true, element : <Home />},
      {path : 'signup', element : <Signup />},
      {path : 'signin', element : <Signin />},
      {path : 'add-listing', element : <Listing />},
      {path : 'book-detail/:bookId', element : <BookDetail />},
      {path : 'orders/:bookId', element : <OrderDetail />},
      {path : 'ordered', element : <OrderDetail />},
      {path : 'my-books', element : <MyBooks />},
    ]
  }
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
