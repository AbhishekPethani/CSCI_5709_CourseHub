import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import ActiveOrderItem from './ActiveOrderItem';
import axios from 'axios';

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

const ActiveOrder = () => {
  const [activeOrders, setActiveOrders] = useState([])
    // {orderID:"1", currentState:"Awaiting Payment"},
    // {orderID:"2", currentState:"Payment Started"}])
  
  // useEffect hook to get all the active orders for current logged in user from the database
  useEffect(()=>{
    // Backend URL
    const backEndURL = 'https://abhishek-pethani-test.herokuapp.com/order';
    // fetch all the active order from the database for the current logged in user
    axios.get(backEndURL + '/' + "course_review_test@gmail.com")
    .then((response) => {
        let result = response.data
        // set active order state if the success attribute of response is true 
        if(result.success){
            // setOrderHistory(result.orderHistory)
            console.log(result.orderHistory)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}, [])

  return (
    <Grid container direction="column" alignItems="center" mb="10px" pb="10px" border= "1px solid rgba(0,0,0,.125)" border-radius="0.25rem" >
        <Typography gutterBottom variant="h4" mt="10px" component="h2" align='center'>Active Orders</Typography>
        {activeOrders.length > 0 ?
          activeOrders.map((order) => {
            return <ActiveOrderItem order={order} />
          })
          :
          <Typography variant="h6" component="h2">
            No active orders are available.
          </Typography>
        }
    </Grid>
  )
}

export default ActiveOrder