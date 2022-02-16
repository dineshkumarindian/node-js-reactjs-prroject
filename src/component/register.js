import { Avatar, Grid, Paper, Typography } from "@mui/material";
// import { grid, margin } from "@mui/system";
import React, { useState } from "react";
import Header from "./header";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Footer from "./footer";
import axios from "axios";
import { Alert } from '@mui/material';
import validator from "validator";
import {useNavigate} from 'react-router-dom';





function Register() {
    
    // var history = createBrowserHistory();
    var navigate=useNavigate();

    const paperstyle = { padding: "30px 20px", width: "300px", margin: "20px auto" }


    const [userfirst, setUserFirst] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: ''
    });

    const [userStore, setUserStore] = useState([]);

    const [firstErr, setFirstErr] = useState('');

    const firstHandler = (e) => {
        const first = e.target.value;
        setUserFirst({
            ...userfirst, [e.target.name]: first
        })
        if (first !== '') {
            setFirstErr('valid firstName.');
        }
        else {
            setFirstErr('put valid firstName.');
        }


    }

    const [lastErr, setLastErr] = useState('');

    const LastHandler = (e) => {
        const last = e.target.value;
        setUserFirst({
            ...userfirst, [e.target.name]: last
        })
        if (last !== '') {
            setLastErr('valid lastName.');
        }
        else {
            setLastErr('Invalid lastName.');

        }
    }
    const [ageErr, setAgeErr] = useState('');

    const AgeHandler = (e) => {
        const age = e.target.value;
        setUserFirst({
            ...userfirst, [e.target.name]: age
        })
        if (validator.isNumeric(age)) {
            setAgeErr('valid age');
        }
        else {
            setAgeErr('Invalid age');
        }
    }
    const [emailErr, setEmailErr] = useState('');

    const EmailHandler = (e) => {
        const mail = e.target.value;
        setUserFirst({
            ...userfirst, [e.target.name]: mail
        })
        if (validator.isEmail(mail)) {
            setEmailErr('valid mail');
        }
        else {
            setEmailErr('put valid mail');
        }
    }
    const [passErr,setPassErr] = useState('');
    
    const PasswordHandler = (e) =>{
        const pass = e.target.value;
        setUserFirst({
            ...userfirst,[e.target.name]:pass
        })
        if(validator.isStrongPassword(pass,{minLength:8,minLowercase:1,minUppercase:1,minSymbols:1,minNumbers:1})){
            setPassErr('valid password');
        }
        else{
            setPassErr('put minimum length 8 & add 1 lowercaseletter,1 upperCaseletter,1 symbol,1 number');
        }
        
    }
    const [userEmail,setUserEmail] = useState(true);

  
    const onSubmiter = (e) => {
        let length;
        
        
        e.preventDefault(); 

        let input = {
            firstName: userfirst.firstName,
            lastName: userfirst.lastName,
            age: userfirst.age,
            email: userfirst.email,
            password: userfirst.password

        }
            const ValidMailResponse = () =>{
            axios.get('http://localhost:7000/getmail/'+userfirst.email)
            .then((res) =>{
                const response= res.data;
                console.log("the email response is",response);
                length=response.length;
                console.log("length---"+length);
                if(length===0){
                        console.log("the if length is 0");
                        setUserEmail(true);
                        axios.post('http://localhost:7000/register', input)
                                 .then((res) => {
                                  const response = res.data;
                                  console.log("the response is==",response);
                                    console.log(response);
                                   setUserStore(response);
                                   navigate('/login');
                                })
                               .catch((err)=>{
                                    console.log(err);
                                })
                               
                    }
                    else{
                       console.log("the else length is====",length); 
                       setUserEmail(false);
                       
                    }
               
            })
            .catch((err) =>{
                console.log(err);
            })
         }
        
     ValidMailResponse();
    
    }
    return (
        <Grid style={{backgroundImage:"url('https://cdn.clockmonk.in/10d-website/data-engineering/banner-img.png')",backgroundRepeat:"no-repeat",backgroundPosition:"left",backgroundAttachment:"fixed"}}>
            <Grid>
                <Header />
            </Grid>
            <Grid>
               {userEmail === false &&<div><Alert severity="warning">the email already exit</Alert></div>}
                <Grid align="center">
                    <Paper elevation={20} style={paperstyle}>
                        <Grid >
                            <Avatar>
                                <AccountCircleIcon />
                            </Avatar>
                            <h1>Register Form</h1>
                            <Typography>Please fill the form create a Account</Typography>
                        </Grid>
                        <form onSubmit={(e) => onSubmiter(e)}>
                            <Grid >
                                <TextField
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                    name='firstName'
                                    id="firstName"
                                    value={userfirst.firstName}
                                    label="First Name"
                                    style={{ marginBottom: "10px" }}
                                    autoFocus
                                    onChange={(e) => firstHandler(e)}
                                    required
                                /><small style={{ color: "red" }}>{firstErr}</small><br />
                                <TextField
                                
                                    name="lastName"
                                    fullWidth
                                    type="text"
                                    value={userfirst.lastName}
                                    id="lastname"
                                    label="lastName"
                                    autoFocus
                                    variant="filled"
                                    style={{ marginBottom: "10px" }}
                                    onChange={(e) => LastHandler(e)}login
                                    required
                                /><small style={{ color: "red" }}>{lastErr}</small><br />
                                <TextField
                                    
                                    name="age"
                                    type="number"
                                    fullWidth
                                    id="age"
                                    value={userfirst.age}
                                    label="age"
                                    autoFocus
                                    variant="filled"
                                    onChange={(e) => AgeHandler(e)}
                                    style={{ marginBottom: "10px" }}
                                    required
                                /><small style={{ color: "red" }}>{ageErr}</small>
                                <TextField
                                    
                                    name="email"
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="email"
                                    value={userfirst.email}
                                    autoFocus
                                    variant="filled"home
                                    onChange={(e) => EmailHandler(e)}
                                    style={{ marginBottom: "10px" }}
                                /><small style={{color:"red"}}>{emailErr}</small>
                                <TextField
                                
                                    name="password"
                                    type="password"
                                    required
                                    fullWidth
                                    value={userfirst.password}
                                    autoFocus
                                    label="password"
                                    variant="filled"
                                    onChange={(e) => PasswordHandler(e)}
                                    style={{ marginBottom: "10px" }}
                                /><small style={{color:"red"}}>{passErr}</small>
                                <Grid style={{ marginTop: "10px" }}>
                                    <Button variant="contained" type="submit" >Sign up</Button>
                                </Grid>
                            </Grid>
                        </form>




                    </Paper>

                </Grid>
            </Grid>
            <Grid>
                <Footer />
            </Grid>
        </Grid>
    )

}
export default Register;