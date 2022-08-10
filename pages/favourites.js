import { useEffect, useState } from "react";
import { db } from "./api/firebase-config"
import { collection, getDocs } from "firebase/firestore"
import styles from "../styles/Home.module.css";


const favVideos = () => {
    const [favourites, setFavourites] = useState([])
    const favCollectionRef = collection(db, "favourites")

    useEffect(() => {
        const getFavourites = async () => {
            const data = await getDocs(favCollectionRef)
            setFavourites(data.docs.map((doc) => ({ ...doc.data(), _id: doc.id })))
        }
        getFavourites()
    }, [])

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Favourite Videos</h1>
        <div>
          {favourites.map((fav, index) => {
            return <div key={index}>{fav.id.videoId}</div>;
          })}
        </div>
      </div>
    );
}

export default favVideos;