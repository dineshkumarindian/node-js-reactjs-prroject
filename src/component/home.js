import { Table } from '@mui/material';
import { useEffect, useState } from 'react';
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
// import { ConstructionOutlined } from '@mui/icons-material';

function Home() {
  const [data, setData] = useState([]);



  const getContain = () => {
    axios.get('http://localhost:7000/get')
      .then((res) => {
        const response = res.data;
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {

    getContain();
  }, []);

  const deleteHandler = (id) => {

    axios.delete('http://localhost:7000/get/' + id)
      .then((res) => {
        const response = res.data;
        console.log("the response is---->", response);

      })
      .catch((err) => {
        console.log(err);
      })
    getContain();
  }
  const [open, setOpen] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const updateHandler = (id, index) => {
  //   id.preventDefault();
  //   index.preventDefault();
  //   setOpen(true);
  //   setEdit(true);

  const [detail, setDetail] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password: ''

  });
  const [userId, setUserId] = useState({
    id: ''
  });

  const ChangeHandler = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  const handleClickOpen = (id, row) => {
    setOpen(true);
    console.log("The id is", id);
    console.log(" The index is ", row);
    console.log("the id value is....", row._id);
    let input = {
      firstName: row.firstName,
      lastName: row.lastName,
      age: row.age,
      email: row.email,
      password: row.password
    }
    let idValue = {
      id: id
    }
    setUserId(idValue);
    setDetail(input);
    data.splice(id, input);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleSubmit = () => {
    const putResponse = () => {
      axios.put("http://localhost:7000/get/" + userId.id, detail)
        .then((res) => {
          const response = res.data;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    putResponse();
    setOpen(false);
    getContain();

  }



  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To submit to this website, please enter your details here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              margin="dense"
              id="firstName"
              label="firstName"
              type="text"
              name="firstName"
              value={detail.firstName}
              onChange={(e) => ChangeHandler(e)}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              name="lastName"
              label="lastName"
              type="text"
              onChange={(e) => ChangeHandler(e)}
              value={detail.lastName}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="Age"
              name="age"
              label="Age"
              onChange={(e) => ChangeHandler(e)}
              type="number"
             value={detail.age}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="Age"
              name="email"
              label="E-mail"
              onChange={(e) => ChangeHandler(e)}
              type="email"
              value={detail.email}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="password"
              onChange={(e) => ChangeHandler(e)}
              value={detail.password}
              label="password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleSubmit()}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell align="right" sx={{ color: "white" }}>id</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>firstName</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>lastName</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>age</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>email</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>password</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>Edit</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right"><Button variant="contained" onClick={() => handleClickOpen(row._id, row)}>Edit</Button></TableCell>
                <TableCell align="right"><Button variant="contained" onClick={() => deleteHandler(row._id)}>delete</Button></TableCell>

              </TableRow>

            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ color: 'white', marginTop: "10px", marginBottom: "10px" }} align="center">
        <Button variant="contained"><NavLink to="/" style={{ color: "white" }}>Create</NavLink></Button>
      </div>
    </>
  )
}
export default Home;