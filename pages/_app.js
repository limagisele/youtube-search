import '../styles/globals.css'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import useStore from '../reducers/reducer'
import StoreContext from '../contexts/store'
import { db } from "../pages/api/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [store, dispatch] = useStore()
  const {favourites} = store

  useEffect(() => {
    const getFavourites = async () => {
      const dataDb = await getDocs(collection(db, "favourites"));

      dispatch({
        type: "setFavourites",
        data: dataDb.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
      })
    };
    getFavourites();
  }, [favourites]);

  return (
    <>
      <StoreContext.Provider value={favourites}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </StoreContext.Provider>
    </>
  )
}

export default MyApp
