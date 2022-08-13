import Image from "next/image";
import styles from "../styles/Pages.module.css";
import FavouriteButton from "./FavouriteButton";

const VideoList = ({
  videos,
  videosAlreadyDisplayed,
  videosPerPage,
  handleClick,
}) => {
  return videos
    .slice(videosAlreadyDisplayed, videosAlreadyDisplayed + videosPerPage)
    .map((item, index) => {
      const { id, snippet = {} } = item;
      const { title, thumbnails = {}, channelTitle, publishedAt } = snippet;
      const { medium = {} } = thumbnails;
      return (
        <li key={index} className={styles.card}>
          <Image
            width={medium.width}
            height={medium.height}
            src={medium.url}
            alt={title}
            onClick={() => handleClick(item)}
          />
          <h3>{title}</h3>
          <div className={styles.cardInfo}>
            <p>Published on: {publishedAt.substring(0, 10)}</p>
            <p>By {channelTitle}</p>
          </div>
          <FavouriteButton item={item} />
        </li>
      );
    });
};

export default VideoList;
