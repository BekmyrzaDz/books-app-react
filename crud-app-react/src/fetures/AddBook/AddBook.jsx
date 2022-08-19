import React, { useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { addBook } from "../../api/booksApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
  title: "",
  author: "",
};

const AddBook = () => {
  const [newBook, setNewBook] = useState(initialValues);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addBookMutation = useMutation(addBook, {
    onSuccess: () => {
      // Invalidates cache and refresh
      queryClient.invalidateQueries("books");
    },
  });

  const onValueChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author } = newBook;

    addBookMutation.mutate({
      title,
      author,
    });
    setNewBook("");
    navigate("/all");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-book">Enter a new item</label>
      <div className="new-book">
        <input
          type="text"
          id="new-book"
          onChange={(e) => onValueChange(e)}
          name="title"
          placeholder="Enter book"
        />
        <input
          type="text"
          id="new-author"
          onChange={(e) => onValueChange(e)}
          name="author"
          placeholder="Enter author"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  return <div>{newItemSection}</div>;
};

export default AddBook;
