import { Button, Grid, Typography } from '@mui/material';
// import { width } from '@mui/system';
import React, { useState } from 'react';
import Header from './header';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';
// import { createBrowserHistory } from 'history';
import axios from 'axios';
import validator from 'validator';
import {useNavigate} from 'react-router-dom';

function ForgetPassword() {
    var navigate = useNavigate();


    const paperStyle = { padding: "30px 20px", width: "400px", margin: "100px auto", position: "relative" }
    const [userForget, setUserForget] = useState({
        email: '',
        password: ''
    })
    // const changeHandler = (e) => {
    //     const value = e.target.value;
    //     setUserForget({
    //         ...userForget, [e.target.name]: value
    //     })

    // }
    const [emailErr, setEmailErr] = useState('');

    const EmailHandler = (e) => {
        const mail = e.target.value;
        setUserForget({
            ...userForget, [e.target.name]: mail
        })
        if (validator.isEmail(mail)) {
            setEmailErr('');
        }
        else {
            setEmailErr('invalid Email');
        }
    }
    const [passErr, setPassErr] = useState('');

    const passHandler = (e) => {
        const pass = e.target.value;
        setUserForget({
            ...userForget, [e.target.name]: pass
        })
        if (validator.isStrongPassword(pass, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            setPassErr('');
        }
        else {
            setPassErr('put minimum length 8 & add 1 lowercase,1 uppercase,1 number,1 symbol');
        }
    }
    const [userEmail, setUserEmail] = useState(true);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const response = () => {
            axios.put("http://localhost:7000/forgetPassword/" + userForget.email)
                .then((res) => {
                    const givenData = res.data;
                    console.log(givenData);
                    setUserEmail(true);
                navigate('/login');

                })
                .catch((err) => {
                    console.log(err);
                })
        }
        response();
    
    }
   




    return (
        <Grid>
            <Grid>
                <Header />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} align="center">
                    <Paper elevation={20} style={paperStyle} >
                        <Typography variant="h4" gutterBottom>Forget Password</Typography>
                        <Grid>
                            <Typography variant="subtitle1" gutterBottom >
                                Lost your password? <br />
                                Please enter your email address and new password.


                            </Typography>
                        </Grid>
                        <form onSubmit={(e) => onHandleSubmit(e) }>
                        <Grid>
                            {userEmail === false && <div><Alert severity="error">Put Registered email account.</Alert></div>}
                            <TextField
                                
                                name="email"
                                type="email"
                                required
                                fullWidth
                                id="email"
                                value={userForget.email}
                                label="Enter your email"
                                autoFocus
                                variant="filled"
                                onChange={(e) => EmailHandler(e)}
                                style={{ marginBottom: "10px" }}
                            /><small style={{color:"red"}}>{emailErr}</small>
                            <TextField
                            
                                name="password"
                                type="password"
                                required
                                fullWidth
                                id="password"
                                value={userForget.password}
                                onChange={(e) => passHandler(e)}
                                label="ForgetPassword"
                                autoFocus
                                variant="filled"
                                style={{ marginBottom: "10px" }} />
                                <small style={{color:"red"}}>{passErr}</small>
                        </Grid>
                        <Grid>
                            <Button variant="contained" type="submit">change your Password</Button>
                        </Grid>
                        </form>

                    </Paper>

                </Grid>
                <Grid item xs={6} align="center" style={{
                    height: '100vh',
                    backgroundImage: 'url(https://www.colourbox.com/preview/5188575-computer-cartoon.jpg)',
                    backgroundRepeat: "no-repeat", marginTop: "30px", marginBottom: "50px",backgroundSize:"800px"
                }}>

                </Grid>

            </Grid>

        </Grid>
    )
}
export default ForgetPassword;