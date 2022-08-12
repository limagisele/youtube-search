import VideoModal from "./VideoModal";
import VideoList from "./VideoList";
import Pagination from "./Pagination";
import styles from "../styles/Home.module.css";
import useStore from "../reducers/reducer";

const DisplayVideos = ({ videos }) => {
  const [store, dispatch] = useStore()
  const { selectedVideo, open, pageNumber } = store;
  
  const videosPerPage = 12;
  const videosAlreadyDisplayed = pageNumber * videosPerPage;

  const handleClose = () => {
    dispatch({
      type: "setOpen",
      data: false,
    });
  };

  const handleClick = (item) => {
    dispatch({
      type: "setSelectedVideo",
      data: item,
    });
    dispatch({
      type: "setOpen",
      data: true,
    });
  };

  const onPageChange = ({ selected }) => {
    dispatch({
      type: "setPageNumber",
      data: selected,
    });
  };

  return (
    <>
      <VideoModal selectedVideo={selectedVideo} open={open} handleClose={handleClose} />
      <ul className={styles.grid}>
        <VideoList
          videos={videos}
          videosAlreadyDisplayed={videosAlreadyDisplayed}
          videosPerPage={videosPerPage}
          handleClick={handleClick}
        />
      </ul>
      <Pagination
        pageNumber={pageNumber}
        videosPerPage={videosPerPage}
        videos={videos}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default DisplayVideos