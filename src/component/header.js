import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
// import react from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                 size="large"
                 edge="start"
                 color="inherit"
                 aria-label="menu"
                 sx={{ mr: 2 }}>
                <MenuIcon/>
                </IconButton>
                <Typography vareient="h6" component= "div" sx={{flexGrow:1}}>Home</Typography>
                <Button color="inherit"><NavLink to="/login" style={{color:"white"}}>Login</NavLink></Button>
                <Button color="inherit"><NavLink to="/" style={{color:"white"}}>Register</NavLink></Button>
                </Toolbar>
            </AppBar>

        </Box>
    );
}
export default Header;


    



