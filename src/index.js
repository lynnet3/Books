import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [api, setApi] = useState("AIzaSyDQqO0y7ZQaDZqR5qzhSSz34fuUANIl3mQ");

  function handleForm(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          api +
          "&maxResults=30"
      )
      .then(data => {
        setResult(data.data.items);
      });
  }
  return (
    <div className="container">
      <h2>Google Book Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleForm}
            className="form-control mt-10"
            placeholder="Book Search"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </div>
      </form>

      {result.map(book => (
        <a href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
