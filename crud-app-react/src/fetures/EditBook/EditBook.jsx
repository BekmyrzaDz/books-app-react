import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { updateBook } from "../../api/booksApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
  title: "",
  author: "",
};

const EditBook = () => {
  const [newBook, setNewBook] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(newBook, id);
    navigate("/all");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div className="new-book">
        <input
          type="text"
          id="new-book"
          onChange={(e) => onValueChange(e)}
          name="title"
          placeholder="Edit book"
        />
        <input
          type="text"
          id="new-author"
          onChange={(e) => onValueChange(e)}
          name="author"
          placeholder="Edit author"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  return <div>{newItemSection}</div>;
};

export default EditBook;
