import React, { useEffect, useState } from 'react'
import './Quotes.css'
import '../Home/Home.css'

function Quotes() {

    const [quotes, setQuotes] = useState([]);

    const getQuotes = async () => {
        const data = await fetch("http://localhost:5000/quotifyAPI/quotes");
        const dataJson = await data.json();
        setQuotes(dataJson);
    }

    useEffect(() => {
        getQuotes();
    }, [])

    return (
        <div className='allQuotes'>
            <div>
                {quotes.map(element => {
                    return (
                        <div className='randomQuote'>
                            <div><span>❛❛</span>{element.description}<span>❜❜</span></div>
                            <h2>~ {element.author}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Quotes