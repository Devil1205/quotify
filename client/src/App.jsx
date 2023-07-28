import './App.css'
import Home from './components/Home/Home'
import AllQuotes from './components/AllQuotes/Quotes'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/quotes" element={<AllQuotes />} />
      </Routes>
    </Router>
  )
}

export default App
