import styles from "../styles/Pages.module.css";
import Head from "next/head";
import { useContext } from "react";
import DisplayVideos from "../components/DisplayVideos";
import StoreContext from "../contexts/store";

export default function FavVideos() {
  const {
    store: { favourites },
  } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Favourite Videos</title>
        <meta name="description" content="Youtube Favourite Videos" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Favourite Videos</h1>
        {favourites.length === 0 ? (
          <p>No videos saved to favourites yet.</p>
        ) : (
          <DisplayVideos videos={favourites} />
        )}
      </main>
    </div>
  );
}
