import React, { useEffect, useState } from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Home({base_URL}) {

  const [quote, setQuote] = useState({});

  const getRandomQuote = async () => {
    const data = await fetch(base_URL+"/quotifyAPI/", {
      method: "GET",
    });
    const dataJson = await data.json();
    setQuote(dataJson);
    // console.log(dataJson);
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
        <div className="quoteButtons text-center">
          <Button className='me-2 my-2' variant="contained" color="success" onClick={getRandomQuote}>
            Another Quote
          </Button>
          <Link to="/quotes">
            <Button variant="contained" className='me-2 my-2' color="primary">
              All Quotes
            </Button>
          </Link>
          <Link to="/new_quote">
            <Button variant="contained" className='me-2 my-2' color="warning">
              Add Quote
            </Button>
          </Link>
          <Link to="/my_quotes">
            <Button variant="contained" className='my-2' color="error">
              My Quotes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home