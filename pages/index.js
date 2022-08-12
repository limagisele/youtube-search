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
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");

  const [store, dispatch] = useStore();
  const { searchResults } = store;

  const searchHandler = async () => {
    if (searchTerm !== "") {
      const data = await fetchApi(searchTerm, orderBy);
      if (data) {
        dispatch({
          type: "setSearchResults",
          data: data,
        });
      } else {
        setAlert(true);
        setAlertContent("Videos could not be loaded. Please try again.");
      }
    }
  };

  useEffect(() => {
    searchHandler();
  }, [orderBy]);

  return (
    <div className={styles.container}>
      {alert && (
        <Stack sx={{ width: "60%", margin: "auto" }}>
          <Alert severity="error" onClose={() => setAlert(false)}>
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
          orderBy={orderBy}
          setSearchTerm={setSearchTerm}
          searchHandler={searchHandler}
          setAlert={setAlert}
          setAlertContent={setAlertContent}
        />
        {searchResults.length == 0 ? (
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
