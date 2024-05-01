import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContextProvider';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Book({bookName, mode, id, ISBN, imageURL, price}) {
    let [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ySQ38MBgl_mVOpkg5r9kt5xQCWlMgiIqlMLGkBa56Q&s')
    // console.log(id)
    let firebase = useFirebase()
    let navigate = useNavigate()

    useEffect(() => {
        firebase.getImageURL(imageURL)
        .then(url => {setImage(url)})
        .catch(err => console.log(err))
    }, [image])

    let viewBookDetail = () => {
      return navigate(`/book-detail/${id}`)
    }

    let showOrders = () => {
      return navigate(`/orders/${id}`)
    }

  return (
    <Card sx={{ maxWidth: 345,border:"2px solid grey" }}>
      <CardMedia
        component="img"
        alt={bookName}
        image={image}
        sx={{borderBottom:"2px solid grey", height:"280px", width:"300px"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bookName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
            RS {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={viewBookDetail}>View</Button>
        {
          mode === "buyer" ? 
          <></> :
          <Button size="small" variant="contained" onClick={showOrders}>Orders</Button>
        }
      </CardActions>
    </Card>
  );
}