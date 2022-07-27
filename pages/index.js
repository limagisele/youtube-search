import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import ReactPaginate from "react-paginate";
import VideoList from "../components/VideoList";
import VideoPlayer from "../components/VideoPlayer";
import Dropdown from "../components/Dropdown";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("relevance");

  const videosPerPage = 10;
  const videosAlreadyDisplayed = pageNumber * videosPerPage;

  const pageCount = Math.ceil(searchResults.length / videosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    searchHandler(searchTerm, orderBy)
  }, [orderBy])

  const searchHandler = async (searchTerm, orderBy) => {
    try {
      if (searchTerm !== "") {
        const res = await fetch(
          `https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet%2Cid&hl=en-US&maxResults=50&order=${orderBy}`,
          options
        );
        const data = await res.json();
        setSearchResults(data.items);
      }
    } catch (err) {
      return err.message;
    }
  };  

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
          orderBy={orderBy}
          setSearchTerm={setSearchTerm}
          searchHandler={searchHandler}
          setSelectedVideo={setSelectedVideo}
          setPageNumber={setPageNumber}
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
            <VideoPlayer selectedVideo={selectedVideo} />
            <ul className={styles.grid}>
              <VideoList
                searchResults={searchResults}
                videosAlreadyDisplayed={videosAlreadyDisplayed}
                videosPerPage={videosPerPage}
                setSelectedVideo={setSelectedVideo}
              />
              <ReactPaginate
                previousLabel="< Previous"
                nextLabel="Next >"
                pageCount={pageCount}
                forcePage={pageNumber}
                onPageChange={changePage}
                containerClassName={styles.paginationBtns}
                activeClassName={styles.paginationActive}
                previousLinkClassName={styles.previousBtn}
                nextLinkClassName={styles.nextBtn}
              />
            </ul>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Developed by Gisele Lima</p>
        <p>& Powered by Youtube v3</p>
      </footer>
    </div>
  );
}
