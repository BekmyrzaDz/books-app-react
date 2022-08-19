import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
import { getBooks, addBook, updateBook, deleteBook } from "../../api/booksApi";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
  title: "",
  author: "",
};

const Books = () => {
  // const [newBook, setNewBook] = useState("");
  const [newBook, setNewBook] = useState(initialValues);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: books,
  } = useQuery("books", getBooks);

  const addBookMutation = useMutation(addBook, {
    onSuccess: () => {
      // Invalidates cache and refresh
      queryClient.invalidateQueries("books");
    },
  });

  const updateBookMutation = useMutation(updateBook, {
    onSuccess: () => {
      // Invalidates cache and refresh
      queryClient.invalidateQueries("books");
    },
  });

  const deleteBookMutation = useMutation(deleteBook, {
    onSuccess: () => {
      // Invalidates cache and refresh
      queryClient.invalidateQueries("books");
    },
  });

  const handleSubmit = (e) => {
    // addBookMutation.mutate({
    //   id: "",
    //   title: newBook,
    //   completed: false,
    // });
    // setNewBook("");
  };

  const onValueChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
    console.log(newBook);
  };

  const addBookDetails = async () => {
    await addBook(newBook);
    navigate("/all");
  };

  const newItemSection = (
    // onSubmit={handleSubmit}
    <form>
      <label htmlFor="new-book">Enter a new item</label>
      <div className="new-book">
        <input
          type="text"
          id="new-book"
          onChange={(e) => onValueChange(e)}
          name="title"
          placeholder="Enter new book"
        />
        <input
          type="text"
          id="new-author"
          onChange={(e) => onValueChange(e)}
          name="author"
          placeholder="Enter new author"
        />
      </div>
      <button className="submit" onClick={() => addBookDetails()}>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    console.log(books);
    // content = JSON.stringify(books);

    content = books.data.map((book) => {
      return (
        <article key={book.id}>
          <div className="book">
            {/* <input
              type="checkbox"
              checked={book.completed}
              id={book.id}
              onChange={() =>
                updateBookMutation.mutate({
                  ...book, completed: !book.completed
                })
              }
            /> */}
            <div>
              <label htmlFor={book.id}>
                <strong>Description: </strong>
                {book.title}
              </label>
            </div>
            <div>
              <label htmlFor={book.id}>
                <strong>Author: </strong>
                {book.author}
              </label>
            </div>
          </div>
          <button
            className="trash"
            onClick={() => deleteBookMutation.mutate({ id: book.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  return (
    <main className="main">
      <div className="container">
        <h1>Books</h1>
        {newItemSection}
        {content}
      </div>
    </main>
  );
};

export default Books;
