import React from "react";
import styles from "../styles/Home.module.css";
import youtube from "../assets/youtube.png"
import { FaTimes } from "react-icons/fa";
import useStore from "../reducers/reducer";
import Image from "next/image";

const Search = ({
  searchTerm,
  handleEmptyInput,
  setSearchTerm,
  searchHandler,
  orderBy
}) => {
  const [store, dispatch] = useStore();

  const submit = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      handleEmptyInput()
    } else {
      searchHandler(searchTerm, orderBy);
  
      dispatch({
        type: "setSelectedVideo",
        data: {}
      })
      dispatch({
        type: "setPageNumber",
        data: 0
      })
    }
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
        <Image src={youtube.src} alt="youtube icon" height={45} width={64} />
      </button>
    </form>
  );
};

export default Search;
