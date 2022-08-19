import React from "react";
import styles from "./AllBooks.module.css";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { getBooks, deleteBook } from "../../api/booksApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";

const AllBooks = () => {
  const {
    isLoading,
    isError,
    error,
    data: books,
  } = useQuery("books", getBooks);

  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation(deleteBook, {
    onSuccess: () => {
      // Invalidates cache and refresh
      queryClient.invalidateQueries("books");
    },
  });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = books.data.map((book) => {
      return (
        <article key={book.id}>
          <div className="book">
            <div>
              <label htmlFor={book.id}>
                <strong>Title: </strong>
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
          <div>
            <Link to={`/all/${book.id}`}>
              <button className={styles.pen}>
                <FontAwesomeIcon icon={faPenSquare} />
              </button>
            </Link>
            <button
              className={styles.trash}
              onClick={() => deleteBookMutation.mutate({ id: book.id })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </article>
      );
    });
  }

  return <div>{content}</div>;
};

export default AllBooks;
