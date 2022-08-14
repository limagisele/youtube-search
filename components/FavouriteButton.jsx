import styles from "../styles/Pages.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
  const {
    store: { favourites },
    dispatch,
  } = useContext(StoreContext);

  const alreadyInFavourites = favourites.some((el) =>
    el._id === item.id.videoId ? true : false
  );

  const toggleFav = async (item) => {
    let dataDb;
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
    } catch {
      dispatch({
        type: "setAlert",
        data: true,
      });
      dispatch({
        type: "setAlertContent",
        data: "Sorry, video could not be saved. Please try again.",
      });
    }
  };

  return (
    <>
      <button
        className={styles.favoriteIcon}
        aria-label="add to favorites"
        onClick={() => toggleFav(item)}
      >
        {alreadyInFavourites ? (
          <FavoriteIcon color="inherit" />
        ) : (
          <FavoriteBorderIcon color="inherit" />
        )}
      </button>
    </>
  );
};

export default FavouriteButton;
