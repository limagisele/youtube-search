import styles from "../styles/Home.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { db } from "../pages/api/firebase-config";
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import StoreContext from "../contexts/store";

const FavouriteButton = ({ item }) => {
  const { favourites } = useContext(StoreContext);

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
