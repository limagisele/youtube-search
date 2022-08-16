import { useContext } from "react";
import StoreContext from "../contexts/store";
import styles from "../styles/Pages.module.css";
import youtube from "../assets/youtube.png";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";

const Search = ({ handleEmptyInput, handleSearch, searchTerm, orderBy }) => {
  const { dispatch } = useContext(StoreContext);

  const submit = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      handleEmptyInput();
    } else {
      handleSearch(searchTerm, orderBy);

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
          placeholder="Search keywords..."
          onChange={handleInput}
        />
        <ClearIcon
          className={styles.clearIcon}
          fontSize="small"
          onClick={clear}
          role="button"
        />
      </div>
      <button type="submit">
        <Image
          src={youtube.src}
          alt="youtube icon"
          height={57}
          width={81}
          onClick={submit}
        />
      </button>
    </form>
  );
};

export default Search;
