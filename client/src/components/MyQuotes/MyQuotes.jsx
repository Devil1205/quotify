import React, { useEffect, useState } from 'react'
import './Quotes.css'
import '../Home/Home.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';

function MyQuotes({ base_URL, updateMessage }) {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const [quotes, setQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const getQuotes = async () => {
        try {
            const authToken = !localStorage.getItem('auth-token') ? "" : JSON.parse(localStorage.getItem('auth-token')).token;
            const data = await fetch(base_URL + "/quotifyAPI/myQuotes", {
                method: "GET",
                headers: { "Content-type": "application/json", "auth-token": authToken },
            });
            const dataJson = await data.json();
            if (data.status === 200) {
                // console.log(dataJson);
                setQuotes(dataJson);
            }
            else {
                 updateMessage("error",dataJson.error);
            }
        }
        catch (error) {
            console.log(error);
        }
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
        try {
            const authToken = JSON.parse(localStorage.getItem('auth-token')).token;
            const response = await fetch(base_URL + "/quotifyAPI/quote/" + e._id, {
                method: "DELETE",
                headers: { "Content-type": "application/json", "auth-token": authToken },
            })
            const responseJson = await response.json();
            if(response.status===200)
            {
                updateMessage("success","Quote deleted successfully");
                getQuotes();
            }
            else
            {
                updateMessage("error", responseJson.error);
            }
            // console.log(response);
        }
        catch (error) {
            console.log(error);
        }
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
                                    <EditIcon color='secondary' sx={{ color: "#00ea39", fontSize: 30 }} />
                                </IconButton>
                                <IconButton className='deleteIcon' aria-label="delete" onClick={() => { deleteQuote(element) }}>
                                    <DeleteForeverIcon sx={{ color: "#fe8f58", fontSize: 30 }} />
                                </IconButton>
                            </div>
                            <h2>~ {element.author}</h2>
                        </div>
                    )
                })}
                <div className='text-center'>
                    <Button variant="contained" disabled={page === 1} onClick={prevPage} color="success" className='mx-2'>Prev</Button>
                    <Button variant="contained" disabled={page === Math.max(Math.ceil(quotes.length / pageSize), 1)} onClick={nextPage} color="success" className='mx-2'>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default MyQuotes