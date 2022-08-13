import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import fetchApi from "./api/api";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useStore from "../reducers/reducer";
import DisplayVideos from "../components/DisplayVideos";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [store, dispatch] = useStore();
  const { searchResults, alert, alertContent } = store;

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

  const handleClose = () => {
    dispatch({
      type: "setAlert",
      data: false,
    });
  }

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
      {alert && (
        <Stack sx={{ width: "60%", margin: "auto" }}>
          <Alert severity="error" onClose={handleClose}>
            {alertContent}
          </Alert>
        </Stack>
      )}
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

