import React, { useEffect, useState } from 'react'
import './Quotes.css'
import '../Home/Home.css'
import Button from '@mui/material/Button';

function Quotes({ base_URL }) {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    const [quotes, setQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const getQuotes = async () => {
        const data = await fetch(base_URL + "/quotifyAPI/quotes");
        const dataJson = await data.json();
        // console.log(dataJson);
        setQuotes(dataJson);
    }

    const nextPage = () => {
        setPage(page + 1);
        scrollToTop();
    }

    const prevPage = () => {
        setPage(page - 1);
        scrollToTop();
    }

    useEffect(() => {
        getQuotes();
    }, [])

    return (
        <div className='allQuotes'>
            <div>
                {quotes.map((element, index) => {
                    return (
                        (index < page * pageSize && index >= (page - 1) * pageSize) && <div className='randomQuote' key={index}>
                            <div><span>❛❛</span>{element.description}<span>❜❜</span>
                            </div>
                            <h2>~ {element.author}</h2>
                        </div>
                    )
                })}
                <div className='text-center'>
                    <Button variant="contained" disabled={page === 1} onClick={prevPage} color="success" className='mx-2'>Prev</Button>
                    <Button variant="contained" disabled={page === Math.ceil(quotes.length / pageSize)} onClick={nextPage} color="success" className='mx-2'>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default Quotes