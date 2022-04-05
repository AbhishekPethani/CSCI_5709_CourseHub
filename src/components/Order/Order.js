import React from 'react'
import NavbarComp from '../NavbarComp'
import ActiveOrder from './ActiveOrder'
import OrderHistory from './OrderHistory'
import { Grid } from '@mui/material';

const Order = () => {
  const currentUserID = localStorage.getItem("logged_in_user")
  return (
    <>
        <NavbarComp />
        <Grid container direction="column" alignItems="center" justify="center">
            <ActiveOrder email={currentUserID} />
            <OrderHistory email={currentUserID} />
        </Grid>
    </>
  )
}

export default Order