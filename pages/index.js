import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import VideoList from "../components/VideoList";
import Dropdown from "../components/Dropdown";
import fetchApi from "./api/api";
import VideoModal from "../components/VideoModal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("relevance");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const videosPerPage = 12;
  const videosAlreadyDisplayed = pageNumber * videosPerPage;

  const searchHandler = async () => {
    if (searchTerm !== "") {
      const data = await fetchApi(searchTerm, orderBy);
      if (data) {
        setSearchResults(data);
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
          setSelectedVideo={setSelectedVideo}
          setPageNumber={setPageNumber}
          setAlert={setAlert}
          setAlertContent={setAlertContent}
        />
        {searchResults.length == 0 ? (
          <p data-testid="no-videos">
            No videos to display yet. Type a keyword to start searching.
          </p>
        ) : (
          <>
            <Dropdown
              label="Order By"
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              onChange={searchHandler}
            />
            <VideoModal
              selectedVideo={selectedVideo}
              open={open}
              setOpen={setOpen}
            />
            <ul className={styles.grid}>
              <VideoList
                searchResults={searchResults}
                videosAlreadyDisplayed={videosAlreadyDisplayed}
                videosPerPage={videosPerPage}
                setSelectedVideo={setSelectedVideo}
                setOpen={setOpen}
              />
            </ul>
            <Pagination
              pageNumber={pageNumber}
              videosPerPage={videosPerPage}
              setPageNumber={setPageNumber}
              searchResults={searchResults}
            />
          </>
        )}
      </main>
    </div>
  );
}
