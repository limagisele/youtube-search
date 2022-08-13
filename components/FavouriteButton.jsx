import styles from "../styles/Home.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import StoreContext from "../contexts/store";
import { db } from "../pages/api/firebase-config";
import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";

const FavouriteButton = ({ item }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { favourites } = store;

  const alreadyInFavourites = favourites.some((el) =>
    el._id === item.id.videoId ? true : false
  );

  const toggleFav = async (item) => {
    let dataDb
    try {
      if (alreadyInFavourites) {
        await deleteDoc(doc(db, "favourites", item.id.videoId));
        dataDb = await getDocs(collection(db, "favourites"));
      } else {
        await setDoc(doc(db, "favourites", item.id.videoId), item);
        dataDb = await getDocs(collection(db, "favourites"));
      }
      await dispatch({
        type: "setFavourites",
        data: dataDb.docs.map((doc) => ({ ...doc.data(), _id: doc.id })),
      });
    }
    catch {

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
