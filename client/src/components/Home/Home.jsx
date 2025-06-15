import React, { useEffect, useState } from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import { Link, useSearchParams } from "react-router-dom";

function Home({ base_URL }) {
  const [quote, setQuote] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const getRandomQuote = async () => {
    const data = await fetch(base_URL + "/quotifyAPI/", {
      method: "GET",
    });
    const dataJson = await data.json();
    setQuote(dataJson);
    // console.log(dataJson);
  };

  useEffect(() => {
    getRandomQuote();
    const token = searchParams.get("token");
    let user = searchParams.get("user");
    if (user) user = JSON.parse(user);
    if (user && token) {
      localStorage.setItem(
        "auth-token",
        JSON.stringify({ user: user.name, token })
      );
    }
    setSearchParams({});
  }, []);

  return (
    <div className="home">
      <div>
        <div className="randomQuote">
          <div>
            <span>❛❛</span>
            {quote.description}
            <span>❜❜</span>
          </div>
          <h2>~ {quote.author}</h2>
        </div>
        <div className="quoteButtons text-center">
          <Button
            className="me-2 my-2"
            variant="contained"
            color="success"
            onClick={getRandomQuote}
            style={{ borderRadius: "50px" }}
          >
            Another Quote
          </Button>
          <Link to="/quotes">
            <Button
              variant="contained"
              className="me-2 my-2"
              color="primary"
              style={{ borderRadius: "50px" }}
            >
              All Quotes
            </Button>
          </Link>
          <Link to="/new_quote">
            <Button
              variant="contained"
              className="me-2 my-2"
              color="warning"
              style={{ borderRadius: "50px" }}
            >
              Add Quote
            </Button>
          </Link>
          <Link to="/my_quotes">
            <Button
              variant="contained"
              className="my-2"
              color="error"
              style={{ borderRadius: "50px" }}
            >
              My Quotes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
