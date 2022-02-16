import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import {Grid} from '@mui/material';




export function Footer(){
    return(
        <Box>
        <Grid container spacing={2} sx={{padding:"20px",width:"100%",backgroundColor:"black",color:"white",position:"absolute",bottom:0}}>
        <Grid item xs={12} align="center">
        <Typography>Thank you</Typography>
        </Grid>
        </Grid>
        </Box>
        )
}
export default Footer;