import Head from "next/head";
import styles from "../styles/Pages.module.css";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../contexts/store";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import fetchApi from "./api/api";
import DisplayVideos from "../components/DisplayVideos";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  
  const {
    store: { searchResults },
    dispatch,
  } = useContext(StoreContext);

  const searchHandler = async () => {
    if (searchTerm !== "") {
      const data = await fetchApi(searchTerm, orderBy);
      if (data) {
        dispatch({
          type: "setSearchResults",
          data: data,
        });
      } else {
        dispatch({
          type: "setAlert",
          data: true,
        });
        dispatch({
          type: "setAlertContent",
          data: "Videos could not be loaded. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    searchHandler();
  }, [orderBy]);

  const handleEmptyInput = () => {
    dispatch({
      type: "setAlert",
      data: true,
    });
    dispatch({
      type: "setAlertContent",
      data: "Please type a keyword to start searching.",
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Search</title>
        <meta name="description" content="Youtube Videos Search App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Youtube Videos Search</h1>
        <Search
          searchTerm={searchTerm}
          handleEmptyInput={handleEmptyInput}
          orderBy={orderBy}
          setSearchTerm={setSearchTerm}
          searchHandler={searchHandler}
        />
        {searchResults.length === 0 ? (
          <p>No videos to display yet. Type a keyword to start searching.</p>
        ) : (
          <>
            <Dropdown
              label="Order By"
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              onChange={searchHandler}
            />
            <DisplayVideos videos={searchResults} />
          </>
        )}
      </main>
    </div>
  );
}

