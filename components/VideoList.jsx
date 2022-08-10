import styles from "../styles/Home.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { db } from "../pages/api/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const VideoList = ({
  searchResults,
  videosAlreadyDisplayed,
  videosPerPage,
  setSelectedVideo,
  setOpen,
}) => {
  const [favourites, setFavourites] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggleFav = async (item) => {
    const alreadyInFavourites = favourites.some((el) =>
      el._id === item.id.videoId ? true : false
    );
    if (alreadyInFavourites) {
      await deleteDoc(doc(db, "favourites", item.id.videoId));
    } else {
      await setDoc(doc(db, "favourites", item.id.videoId), item);
    }
  };

  useEffect(() => {
    const getFavourites = async () => {
      const data = await getDocs(collection(db, "favourites"));
      setFavourites(data.docs.map((doc) => ({ ...doc.data(), _id: doc.id })));
    };
    getFavourites();
  }, []);

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
        <li key={index} className={styles.card}>
          <img
            width={medium.width}
            height={medium.height}
            src={medium.url}
            alt=""
            onClick={() => handleClick(item)}
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
            onClick={() => toggleFav(item)}
          >
            {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </li>
      );
    });
};

export default VideoList;
