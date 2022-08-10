import styles from "../styles/Home.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const VideoList = ({
  searchResults,
  videosAlreadyDisplayed,
  videosPerPage,
  setSelectedVideo,
  setOpen,
}) => {
  const handleClick = (item) => {
    setSelectedVideo(item);
    setOpen(true);
  };

  return searchResults
    .slice(videosAlreadyDisplayed, videosAlreadyDisplayed + videosPerPage)
    .map((item, index) => {
      const { id, snippet = {} } = item;
      const { title, thumbnails = {}, channelTitle, publishedAt } = snippet;
      const { medium = {} } = thumbnails;
      return (
        <li
          key={index}
          className={styles.card}
          onClick={() => handleClick(item)}
        >
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
          <IconButton
            className={styles.favoriteIcon}
            aria-label="add to favorites"
            color="inherit"
          >
            <FavoriteBorderIcon />
          </IconButton>
        </li>
      );
    });
};

export default VideoList;
