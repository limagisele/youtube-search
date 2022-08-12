import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { db } from "./api/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import useStore from "../reducers/reducer";
import DisplayVideos from "../components/DisplayVideos";

const favVideos = () => {
  const [favourites, setFavourites] = useState([]);
  const favCollectionRef = collection(db, "favourites");

  useEffect(() => {
    const getFavourites = async () => {
      const data = await getDocs(favCollectionRef);
      setFavourites(data.docs.map((doc) => ({ ...doc.data(), _id: doc.id })));
    };
    getFavourites();
  }, [favourites]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Favourite Videos</h1>
        {favourites.length == 0 ? (
          <p>No videos saved to favourites yet.</p>
        ) : (
          <DisplayVideos videos={favourites} />
        )}
      </main>
    </div>
  );
};

export default favVideos;
