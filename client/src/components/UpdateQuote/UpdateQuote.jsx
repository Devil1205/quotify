import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import '../NewQuote/NewQuote.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

function UpdateQuote({ base_URL }) {

    const [message, setMessage] = useState("");

    const location = useLocation();

    const saveQuote = async (e) => {
        e.preventDefault();
        // console.log(e);
        if (e.target.author.value.length < 6) {
            e.target.author.focus();
            return;
        }
        if (e.target.description.value.length < 10) {
            e.target.description.focus();
            return;
        }
        // console.log(e.target.author.value);
        try {
            const data = JSON.stringify({
                author: e.target.author.value,
                description: e.target.description.value
            });
            // console.log(data);
            const save = await fetch(base_URL + "/quotifyAPI/quote/" + location.state.quote._id, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: data,
            })
            // console.log(save);
            if (save.status === 200)
                setMessage("This quote was updated successfully.")
            else
                setMessage("Sorry couldn't updated this quote.")
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
        catch (e) {
            console.log(e);
        }
    }

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
    width: 100%;
    min-height: 100px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `)

    return (
        <div className='newQuote'>
            <div className='container'>
                <Box component="form" id='quoteForm' method='POST' onSubmit={(e) => { saveQuote(e) }}>
                    <TextField
                        required
                        id="author"
                        label="Author Name"
                        defaultValue={location.state.quote.author}
                        margin='normal'
                        fullWidth
                    />
                    <StyledTextarea aria-label="empty textarea" id='description' defaultValue={location.state.quote.description} placeholder="Write a quote" margin='normal' required />
                    <Button variant="contained" color="success" className='my-2' type='submit'>
                        Update
                    </Button>
                </Box>
            <div className="message text-center">{message}</div>
            </div>
        </div>
    )
}

export default UpdateQuote