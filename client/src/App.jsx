import './App.css'
import Home from './components/Home/Home'
import AllQuotes from './components/AllQuotes/Quotes'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import NewQuote from './components/NewQuote/NewQuote';
import Navbar from './components/Navbar/Navbar';
import UpdateQuote from './components/UpdateQuote/UpdateQuote';

function App() {

  const base_URL = "https://quotifyapi.onrender.com";
  // const base_URL = "http://localhost:5000";

  return (
    <Router>
      <Navbar base_URL={base_URL} />
      <Routes>
        <Route exact path="/" element={<Home base_URL={base_URL} />} />
        <Route exact path="/quotes" element={<AllQuotes base_URL={base_URL} />} />
        <Route exact path="/new_quote" element={<NewQuote base_URL={base_URL} />} />
        <Route exact path="/update" element={<UpdateQuote base_URL={base_URL} />} />
      </Routes>
    </Router>
  )
}

export default App
