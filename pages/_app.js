import '../styles/globals.css'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import useStore from '../reducers/reducer'
import StoreContext from '../contexts/store'
import { db } from "../pages/api/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react'
import Alerts from '../components/Alerts'

function MyApp({ Component, pageProps }) {
  const [store, dispatch] = useStore()

  useEffect(() => {
    const getFavourites = async () => {
      const dataDb = await getDocs(collection(db, "favourites"));

      dispatch({
        type: "setFavourites",
        data: dataDb.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
      })
    };
    getFavourites();
  }, []);

  return (
    <>
      <StoreContext.Provider value={{ store, dispatch }}>
        <NavBar />
        <Alerts />
        <Component {...pageProps} />
        <Footer />
      </StoreContext.Provider>
    </>
  )
}

export default MyApp
