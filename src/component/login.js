// import { width } from '@mui/system';
import React, { useState } from 'react';
import Header from './header';
import { Avatar, Button, Grid } from '@mui/material';
import { Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextField } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
// import { Alert } from '@mui/material';

import Footer from './footer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import {useNavigate} from 'react-router-dom';

function Login() {
    // var history = createBrowserHistory();
    var navigate = useNavigate();
    const paperStyle = { padding: "30px 20px", width: "400px", margin: "150px auto" }
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })
    // const [login, setLogin] = useState(true);
    // const [password, setPassword] = useState(true);

  
    const [emailErr, setEmailErr] = useState('');

    const EmailHandler = (e) => {
        const mail = e.target.value;
        setUserLogin({
            ...userLogin, [e.target.name]: mail
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
        setUserLogin({
            ...userLogin, [e.target.name]: pass
        })
        if (validator.isStrongPassword(pass, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            setPassErr('');
        }
        else {
            setPassErr('put minimum length 8 & add 1 lowercaseletter,1 uppercaseletter,1 number,1 symbol');
        }
    }


    const onsubmiter = (e) => {

        e.preventDefault();

        const response = () => {
            axios.get("http://localhost:7000/login/" + userLogin.email + "/" + userLogin.password)
                .then((res) => {
                    const response = res.data;
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        response();
        navigate('/home');
        
       
    }



    return (
        <Grid style={{backgroundImage:"url('')",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"}}>
            <Grid>
                <Header />
            </Grid>
            <Grid>
                <Grid align="center">
                    <Paper elevation={20} style={paperStyle}>
                        <Grid style={{ marginBottom: "10px" }}>
                            <Avatar>
                                <AccountCircleIcon />
                            </Avatar>
                        </Grid>
                        <form onSubmit={(e) =>onsubmiter(e)}>
                            <Grid>
                                {/* {login === false && <div><Alert severity="error">Put const pass = e.target.value;Registered email account.</Alert></div>}
                                {password === false && <div><Alert severity="error">Put Registered password account or use click forgetpassword link.</Alert></div>} */}

                                <TextField
                                    autoComplete="given-name"
                                    name="email"
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    value={userLogin.email}
                                    label="email"
                                    autoFocus
                                    variant="filled"
                                    onChange={(e) => EmailHandler(e)}
                                    style={{ marginBottom: "10px" }}
                                /><small style={{ color: "red" }}>{emailErr}</small>
                                <TextField
                                    autoComplete="given-name"
                                    name="password"
                                    type="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="password"
                                    autoFocus
                                    value={userLogin.password}
                                    variant="filled"
                                    onChange={(e) => passHandler(e)}
                                    style={{ marginBottom: "10px" }}
                                /><small style={{color:'red'}}>{passErr}</small>
                            </Grid>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Grid>
                                <Button variant="contained" type="submit">sign in</Button>
                            </Grid>
                        </form>
                        <Grid container style={{ marginTop: "10px" }}>
                            <Grid item xs align="left" >
                                <NavLink to="/forgetpassword">
                                    Forgot password?
                                </NavLink>
                            </Grid>
                            <Grid item align="right">
                                <NavLink to="/">
                                    "Don't have an account? Sign Up"
                                </NavLink>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>

            </Grid>

            <Grid>
                <Footer />
            </Grid>
        </Grid>

    )
}
export default Login;