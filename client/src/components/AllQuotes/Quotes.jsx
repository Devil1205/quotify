import React, { useEffect, useState } from 'react'
import './Quotes.css'
import '../Home/Home.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';

function Quotes({ base_URL }) {
    const navigate = useNavigate();

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

    const editQuote = (e) => {
        // console.log(e);
        navigate('/update', {
            state: {
                quote: e
            }
        })
    }

    const deleteQuote = async (e) => {
        console.log(e);
        const response = await fetch(base_URL + "/quotifyAPI/quote/" + e._id, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
        })
        getQuotes();
        // console.log(response);
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
                            <div className="icons">
                                <IconButton className='editIcon' aria-label="edit" onClick={() => { editQuote(element) }}>
                                    <EditIcon color='secondary' sx={{ color: "#00ea39",fontSize: 30 }} />
                                </IconButton>
                                <IconButton className='deleteIcon' aria-label="delete" onClick={() => { deleteQuote(element) }}>
                                    <DeleteForeverIcon sx={{ color: "#fe8f58",fontSize: 30 }} />
                                </IconButton>
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