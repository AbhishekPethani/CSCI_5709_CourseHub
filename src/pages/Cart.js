import React, { useEffect, useState } from 'react';
import CartTable from '../components/Cart/CartTable';
import NavbarComp from '../components/NavbarComp';
import { Box, Grid, Divider, Link, Typography, Paper } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { getCart, deleteFromCart } from '../services/cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Cart() {
    let theme = createTheme();
    theme.typography.h1 = {
        fontSize: '2rem',
        '@media (min-width:600px)': {
          fontSize: '3.0rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '3.0rem',
        },
      };
    theme.typography.h2 = {
        fontSize: '0.8rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2.4rem',
        },
      };
      theme.typography.subtitle1 = {
        fontSize: '0.8rem',
        '@media (min-width:600px)': {
          fontSize: '1.8rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.8rem',
        },
      };
      theme.typography.overline = {
        fontSize: '0.7rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      };
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
        deleteFromCart(body).then((result) => {
            if (result) {
                getCartItems(userId);
            }
        });

    };

    return (
        <div>
            <NavbarComp />
            <div style={{ padding: '30px' }}>
                <div style={{ paddingBottom: '30px' }}>
                <ThemeProvider theme={theme}>
            <Typography sx={{ textAlign: 'center', color: 'charcoalgrey' }} variant="h1">
                                    My Cart <ShoppingCartIcon fontSize="large" ></ShoppingCartIcon>
                                </Typography>
                                </ThemeProvider>
                </div>
            
                <div style={{
                    backgroundColor: '#f8f8ff',
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
                        {isCartEmpty && <div style={{ padding: '30px' }}>  <Typography sx={{ textAlign: 'center', fontSize: '2vw', color: 'slategray' }} variant="h4" component="h2">
                            Your Cart is Empty !!
                        </Typography></div>}
                        {!isCartEmpty && <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
                        <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
                        <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                                <ThemeProvider theme={theme}>
                                    <Typography sx={{ textAlign: 'left', color: 'slategray' }} variant="h2" component="h2">
                                        PRODUCT

                                    </Typography>
                                </ThemeProvider>



                            </Grid>
                            <Grid item xs={3}>
                            <ThemeProvider theme={theme}>
                                <Typography sx={{ textAlign: 'center', fontSize: 'h2', color: 'slategray' }} variant="h2" component="h2">
                                    PRICE
                                </Typography>
                                </ThemeProvider>

                            </Grid>
                            <Grid item xs={3}>
                            </Grid>

                        </Grid>
                        </Grid>}
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
                                            <ThemeProvider theme={theme}>
                                            <Typography sx={{ textAlign: 'left', color: '#464646' }} variant="subtitle1">
                                                    {item.courseName}

                                                </Typography>
                                                <Typography sx={{ textAlign: 'left', color: '#464646' }} variant="overline">
                                                    Author:  {item.courseAuthor}

                                                </Typography>
                                </ThemeProvider>
                                                

                                            </Grid>
                                            <Grid item xs={3}>
                                            <ThemeProvider theme={theme}>
                                            <Typography sx={{ textAlign: 'center', color: '#464646' }} variant="subtitle1">
                                            ${item.coursePrice}
                                                
                                                </Typography>
                                                </ThemeProvider>
                                            

                                            </Grid>
                                            <Grid item xs={3}>
                                                <IconButton onClick={() => removeItem(item.courseName)} aria-label="delete" color="primary">
                                                    <Delete style={{ fontSize: '30px' }} />
                                                </IconButton>
                                            </Grid>

                                        </Grid>

                                    </Box>

                                )
                            })}



                    </Box>
                    {!isCartEmpty && <Grid container spacing={2}>
                        <Grid item xs={6}> </Grid>
                        <Grid item xs={6}>
                        <ThemeProvider theme={theme}>
                                            <Typography sx={{ textAlign: 'left', color: '#464646' }} variant="subtitle1">
                                            Cart Total: ${cartTotal}

                                                </Typography>
                            </ThemeProvider>
                        </Grid>


                    </Grid>}
                </div>
            </div>
        </div>


    )
}

export default Cart