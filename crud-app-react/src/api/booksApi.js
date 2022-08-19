import axios from "axios";

const booksApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const getBooks = async () => {
  const response = await booksApi.get("/books");
  return response;
};

export const getBook = async (id) => {
  try {
    const { data } = await booksApi.get(`/books/${id}`);
    return data;
  } catch (error) {
    console.log("Тут ошибка", error.message);
  }
};

export const addBook = async (book) => {
  return await booksApi.post(`/books`, book);
};

export const updateBook = async (book, id) => {
  return await booksApi.put(`/books/${id}`, book);
};

export const deleteBook = async ({ id }) => {
  return await booksApi.delete(`/books/${id}`, id);
};

export default booksApi;
