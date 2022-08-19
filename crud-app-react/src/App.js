import "./App.css";
import Books from "./fetures/books/Books";
import Layout from "./fetures/Layout/Layout";
import Home from "./fetures/Home/Home";
import AllBooks from "./fetures/AllBooks/AllBooks";
import EditBook from "./fetures/EditBook/EditBook";
import AddBook from "./fetures/AddBook/AddBook";
import NotFound from "./fetures/NotFound/NotFound";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="all" element={<AllBooks />} />
          <Route path="all/:id" element={<EditBook />} />
          <Route path="add" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
