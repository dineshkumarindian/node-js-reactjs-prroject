// import logo from './logo.svg';

import './App.css';
// import Footer from './component/footer';
// import Header from './component/header';
import Register from './component/register';
import Login from './component/login';
import ForgetPassword from './component/forgetPassword';
import Home from './component/home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';



function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    
     
    </div>
    </Router>
  );
}

export default App;
