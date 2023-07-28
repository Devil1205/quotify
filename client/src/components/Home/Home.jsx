import React, { useEffect, useState } from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Home() {

  const [quote, setQuote] = useState({});

  const getRandomQuote = async () => {
    const data = await fetch("http://localhost:5000/quotifyAPI/", {
      method: "GET",
    });
    const dataJson = await data.json();
    setQuote(dataJson);
    console.log(dataJson);
  }

  useEffect(() => {
    getRandomQuote();
  }, [])


  return (
    <div className="home">
      <div>
        <div className='randomQuote'>
          <div><span>❛❛</span>{quote.description}<span>❜❜</span></div>
          <h2>~ {quote.author}</h2>
        </div>
        <div className="quoteButtons">
          <Button className='me-2 my-2' variant="outlined" color="success" onClick={getRandomQuote}>
            New Quote
          </Button>
          <Link to="/quotes">
            <Button variant="outlined" color="primary">
              All Quotes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home