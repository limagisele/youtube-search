import React from "react";
import styles from "../styles/Home.module.css";
import youtube from "../assets/youtube.png"
import { FaTimes } from "react-icons/fa";

const Search = ({
  searchTerm,
  setSearchTerm,
  searchHandler,
  setSelectedVideo,
  setPageNumber,
  orderBy,
}) => {
  const submit = (e) => {
    e.preventDefault();
    searchHandler(searchTerm, orderBy);
    setSelectedVideo({});
    setPageNumber(0);
  };

  const clear = (e) => {
    setSearchTerm("")
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.search}>
        <label>Search Videos</label>
        <input
          id="video-search"
          type="text"
          value={searchTerm}
          placeholder="Enter search keywords"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaTimes className={styles.closeIcon} onClick={clear} />
      </div>
      <button type="submit" onClick={submit}>
        <img src={youtube.src} alt="youtube icon" height="45" />
      </button>
    </form>
  );
};

export default Search;
