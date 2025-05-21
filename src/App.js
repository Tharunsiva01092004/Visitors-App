import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './Components/Signup';
import Adminlogin from './Components/AdminLogin';

export default function App(){
  return(
    <Router>
      <div className='App'>
        <h1>Visitor Entry Tracking App</h1>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<Adminlogin/>}/>
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="App">
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
<br/>
      <Link to="/admin">
        <button>AdminLogin</button>
      </Link>
    </div>
  );
}