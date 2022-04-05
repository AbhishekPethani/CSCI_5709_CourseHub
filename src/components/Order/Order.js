import React from 'react'
import NavbarComp from '../NavbarComp'
import ActiveOrder from './ActiveOrder'
import OrderHistory from './OrderHistory'
import { Grid, Typography } from '@mui/material';

const Order = () => {
  return (
    <>
        <NavbarComp />
        <Grid container direction="column" alignItems="center" justify="center">
            <ActiveOrder />
            <OrderHistory />
        </Grid>
    </>
  )
}

export default Order