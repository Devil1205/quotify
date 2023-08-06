import './App.css'
import Home from './components/Home/Home'
import AllQuotes from './components/AllQuotes/Quotes'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import NewQuote from './components/NewQuote/NewQuote';
import Navbar from './components/Navbar/Navbar';
import UpdateQuote from './components/UpdateQuote/UpdateQuote';
import SignupSignin from './components/SignupSignin/User';
import { useState } from 'react';
import MyQuotes from './components/MyQuotes/MyQuotes';


function App() {

  const base_URL = "https://quotifyapi.onrender.com";
  // const base_URL = "http://localhost:5000";
  const [showNavbar, setShowNavbar] = useState(true);
  const verifyUser = async ()=>{
    try {
      const authToken = !localStorage.getItem('auth-token')?"":JSON.parse(localStorage.getItem('auth-token')).token;
      const response = await fetch(base_URL + "/quotifyAuthAPI/verifyUser/", {
          method: "GET",
          headers: { "Content-type": "application/json","auth-token": authToken },
      })
      console.log(response);
      if(response.status!==200)
        return false;
      const responseJson = await response.json();
      return responseJson;
  }
  catch (e) {
      console.log(e);
  }
  }

  return (
    <Router>
      {showNavbar && <Navbar base_URL={base_URL} verifyUser={verifyUser}/>}
      <Routes>
        <Route exact path="/" element={<Home base_URL={base_URL}/>} />
        <Route exact path="/user" element={<SignupSignin base_URL={base_URL} setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>} />
        <Route exact path="/quotes" element={<AllQuotes base_URL={base_URL} />} />
        <Route exact path="/my_quotes" element={<MyQuotes base_URL={base_URL} />} />
        <Route exact path="/new_quote" element={<NewQuote base_URL={base_URL} />} />
        <Route exact path="/update" element={<UpdateQuote base_URL={base_URL} />} />
      </Routes>
    </Router>
  )
}

export default App
