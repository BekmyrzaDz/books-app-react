import React from "react";
import styles from "./Layout.module.css";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const setActive = (navData) =>
    navData.isActive ? styles.active : styles.link;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_inner}>
            <NavLink to="/" className={setActive}>
              Home
            </NavLink>
            <NavLink to="/all" className={setActive}>
              All books
            </NavLink>
            <NavLink to="/add" className={setActive}>
              Add book
            </NavLink>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
