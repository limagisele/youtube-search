import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { db } from "./api/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import DisplayVideos from "../components/DisplayVideos";

export default function FavVideos() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      const data = await getDocs(collection(db, "favourites"));
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
