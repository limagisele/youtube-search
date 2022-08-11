import styles from "../styles/Home.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { db } from "../pages/api/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const FavouriteButton = ({item}) => {
  const [favourites, setFavourites] = useState([]);

  const alreadyInFavourites = favourites.some((el) =>
    el._id === item.id.videoId ? true : false
  );

  const toggleFav = async (item) => {
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
  }, [favourites]);

  return (
    <>
      <IconButton
        className={styles.favoriteIcon}
        aria-label="add to favorites"
        color="inherit"
        onClick={() => toggleFav(item)}
      >
        {alreadyInFavourites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
};

export default FavouriteButton;
