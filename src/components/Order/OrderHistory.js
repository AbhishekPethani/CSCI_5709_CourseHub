import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        borderRadius: 15,
        margin: '10px',
        maxWidth: 950,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.warning.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
}))
function createData(_id, courseName, date, amount, status) {
    return { _id, courseName, date, amount, status };
  }
  
  const rows = [
    createData(1, "React JS", "14/02/2022", "$100.00", "Completed"),
    createData(2, "Node JS", "13/01/2022", "$150.75", "Completed"),
    createData(3, "SQL", "09/11/2021", "$90.70", "Failed"),
    createData(4, "Python", "27/08/2021", "$210.80", "Completed"),
    createData(5, "Data Structure", "14/02/2022", "$55.50", "Completed")
  ];

const OrderHistory = () => {
    const classes = useStyles();

    const [orderHistory, setOrderHistory] = useState(rows);

    // useEffect hook to get all the past orders for current logged in user from the database
    useEffect(()=>{
        // Backend URL
        const backEndURL = 'https://abhishek-pethani-test.herokuapp.com/order';
        // fetch all the past order from the database for the current logged in user
        axios.get(backEndURL + '/' + "course_review_test@gmail.com")
        .then((response) => {
            let result = response.data
            // set order history state if the success attribute of response is true 
            if(result.success){
                setOrderHistory(result.orderHistory)
                console.log(result.orderHistory)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Grid container direction="column" alignItems="center" border= "1px solid rgba(0,0,0,.125)" border-radius="0.25rem" >
            <Typography gutterBottom mt="10px" variant="h4" component="h2" align='center'>Order History</Typography>
            {orderHistory.length > 0 ?
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650, border:"1px solid"}} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}> Order ID </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Course Name </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Date </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Amount </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Status </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderHistory.map((order) => (
                            <TableRow
                            key={order._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row"> {order._id} </TableCell>
                            <TableCell >{order.courseName}</TableCell>
                            <TableCell >{order.date}</TableCell>
                            <TableCell >{order.amount}</TableCell>
                            <TableCell >{order.status}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : 
                <Typography variant="h6" component="h2">
                  No order history is available.
                </Typography>
            }
        </Grid>
  )
}

export default OrderHistory