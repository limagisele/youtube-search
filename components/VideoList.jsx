import styles from "../styles/Home.module.css";

const VideoList = ({
  searchResults,
  videosAlreadyDisplayed,
  videosPerPage,
  setSelectedVideo
}) => {
  return searchResults
    .slice(videosAlreadyDisplayed, videosAlreadyDisplayed + videosPerPage)
    .map((item, index) => {
      const { id, snippet = {} } = item;
      const { title, thumbnails = {}, channelTitle, publishedAt } = snippet;
      const { medium = {} } = thumbnails;
      return (
        <li key={index} className={styles.card} onClick={()=> setSelectedVideo(item)}>
          <img
          width={medium.width}
          height={medium.height}
          src={medium.url}
          alt=""
          />
          <h3>{title}</h3>
          <div className={styles.cardInfo}>
            <p>Published on: {publishedAt.substring(0, 10)}</p>
            <p>By {channelTitle}</p>
          </div>
        </li>
      );
    });
};

export default VideoList