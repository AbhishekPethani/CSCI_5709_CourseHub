import React from 'react'
import { Grid, Typography } from '@mui/material';

const ActiveOrder = () => {
  return (
    <Grid container direction="column" alignItems="center" border= "1px solid rgba(0,0,0,.125)" border-radius="0.25rem" >
        <Typography gutterBottom variant="h4" mt="10px" component="h2" align='center'>Active Orders</Typography>
    </Grid>
  )
}

export default ActiveOrder