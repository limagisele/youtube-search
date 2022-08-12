import styles from "../styles/Home.module.css";
import { useContext } from "react";
import DisplayVideos from "../components/DisplayVideos";
import StoreContext from "../contexts/store";

export default function FavVideos() {
  const { favourites } = useContext(StoreContext)

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
