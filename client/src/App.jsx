import './App.css'
import Home from './components/Home/Home'
import AllQuotes from './components/AllQuotes/Quotes'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  const base_URL = "https://quotifyapi.onrender.com";
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home base_URL={base_URL}/>} />
        <Route exact path="/quotes" element={<AllQuotes base_URL={base_URL}/>} />
      </Routes>
    </Router>
  )
}

export default App
