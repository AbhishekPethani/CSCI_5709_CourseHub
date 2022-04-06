import React, { useEffect, useState } from 'react';
import CartTable from '../components/Cart/CartTable';
import NavbarComp from '../components/NavbarComp';
import { Box, Grid, Divider, Link, Typography, Paper } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { getCart, deleteFromCart } from '../services/cart';

function Cart(props) {
    const [userId, setUserId] = useState(localStorage.getItem("logged_in_user"));
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        getCartItems(userId);
    }, []);

    const getCartItems = (userId) => {
        getCart(userId).then((response) => {
            if (response.data.items.length > 0) {
                setIsCartEmpty(false);
                setCartItems(response.data.items);
                setCartTotal(response.data.cartTotal);
            } else {
                setCartItems([]);
                setIsCartEmpty(true);
            }
            console.log('Cart Items ' + response);
        });
    };
    const removeItem = (courseName) => {
        const body = {
            userId: userId,
            courseName: courseName
        }
        deleteFromCart(body).then((result)=> {
if(result) {
    getCartItems(userId);
}
        });
        
    };

    return (
        <div>
            <NavbarComp />
            <div  style={{padding: '30px'}}>
            <h1 style={{ textAlign: 'center' }}>My Cart</h1>
            <div style={{
                backgroundColor: '#f3f8fc',
                padding: '40px', display: 'flex',
                flexDirection: 'column', height: '50%', maxHeight: '650px',
                overflow: 'hidden',
                border: '1.5px inset #5D8AA8',
               borderRadius: '15px'
            }}>
                <Box
                    sx={{

                        p: 2,
                        overflowY: 'auto',
                        justifyContent: 'center'

                    }}
                >
                    {isCartEmpty && <div style={{padding: '30px'}}>  <Typography sx={{ textAlign: 'center', fontSize: '2vw', color: 'slategray' }} variant="h4" component="h2">
                    Your Cart is Empty !!
                        </Typography></div>}
                    {!isCartEmpty &&<Grid container spacing={2} sx={{ paddingTop: '10px' }}>

                        <Grid item xs={4}>
                            <Typography sx={{ textAlign: 'right', fontSize: '2vw', color: 'slategray' }} variant="overline" component="h2">
                                Product

                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ textAlign: 'right', fontSize: '2vw', color: 'slategray' }} variant="overline" component="h2">
                                Price
                            </Typography>

                        </Grid>

                    </Grid> }
                    {cartItems?.length > 0 &&
                        cartItems?.map((item, index) => {
                            return (

                                <Box sx={{
                                    p: 2,
                                    justifyContent: 'center'

                                }}>
                                    <Divider />
                                    <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
                                        <Grid sx={{ maxHeight: '200px', maxWidth: '200px' }} item xs={3}>
                                            <img src={item.courseImage} height='100%' width='80%' />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={{ textAlign: 'left', fontSize: '1.5vw', color: '#464646' }} variant="subtitle1" component="h2">
                                                {item.courseName}

                                            </Typography>
                                            <Typography sx={{ textAlign: 'left', color: '#464646' }} variant="overline" component="h2">
                                                Author:  {item.courseAuthor}

                                            </Typography>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={{ textAlign: 'center', fontSize: '1.5vw', color: '#464646' }} variant="subtitle1" component="h2">
                                                ${item.coursePrice}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton  onClick={() => removeItem(item.courseName)} aria-label="delete" color="primary">
                                                <Delete style={{ fontSize: '30px' }} />
                                            </IconButton>
                                        </Grid>

                                    </Grid>

                                </Box>

                            )
                        })}



                </Box>
                {!isCartEmpty &&<Grid container spacing={2}>
                <Grid item xs={6}> </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ textAlign: 'left', fontSize: '1.5vw' }} variant="caption" component="h2">
                        Cart Total: ${cartTotal}
                    </Typography>
                </Grid>


            </Grid> }
            </div>
            </div>
        </div>


    )
}

export default Cart
