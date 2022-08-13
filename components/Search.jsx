import { useContext } from "react";
import StoreContext from "../contexts/store";
import styles from "../styles/Pages.module.css";
import youtube from "../assets/youtube.png";
import Image from "next/image";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Search = ({ handleEmptyInput, searchHandler, searchTerm, orderBy }) => {
  const { dispatch } = useContext(StoreContext);

  const submit = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      handleEmptyInput();
    } else {
      searchHandler(searchTerm, orderBy);

      dispatch({
        type: "setSelectedVideo",
        data: {},
      });
      dispatch({
        type: "setPageNumber",
        data: 0,
      });
    }
  };

  const handleInput = (e) => {
    dispatch({
      type: "setSearchTerm",
      data: e.target.value,
    });
  };

  const clear = (e) => {
    dispatch({
      type: "setSearchTerm",
      data: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.search}>
        <label>Search Videos</label>
        <input
          id="video-search"
          type="text"
          value={searchTerm}
          placeholder="Enter search keywords"
          onChange={handleInput}
        />
        <IconButton onClick={clear}>
          <ClearIcon className={styles.clearIcon} fontSize="small" />
        </IconButton>
      </div>
      <button type="submit" onClick={submit}>
        <Image src={youtube.src} alt="youtube icon" height={45} width={64} />
      </button>
    </form>
  );
};

export default Search;
